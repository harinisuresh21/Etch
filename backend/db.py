import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'etch.db')

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS links (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL,
            title TEXT,
            short_summary TEXT,
            detailed_content TEXT,
            tags TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def save_link(url, title, short_summary, detailed_content, tags):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO links (url, title, short_summary, detailed_content, tags)
        VALUES (?, ?, ?, ?, ?)
    ''', (url, title, short_summary, detailed_content, tags))
    conn.commit()
    link_id = cursor.lastrowid
    conn.close()
    return link_id

def get_all_links():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM links ORDER BY created_at DESC')
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def get_link(link_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM links WHERE id = ?', (link_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return dict(row)
    return None

# Simple chat history store to maintain context
def get_chat_history_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_chat_db():
    conn = get_chat_history_db()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS chat_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def save_chat_message(role, content):
    conn = get_chat_history_db()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO chat_history (role, content) VALUES (?, ?)', (role, content))
    conn.commit()
    conn.close()

def get_chat_history():
    conn = get_chat_history_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM chat_history ORDER BY id ASC')
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

# Initialize on reload
init_db()
init_chat_db()
