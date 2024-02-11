# JSON File Structure Documentation for `Objects_Animals_BodyParts_FoodAndDrinks.json`

This document outlines the structure of the JSON file containing marketplace item questions and answers.

## Question Object

- `id` (integer): Unique identifier for each marketplace item.
- `questionNo` (integer): Number assigned to the question within its section.
- `question` (string): The text of the question being asked.
- `answers` (array): An array containing possible answers to the question.

### Answer Object

- `id` (integer): Unique identifier for each answer.
- `isCorrect` (boolean): Indicates whether the answer is correct (`true`) or not (`false`).
- `answer` (string): The text of the answer.

## Sections

Each section corresponds to a different category of questions.

### Marketplace 

This section contains questions related to marketplace items.

#### Example Question:

```json
{
    "id": 1,
    "questionNo": 1,
    "question": "Na ktorom obrázku je ananás?",
    "answers": [
        {
            "id": 1,
            "isCorrect": true,
            "answer": "Ananás"
        },
        {
            "id": 2,
            "isCorrect": false,
            "answer": "Kiwi"
        },
        {
            "id": 3,
            "isCorrect": false,
            "answer": "Mango"
        },
        {
            "id": 4,
            "isCorrect": false,
            "answer": "Avokádo"
        },
        {
            "id": 5,
            "isCorrect": false,
            "answer": "Citrón"
        },
        {
            "id": 6,
            "isCorrect": false,
            "answer": "Jablko"
        }
    ]
}
```
### Mountains, Zoo, Home, and Street

Each of these sections follows the same structure as the Marketplace section.

## Default JSON Format
This is the default structure for a question object with blank question and answer fields:

```json
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
```

This structure serves as a template for creating new questions.