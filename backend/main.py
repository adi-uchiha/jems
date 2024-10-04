from fastapi import FastAPI
from routes.pdf_routes import router as pdf_router
from routes.job_routes import router as job_router

app = FastAPI()
app.include_router(pdf_router)
app.include_router(job_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)