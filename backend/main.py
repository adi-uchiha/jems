# main.py
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel
from supabase_py import create_client
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Supabase setup
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase = create_client(supabase_url, supabase_key)

# Database setup
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# FastAPI app
app = FastAPI()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Authentication middleware
async def get_current_user(token: str):
    try:
        user = supabase.auth.api.get_user(token)
        return user
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

# Models
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)

# Pydantic models for request/response
class UserCreate(BaseModel):
    email: str
    full_name: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str

    class Config:
        orm_mode = True

# Routes
@app.post("/users/", response_model=UserResponse)
async def create_user(user: UserCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    db_user = User(email=user.email, full_name=user.full_name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/{user_id}", response_model=UserResponse)
async def read_user(user_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)