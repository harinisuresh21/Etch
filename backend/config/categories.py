from __future__ import annotations

CATEGORIES = {
    "Technology": {
        "Python Development": [
            "python", "django", "flask", "fastapi", "pandas", "numpy", "asyncio",
            "pytest", "pip", "conda", "jupyter", "pydantic", "sqlalchemy"
        ],
        "Web Development": [
            "javascript", "typescript", "react", "vue", "nextjs", "nuxt", "svelte",
            "html", "css", "tailwind", "nodejs", "express", "webpack", "vite",
            "frontend", "backend", "fullstack", "api", "graphql", "rest"
        ],
        "AI/ML": [
            "machine learning", "deep learning", "llm", "transformers", "pytorch",
            "tensorflow", "rag", "embeddings", "vector", "fine-tuning", "inference",
            "huggingface", "openai", "anthropic", "gemini", "langchain", "llamaindex"
        ],
        "DevOps": [
            "docker", "kubernetes", "k8s", "ci/cd", "github actions", "gitlab ci",
            "terraform", "ansible", "aws", "gcp", "azure", "cloud", "serverless",
            "monitoring", "prometheus", "grafana", "logging"
        ],
        "Data Science": [
            "pandas", "numpy", "visualization", "matplotlib", "seaborn", "plotly",
            "statistics", "jupyter", "sql", "etl", "data analysis", "feature engineering"
        ],
        "Backend": [
            "api", "database", "sql", "postgresql", "mysql", "redis", "mongodb",
            "graphql", "rest", "microservices", "grpc", "message queue", "rabbitmq"
        ],
        "Security": [
            "authentication", "authorization", "oauth", "jwt", "encryption",
            "vulnerability", "penetration testing", "owasp", "ssl", "tls"
        ],
        "Mobile": [
            "flutter", "react native", "swift", "kotlin", "android", "ios",
            "mobile development", "expo", "capacitor"
        ],
        "Blockchain": [
            "blockchain", "ethereum", "solidity", "web3", "smart contract",
            "defi", "nft", "crypto", "bitcoin"
        ],
    },
    "Science": {
        "Life Sciences": [
            "biology", "genetics", "genomics", "neuroscience", "ecology",
            "medicine", "pharmacology", "immunology", "bioinformatics",
            "evolution", "cell biology", "molecular biology"
        ],
        "Physics": [
            "quantum", "relativity", "particle", "astrophysics", "cosmology",
            "thermodynamics", "mechanics", "electromagnetism", "string theory"
        ],
        "Chemistry": [
            "organic", "molecular", "reaction", "periodic", "synthesis",
            "catalysis", "biochemistry", "analytical chemistry"
        ],
        "Earth Science": [
            "geology", "climate", "meteorology", "oceanography", "environmental"
        ],
        "Space": [
            "astronomy", "space", "nasa", "mars", "telescope", "exoplanet"
        ],
    },
    "Arts & Humanities": {
        "Literature": [
            "poetry", "poem", "novel", "fiction", "author", "literary",
            "short story", "writing", "publishing", "book review"
        ],
        "Philosophy": [
            "ethics", "metaphysics", "epistemology", "stoicism", "existentialism",
            "logic", "phenomenology", "political philosophy"
        ],
        "History": [
            "ancient", "medieval", "renaissance", "world war", "civilization",
            "archaeology", "historical", "biography", "war"
        ],
        "Visual Arts": [
            "painting", "sculpture", "photography", "design", "illustration",
            "art history", "museum", "gallery", "artist"
        ],
        "Music": [
            "music", "composition", "instrument", "theory", "genre", "band",
            "orchestra", "songwriter", "producer"
        ],
    },
    "Finance & Business": {
        "Investing": [
            "investing", "stocks", "bonds", "etf", "portfolio", "dividend",
            "value investing", "technical analysis", "fundamental analysis"
        ],
        "Crypto": [
            "crypto", "bitcoin", "ethereum", "defi", "nft", "web3", "blockchain"
        ],
        "Economics": [
            "economics", "macroeconomics", "microeconomics", "inflation",
            "interest rates", "fed", "central bank", "gdp", "recession"
        ],
        "Entrepreneurship": [
            "startup", "entrepreneur", "business", "saas", "funding", "vc",
            "ycombinator", "product market fit", "growth"
        ],
        "Personal Finance": [
            "budget", "savings", "retirement", "401k", "ira", "tax", "insurance"
        ],
    },
    "Health & Lifestyle": {
        "Fitness": [
            "fitness", "workout", "exercise", "strength", "cardio", "running",
            "weightlifting", "yoga", "pilates", "hiit"
        ],
        "Nutrition": [
            "nutrition", "diet", "protein", "macros", "calories", "meal prep",
            "supplements", "vitamins", "intermittent fasting"
        ],
        "Mental Health": [
            "mental health", "anxiety", "depression", "therapy", "mindfulness",
            "meditation", "stress", "burnout", "wellbeing"
        ],
        "Productivity": [
            "productivity", "time management", "habits", "routine", "focus",
            "deep work", "pomodoro", "note taking", "organization"
        ],
    },
    "Education": {
        "Learning": [
            "learning", "study", "course", "tutorial", "guide", "how to",
            "education", "university", "degree", "certification"
        ],
        "Language": [
            "language", "english", "spanish", "french", "japanese", "grammar",
            "vocabulary", "translation", "linguistics"
        ],
    },
    "Entertainment": {
        "Movies & TV": [
            "movie", "film", "tv", "series", "netflix", "cinema", "actor",
            "director", "review", "streaming"
        ],
        "Gaming": [
            "game", "gaming", "video game", "esports", "steam", "console",
            "rpg", "fps", "strategy game"
        ],
    },
}

# Flattened for easy matching: keyword -> (main_category, subcategory)
KEYWORD_MAP: dict[str, tuple[str, str]] = {}
for main_cat, subcats in CATEGORIES.items():
    for subcat, keywords in subcats.items():
        for kw in keywords:
            KEYWORD_MAP[kw.lower()] = (main_cat, subcat)

ALL_CATEGORIES = [f"{main} > {sub}" for main, subcats in CATEGORIES.items() for sub in subcats]
ALL_CATEGORIES.append("General")


def rule_based_categorize(tags: str, title: str = "", content: str = "") -> list[str]:
    """Return list of 'Main > Sub' categories matched from tags/title/content."""
    text = " ".join(filter(None, [tags, title, content])).lower()
    matched: set[str] = set()

    for keyword, (main, sub) in KEYWORD_MAP.items():
        if keyword in text:
            matched.add(f"{main} > {sub}")

    return sorted(matched) if matched else ["General"]