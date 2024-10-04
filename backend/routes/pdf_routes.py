from fastapi import APIRouter, UploadFile, File
from fastapi.responses import FileResponse, JSONResponse
from services.supabase_service import delete_all_files, upload_pdf, get_pdf, store_parsed_resume
from services.pdf_parser import extract_key_features

import tempfile
import os

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Delete all existing files
        delete_all_files()
        # Read the uploaded file content
        file_content = await file.read()
        # Upload the new PDF
        response = upload_pdf(file_content, file.filename)
        print(f"Upload response: {response}")
        return {"message": "File uploaded successfully"}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@router.get("/view-pdf")
async def view_pdf():
    try:
        pdf_content = get_pdf()
        
        # Create a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(pdf_content.getvalue())
            temp_file_path = temp_file.name

        # Use FileResponse to send the temporary file
        return FileResponse(temp_file_path, media_type="application/pdf", filename="document.pdf")
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
    
@router.get("/parse")
async def parse_pdf():
    try:
        pdf_content = get_pdf()
        extracted_text = extract_key_features(pdf_content)
        
        filename = "document.pdf"
        
        # Store the extracted text in the database
        store_result = store_parsed_resume(filename, extracted_text)
        print(f"Store result: {store_result}")
        return JSONResponse(content={
            "message": "PDF parsed and stored successfully",
            "filename": filename,
            "extraction_length": len(extracted_text)
        })
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)