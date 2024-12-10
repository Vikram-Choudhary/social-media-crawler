from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from sentiment_analysis_bar_chart import fetch_and_analyze_sentiments
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.environ.get("MONGODB_URI")

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/testconnection')
def testConnections():
    """
    Test connection for API and MongoDB.
    """
    try:
        client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=2000)  # 2 second timeout
        client.admin.command("ping")
        return {"status": 200, "message": "Connection check API and MongoDB successful."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database connection failed: {e}")

@app.get("/sentiments")
def get_sentiments():
    """
    Run sentiment analysis and return the counts as JSON.
    """
    sentiments = fetch_and_analyze_sentiments()
    return sentiments
