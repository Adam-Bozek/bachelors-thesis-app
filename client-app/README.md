# JSON File Structure Documentation for `O_A_BP_Fad.json` and `SoA_AS.json`

This document outlines the structure of the JSON file containing marketplace item questions and answers.
File names represent this:
- `O_A_BP_FaD.json`: Objects, Animals, Body Parts, Food and Drinks
- `SoA_AS.json`: Sounds of Animals and Surroudndings
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
    "id": 37,
    "questionNo": 11,
    "question": "Na ktorom obrázku je pohár?",
    "answers": [
        {
            "id": 1,
            "isCorrect": true,
            "answer": "Pohár"
        },
        {
            "id": 2,
            "isCorrect": false,
            "answer": "Tanier"
        },
        {
            "id": 3,
            "isCorrect": false,
            "answer": "Vydlička"
        },
        {
            "id": 4,
            "isCorrect": false,
            "answer": "Kohútik"
        },
        {
            "id": 5,
            "isCorrect": false,
            "answer": "Fľaša"
        },
        {
            "id": 6,
            "isCorrect": false,
            "answer": "Kefka"
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

# FEATURES

One of the features developed is playng question audio when slide witch question si played. This feature is implemented but not used. It is used in Tiles component.

```javascript
useEffect(() => {
    // Start playing audio when the current slide is active
    if (isCurrentSlide) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isCurrentSlide]);

```