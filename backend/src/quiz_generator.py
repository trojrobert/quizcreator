import json
import os

import openai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
# Access the API key using the variable name defined in the .env file
api_key = os.getenv("OPENAI_API_KEY")


def generate_quiz(text, num_questions, num_options):
    # TODO: make it an async function
    # TODO: add typing
    prompt = f"""
    Based on the following text, generate a quiz with {num_questions} questions. 
    Each question should have {num_options} options with only one correct answer. 
    Provide the correct answer for each question.
    Format the output as a JSON array of objects, where each object represents a question with the following structure:
    {{
        "question": "The question text",
        "options": ["Option A", "Option B", "Option C", ...],
        "correct_answer": "The correct option"
    }}

    Text:
    {text}

    Generate the quiz:
    """

    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant that generates quizzes based on given text.",
            },
            {"role": "user", "content": prompt},
        ],
        max_tokens=1000,
        n=1,
        stop=None,
        temperature=0.7,
    )

    quiz_json = response.choices[0].message.content.strip()

    # Remove the 'json' keyword and any surrounding whitespace
    clean_quiz_json = str(quiz_json).replace("json", "").strip()
    clean_quiz_json = str(clean_quiz_json).replace("```", "").strip()

    # Convert the cleaned string to a JSON object (Python list of dictionaries)
    validated_quiz_json = json.loads(clean_quiz_json)

    print(f"response \n {type(validated_quiz_json)} \n {validated_quiz_json}")

    # quiz = json.loads(quiz_json)
    return validated_quiz_json
