#!/usr/bin/env python3
"""Extract the AWS CLF flashcards PDF into browser-ready JavaScript data."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

import pdfplumber


SECTIONS = {
    1: "操作ツール・初期設定",
    2: "アカウント管理・ガバナンス",
    3: "監視・運用・IaC・コスト管理",
    4: "セキュリティ・ID・コンプライアンス",
    5: "ストレージ",
    6: "コンピューティング・コンテナ・サーバーレス",
    7: "ネットワーク・配信",
    8: "データベース",
    9: "アプリケーション統合",
    10: "分析・データ基盤",
    11: "開発者ツール・移行",
    12: "AI・機械学習",
    13: "料金・サポート・設計思想",
}


def smart_join(parts: list[str]) -> str:
    result = ""
    for part in parts:
        if (
            result
            and result[-1].isascii()
            and result[-1].isalnum()
            and part
            and part[0].isascii()
            and part[0].isalnum()
        ):
            result += " "
        result += part
    return re.sub(r"\s+", " ", result).strip()


def extract_flashcards(pdf_path: Path) -> list[dict[str, object]]:
    section_lines = {
        f"{number:02d}. {title}": {"number": number, "title": title}
        for number, title in SECTIONS.items()
    }

    with pdfplumber.open(pdf_path) as pdf:
        text = "\n".join(page.extract_text() or "" for page in pdf.pages)

    items: list[dict[str, object]] = []
    current: dict[str, object] | None = None
    section: dict[str, object] | None = None

    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line:
            continue

        if line in section_lines:
            section = section_lines[line]
            continue

        question_match = re.match(r"^(\d{1,3})\.\s+(.*)$", line)
        if question_match and 1 <= int(question_match.group(1)) <= 150:
            if current:
                items.append(current)
            if section is None:
                raise ValueError(f"Question found before a section: {line}")
            current = {
                "number": int(question_match.group(1)),
                "sectionNumber": section["number"],
                "sectionTitle": section["title"],
                "parts": [question_match.group(2)],
            }
        elif current:
            current["parts"].append(line)

    if current:
        items.append(current)

    flashcards: list[dict[str, object]] = []
    for item in items:
        combined = smart_join(item.pop("parts"))
        if "回答：" not in combined:
            raise ValueError(f"Answer not found for question {item['number']}")
        prompt, answer = combined.split("回答：", 1)
        flashcards.append(
            {
                **item,
                "prompt": prompt.strip(),
                "answer": answer.strip(),
            }
        )

    expected_numbers = list(range(1, 151))
    actual_numbers = [int(card["number"]) for card in flashcards]
    if actual_numbers != expected_numbers:
        raise ValueError(f"Expected questions 1-150, got {actual_numbers}")

    return flashcards


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()

    flashcards = extract_flashcards(args.pdf)
    serialized = json.dumps(flashcards, ensure_ascii=False, indent=2)
    output = (
        "// Generated from aws_clf_service_flashcards_with_answers_v5.pdf.\n"
        "// Run scripts/extract_pdf_flashcards.py to regenerate this file.\n"
        f"const pdfFlashcards = Object.freeze({serialized});\n"
    )
    args.output.write_text(output, encoding="utf-8")
    print(f"Wrote {len(flashcards)} flashcards to {args.output}")


if __name__ == "__main__":
    main()
