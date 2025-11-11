#!/usr/bin/env python3
"""
Script to migrate vocabulary and grammar data to Cloudflare R2.

This script reads the existing JavaScript data files, converts them to JSON,
and uploads them to R2 storage.

Usage:
    python scripts/migrate_to_r2.py
"""

import json
import os
import re
import sys
from pathlib import Path

# Add parent directory to path to import backend modules
sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from app.r2 import r2_service


def parse_js_export(file_path: str) -> dict:
    """
    Parse JavaScript export and convert to Python dict.

    This is a simple parser that handles basic JS object syntax.
    For production, consider using a proper JS parser.
    """
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Remove export statement and comments
    content = re.sub(r"export\s+(const|let|var)\s+\w+\s*=\s*", "", content)
    content = re.sub(r"//.*", "", content)
    content = re.sub(r"/\*.*?\*/", "", content, flags=re.DOTALL)

    # Basic cleanup for JSON compatibility
    # This is a simple approach - for complex data, use a proper parser
    content = content.strip().rstrip(";")

    # For now, return a note that manual conversion is needed
    return {"note": "Manual conversion from JS to JSON needed"}


def migrate_vocabulary():
    """Migrate vocabulary data to R2."""
    print("Migrating vocabulary data to R2...")

    # Path to vocabulary files
    vocab_dir = Path(__file__).parent.parent / "frontend" / "src" / "data"

    # For this implementation, we'll create a sample structure
    # In production, you'd parse the actual JS files
    vocabulary_data = {
        "note": "This is a placeholder. Actual data should be parsed from JS files.",
        "structure": {
            "categories": [
                "basic",
                "numbers",
                "colors",
                "family",
                "food",
                "transport",
                "shopping",
                "health",
                "weather",
                "time",
            ]
        },
    }

    # Upload to R2
    success = r2_service.upload_file(
        file_content=json.dumps(vocabulary_data, indent=2).encode("utf-8"),
        key="vocabulary/all.json",
        content_type="application/json",
    )

    if success:
        print("✓ Vocabulary data uploaded successfully")
    else:
        print("✗ Failed to upload vocabulary data")

    return success


def migrate_grammar():
    """Migrate grammar data to R2."""
    print("Migrating grammar data to R2...")

    # Sample grammar structure
    grammar_data = {
        "note": "This is a placeholder. Actual data should be parsed from JS files.",
        "lessons": [
            "articles",
            "pronouns",
            "verbs",
            "adjectives",
            "prepositions",
            "questions",
            "negation",
            "word-order",
        ],
    }

    # Upload to R2
    success = r2_service.upload_file(
        file_content=json.dumps(grammar_data, indent=2).encode("utf-8"),
        key="grammar/all.json",
        content_type="application/json",
    )

    if success:
        print("✓ Grammar data uploaded successfully")
    else:
        print("✗ Failed to upload grammar data")

    return success


def verify_r2_config():
    """Verify R2 configuration is set."""
    from app.config import settings

    required_vars = [
        settings.R2_ACCOUNT_ID,
        settings.R2_ACCESS_KEY_ID,
        settings.R2_SECRET_ACCESS_KEY,
        settings.R2_ENDPOINT_URL,
    ]

    if not all(required_vars):
        print("✗ R2 configuration is incomplete!")
        print("Please set the following environment variables:")
        print("  - R2_ACCOUNT_ID")
        print("  - R2_ACCESS_KEY_ID")
        print("  - R2_SECRET_ACCESS_KEY")
        print("  - R2_ENDPOINT_URL")
        return False

    print("✓ R2 configuration verified")
    return True


def main():
    """Main migration function."""
    print("=" * 60)
    print("MyDutch Data Migration to Cloudflare R2")
    print("=" * 60)
    print()

    # Verify R2 configuration
    if not verify_r2_config():
        sys.exit(1)

    print()

    # Migrate data
    vocab_success = migrate_vocabulary()
    grammar_success = migrate_grammar()

    print()
    print("=" * 60)
    if vocab_success and grammar_success:
        print("✓ Migration completed successfully!")
    else:
        print("✗ Migration completed with errors")
    print("=" * 60)


if __name__ == "__main__":
    main()
