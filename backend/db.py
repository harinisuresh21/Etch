import json
import os
import sqlite3
from typing import Any

def _parse_categories(link: dict) -> dict:
    """Parse JSON string categories to array."""
    cats = link.get("categories", "[]")
    try:
        link["categories"] = json.loads(cats) if isinstance(cats, str) else cats
    except json.JSONDecodeError:
        link["categories"] = []
    return link


def row_to_dict(row: sqlite3.Row | None) -> dict[str, Any] | None:
    if row is None:
        return None
    d = dict(row)
    return _parse_categories(d)

DB_PATH = os.path.join(os.path.dirname(__file__), "etch.db")

LINK_COLUMNS = {
    "normalized_url": "TEXT",
    "source_title": "TEXT",
    "source_domain": "TEXT",
    "raw_content": "TEXT",
    "status": "TEXT DEFAULT 'ready'",
    "error_message": "TEXT",
    "updated_at": "TIMESTAMP",
    "categories": "TEXT DEFAULT '[]'",
}


def get_db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def ensure_column(cursor: sqlite3.Cursor, table: str, column: str, definition: str) -> None:
    columns = {row[1] for row in cursor.execute(f"PRAGMA table_info({table})").fetchall()}
    if column not in columns:
        cursor.execute(f"ALTER TABLE {table} ADD COLUMN {column} {definition}")


def init_db() -> None:
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS links (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL,
            title TEXT,
            short_summary TEXT,
            detailed_content TEXT,
            tags TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    for column, definition in LINK_COLUMNS.items():
        ensure_column(cursor, "links", column, definition)
    cursor.execute(
        "CREATE INDEX IF NOT EXISTS idx_links_normalized_url ON links(normalized_url)"
    )
    cursor.execute(
        "CREATE INDEX IF NOT EXISTS idx_links_created_at ON links(created_at DESC)"
    )
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS chat_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    conn.commit()
    conn.close()


def row_to_dict(row: sqlite3.Row | None) -> dict[str, Any] | None:
    return dict(row) if row else None


def get_existing_link_by_normalized_url(normalized_url: str) -> dict[str, Any] | None:
    conn = get_db()
    cursor = conn.cursor()
    row = cursor.execute(
        "SELECT * FROM links WHERE normalized_url = ? ORDER BY id DESC LIMIT 1",
        (normalized_url,),
    ).fetchone()
    conn.close()
    return row_to_dict(row)


def save_link(
    *,
    url: str,
    normalized_url: str,
    title: str,
    source_title: str,
    source_domain: str,
    short_summary: str,
    detailed_content: str,
    tags: str,
    raw_content: str,
    status: str = "ready",
    error_message: str | None = None,
    categories: str = "[]",
) -> int:
    conn = get_db()
    cursor = conn.cursor()
    existing = cursor.execute(
        "SELECT id FROM links WHERE normalized_url = ? ORDER BY id DESC LIMIT 1",
        (normalized_url,),
    ).fetchone()
    if existing:
        cursor.execute(
            """
            UPDATE links
            SET url = ?, normalized_url = ?, title = ?, source_title = ?, source_domain = ?,
                short_summary = ?, detailed_content = ?, tags = ?, raw_content = ?,
                status = ?, error_message = ?, categories = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            """,
            (
                url,
                normalized_url,
                title,
                source_title,
                source_domain,
                short_summary,
                detailed_content,
                tags,
                raw_content,
                status,
                error_message,
                categories,
                existing["id"],
            ),
        )
        link_id = existing["id"]
    else:
        cursor.execute(
            """
            INSERT INTO links (
                url, normalized_url, title, source_title, source_domain,
                short_summary, detailed_content, tags, raw_content, status, error_message, categories, updated_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            """,
            (
                url,
                normalized_url,
                title,
                source_title,
                source_domain,
                short_summary,
                detailed_content,
                tags,
                raw_content,
                status,
                error_message,
                categories,
            ),
        )
        link_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return link_id


def get_all_links(query: str | None = None) -> list[dict[str, Any]]:
    conn = get_db()
    cursor = conn.cursor()
    if query:
        pattern = f"%{query.strip().lower()}%"
        rows = cursor.execute(
            """
            SELECT * FROM links
            WHERE lower(coalesce(title, '')) LIKE ?
               OR lower(coalesce(source_title, '')) LIKE ?
               OR lower(coalesce(short_summary, '')) LIKE ?
               OR lower(coalesce(tags, '')) LIKE ?
               OR lower(coalesce(url, '')) LIKE ?
            ORDER BY created_at DESC
            """,
            (pattern, pattern, pattern, pattern, pattern),
        ).fetchall()
    else:
        rows = cursor.execute("SELECT * FROM links ORDER BY created_at DESC").fetchall()
    conn.close()
    return [_parse_categories(dict(row)) for row in rows]


def get_link(link_id: int) -> dict[str, Any] | None:
    conn = get_db()
    cursor = conn.cursor()
    row = cursor.execute("SELECT * FROM links WHERE id = ?", (link_id,)).fetchone()
    conn.close()
    return row_to_dict(row)


def search_links(query: str, limit: int = 6) -> list[dict[str, Any]]:
    terms = [term for term in query.lower().split() if len(term) > 2]
    links = get_all_links()
    scored: list[tuple[int, dict[str, Any]]] = []
    for link in links:
        haystack = " ".join(
            [
                str(link.get("title", "")),
                str(link.get("source_title", "")),
                str(link.get("tags", "")),
                str(link.get("short_summary", "")),
                str(link.get("detailed_content", ""))[:1200],
                str(link.get("raw_content", ""))[:2000],
            ]
        ).lower()
        score = 0
        for term in terms:
            if term in haystack:
                score += 2
            if term in str(link.get("tags", "")).lower():
                score += 3
            if term in str(link.get("title", "")).lower():
                score += 4
        if query.lower() in haystack:
            score += 6
        if score:
            scored.append((score, link))
    scored.sort(key=lambda item: (item[0], item[1]["id"]), reverse=True)
    return [link for _, link in scored[:limit]]


def get_chat_history(limit: int | None = None) -> list[dict[str, Any]]:
    conn = get_db()
    cursor = conn.cursor()
    if limit:
        rows = cursor.execute(
            "SELECT * FROM chat_history ORDER BY id DESC LIMIT ?", (limit,)
        ).fetchall()
        result = [dict(row) for row in reversed(rows)]
    else:
        rows = cursor.execute("SELECT * FROM chat_history ORDER BY id ASC").fetchall()
        result = [dict(row) for row in rows]
    conn.close()
    return result


def save_chat_message(role: str, content: str) -> None:
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO chat_history (role, content) VALUES (?, ?)",
        (role, content),
    )
    conn.commit()
    conn.close()


init_db()
