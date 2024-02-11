<!-- TODO LIST for JSON files
-- TODO: ask about correct options in answers
-->

# Data Structure Documentation

This document describes the structure of the JSON file.

## Question

- `id`: Unique identifier for each marketplace item.
- `questionNo`: Number assigned to the question.
- `question`: The question being asked.
- `answers`: Array containing possible answers to the question.

### Answer

- `id`: Unique identifier for each answer.
- `isCorrect`: Indicates whether the answer is correct (`true`) or not (`false`).
- `answer`: The text of the answer.

## Marketplace, Mountains, Fishing, Forest, Home, Traveller, Building Site

These sections are filled with this code:

    {
        "id": 1,
        "questionNo": 1,
        "question": "",
        "answers": [
            {
                "id": 1,
                "isCorrect": true,
                "answer": ""
            },
            {
                "id": 2,
                "isCorrect": false,
                "answer": ""
            },
            {
                "id": 3,
                "isCorrect": false,
                "answer": ""
            },
            {
                "id": 4,
                "isCorrect": false,
                "answer": ""
            },
            {
                "id": 5,
                "isCorrect": false,
                "answer": ""
            },
            {
                "id": 6,
                "isCorrect": false,
                "answer": ""
            }
        ]
    }