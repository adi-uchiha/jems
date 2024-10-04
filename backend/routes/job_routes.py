from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse
from services.supabase_service import get_parsed_resume, get_jobs_from_table
from services.matching import job_recommendation

router = APIRouter()

@router.get("/job-recommendations")
async def get_job_recommendations(table_name: str = Query(..., description="Name of the SQL table containing job postings")):
    try:
        # Get the parsed resume
        resume = get_parsed_resume()

        # Get jobs from the specified table
        jobs = get_jobs_from_table(table_name)
        # Prepare job postings for the matching function
        job_postings = [
            {
                'Company': job.get('Company', ''),
                'Link': job.get('Link', ''),
                'Description': job.get('Description', ''),
                'Designation': job.get('Designation', '')
            }
            for job in jobs
        ]

        # Get recommendations
        recommendations = job_recommendation(job_postings, resume)

        return JSONResponse(content={"recommendations": recommendations})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})