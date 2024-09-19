from typing import List

import uvicorn
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from pdf_processor import extract_text_from_pdf
from pydantic import BaseModel
from quiz_generator import generate_quiz

app = FastAPI()
handler = Mangum(app)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Models
class QuizSettings(BaseModel):
    title: str
    numQuestions: int
    numOptions: int
    difficulty: str
    text: str


class QuizQuestion(BaseModel):
    text: str
    options: List[str]
    answer: str


# Health check endpoint
@app.get("/health")
async def check_health():
    return {"message": "Good"}


# Generate quiz endpoint
@app.post("/api/generate-quiz")
async def api_generate_quiz(settings: QuizSettings):
    try:
        # Generate the quiz using the provided settings
        quiz_data = generate_quiz(
            settings.title,
            settings.numQuestions,
            settings.numOptions,
            settings.difficulty,
            settings.text,
        )

        # # Ensure that the quiz data matches the QuizQuestion model structure
        # quiz = [QuizQuestion(**question) for question in quiz_data]
        return quiz_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Upload PDF and extract text endpoint
@app.post("/api/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        text = extract_text_from_pdf(contents)
        return {"text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Uncomment for local development if needed
# if __name__ == "__main__":
#     uvicorn.run("api:app", host="0.0.0.0", port=8080, reload=True)
