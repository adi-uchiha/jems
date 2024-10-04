import re
from collections import Counter

def job_recommendation(job_postings, resume):
    # print(job_postings)
    # print(resume)
    # Function to extract keywords from text
    def extract_keywords(text):
        # Convert to lowercase and split into words
        words = re.findall(r'\w+', text.lower())
        # Remove common words (you can expand this list)
        stop_words = set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'])
        return [word for word in words if word not in stop_words]

    # Extract keywords from resume
    resume_keywords = extract_keywords(resume)

    # Function to calculate match score
    def calculate_match_score(job_posting):
        job_keywords = extract_keywords(job_posting['Description'])
        common_keywords = set(resume_keywords) & set(job_keywords)
        return len(common_keywords)

    # Calculate match scores for all job postings
    for job in job_postings:
        job['match_score'] = calculate_match_score(job)

    # Sort job postings by match score (descending)
    sorted_jobs = sorted(job_postings, key=lambda x: x['match_score'], reverse=True)

    # Return top 5 recommendations
    top_5 = sorted_jobs[:5]
    return [{'Company': job['Company'], 'Link': job['Link'], 'Designation': job['Designation']} for job in top_5]
