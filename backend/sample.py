import os
import re
from PyPDF2 import PdfReader
from docx import Document

def convert_to_txt(file_path):
    # Check the file extension
    ext = os.path.splitext(file_path)[1].lower()
    
    if ext == '.pdf':
        return convert_pdf_to_txt(file_path)
    elif ext in ['.doc', '.docx']:
        return convert_docx_to_txt(file_path)
    elif ext == '.txt':
        return convert_txt_to_txt(file_path)
    else:
        raise ValueError("Unsupported file format. Please upload a PDF, DOC/DOCX, or TXT file.")

def convert_pdf_to_txt(pdf_path):
    # Convert PDF to TXT
    with open(pdf_path, 'rb') as file:
        reader = PdfReader(file)
        text = ''
        for page in reader.pages:
            text += page.extract_text() + '\n'
    return text

def convert_docx_to_txt(docx_path):
    # Convert DOCX to TXT
    doc = Document(docx_path)
    text = ''
    for paragraph in doc.paragraphs:
        text += paragraph.text + '\n'
    return text

def convert_txt_to_txt(txt_path):
    with open(txt_path, 'r', encoding='utf-8') as file:
        return file.read()

def parse_resume(resume_text):
    # Initialize a dictionary to store parsed information
    parsed_data = {
        "Contact Information": {},
        "Education": [],
        "Skills": [],
        "Projects": [],
        "Certificates": [],
        "Work Experience": [],
        "Positions of Responsibility": [],
        "Extracurricular Activities": []
    }

    # Regular expressions for parsing contact information
    phone_pattern = r'\+?\d{10,15}'
    email_pattern = r'[\w\.-]+@[\w\.-]+'
    linkedin_pattern = r'linkedin\.com/in/[\w-]+'
    location_pattern = r'(?i)([A-Z][a-z]+(?: [A-Z][a-z]+)*)'  # This may need refining

    # Extract contact information
    phone_match = re.search(phone_pattern, resume_text)
    email_match = re.search(email_pattern, resume_text)
    linkedin_match = re.search(linkedin_pattern, resume_text)
    location_match = re.search(location_pattern, resume_text)

    if phone_match:
        parsed_data["Contact Information"]["Phone"] = phone_match.group(0)
    if email_match:
        parsed_data["Contact Information"]["Email"] = email_match.group(0)
    if linkedin_match:
        parsed_data["Contact Information"]["LinkedIn"] = linkedin_match.group(0)
    if location_match:
        parsed_data["Contact Information"]["Location"] = location_match.group(0)

    # Dynamically identify sections
    sections = {
        "Education": ["education", "academic"],
        "Skills": ["skills", "technologies", "proficiency"],
        "Projects": ["projects", "project highlights"],
        "Certificates": ["certificates", "certifications"],
        "Work Experience": ["experience", "intern", "internship", "work"],
        "Positions of Responsibility": ["position", "responsibility", "leadership"],
        "Extracurricular Activities": ["extra", "extracurricular", "activities", "volunteer"]
    }

    current_section = None
    lines = resume_text.split('\n')

    for line in lines:
        line = line.strip()

        # Detect section change
        for section, keywords in sections.items():
            if any(keyword.lower() in line.lower() for keyword in keywords):
                current_section = section
                break
        
        # Add line to the current section
        if current_section:
            parsed_data[current_section].append(line)

    return parsed_data

def print_parsed_resume(parsed_resume):
    print("=== Resume ===\n")
    
    print("Contact Information:")
    for key, value in parsed_resume["Contact Information"].items():
        print(f"- {key}: {value}")
    print()
    
    for section in ["Education", "Skills", "Projects", "Certificates", "Work Experience", "Positions of Responsibility", "Extracurricular Activities"]:
        print(f"{section}:")
        for item in parsed_resume[section]:
            print(f"- {item}")
        print()

# Example usage
input_file_path = 'Yashraj_Gaikwad_AWS_Resume.pdf'  # Replace with your input file path (PDF, DOC/DOCX, or TXT)

# Convert the input file to text
try:
    resume_text = convert_to_txt(input_file_path)
    # Parse the text
    parsed_resume = parse_resume(resume_text)
    # Print the parsed resume
    print_parsed_resume(parsed_resume)
except Exception as e:
    print(f"An error occurred: {e}")