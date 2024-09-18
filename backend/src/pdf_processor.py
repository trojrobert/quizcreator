import io

import PyPDF2


def extract_text_from_pdf(pdf_content: bytes) -> str:
    text = ""
    pdf_file = io.BytesIO(pdf_content)
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    num_pages = len(pdf_reader.pages)

    for page_num in range(num_pages):
        page = pdf_reader.pages[page_num]
        text += page.extract_text()

    return text
