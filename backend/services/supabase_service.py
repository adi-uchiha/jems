# services/supabase_service.py
from supabase import create_client, Client
from config import SUPABASE_URL, SUPABASE_KEY
import io

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
BUCKET_NAME = "resume-bucket"

def delete_all_files():
    response = supabase.storage.from_(BUCKET_NAME).list()
    for file in response:
        supabase.storage.from_(BUCKET_NAME).remove([file['name']])
    print("All files deleted from storage")

def upload_pdf(file_content, file_name):
    response = supabase.storage.from_(BUCKET_NAME).upload(file_name, file_content)
    print(f"File uploaded: {response}")
    return response

def get_pdf():
    response = supabase.storage.from_(BUCKET_NAME).list()
    print(f"Response: {response}")
    if not response:
        raise Exception("No PDF found in storage")
    file_name = response[0]['name']
    file_data = supabase.storage.from_(BUCKET_NAME).download(file_name)
    return io.BytesIO(file_data)

def store_parsed_resume(filename, extraction):
    response = supabase.table('parsed-resume').insert({
        "filename": filename,
        "extraction": extraction
    }).execute()
    print(f"Parsed resume stored: {response}")
    return response

def get_parsed_resume():
    response = supabase.table('parsed-resume').select('*').limit(1).execute()
    if not response.data:
        raise Exception("No parsed resume found")
    return response.data[0]['extraction']

def get_jobs_from_table(table_name):
    response = supabase.table(table_name).select('*').execute()
    if not response.data:
        raise Exception(f"No jobs found in table {table_name}")
    return response.data