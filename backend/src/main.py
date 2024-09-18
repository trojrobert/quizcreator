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
    allow_origins=["http://localhost:3000"],  # Adjust this to your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QuizSettings(BaseModel):
    text: str
    numQuestions: int
    numOptions: int


class QuizQuestion(BaseModel):
    text: str
    options: List[str]
    answer: str


class Quiz(BaseModel):
    questions: List[QuizQuestion]


@app.post("/api/generate-quiz", response_model=Quiz)
async def api_generate_quiz(settings: QuizSettings):
    try:
        quiz = generate_quiz(settings.text, settings.numQuestions, settings.numOptions)
        return Quiz(questions=quiz["questions"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        text = extract_text_from_pdf(contents)
        return {"text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
