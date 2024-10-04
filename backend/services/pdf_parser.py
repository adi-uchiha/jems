import PyPDF2
import io

def extract_key_features(pdf_content):
    pdf_reader = PyPDF2.PdfReader(pdf_content)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    
    # Here you would implement more sophisticated parsing logic
    # For now, we'll just return the full text as key features
    # print(f"Extracted text: {text}")
    return text