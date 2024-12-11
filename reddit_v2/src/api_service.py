from fastapi import FastAPI, Query
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from sentiment_analysis_bar_chart import fetch_and_analyze_sentiments

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
    Test Connection for API.
    """
    test_ok={"status":200}
    return test_ok

@app.get("/sentimentsReddit")
def get_sentiments(
    subreddit: Optional[str] = Query(None, description="Filter by subreddit name"),
    from_date: Optional[str] = Query(None, alias="from", description="Start date in ISO format (YYYY-MM-DD)"),
    to_date: Optional[str] = Query(None, description="End date in ISO format (YYYY-MM-DD)")
):
    """
    Run sentiment analysis and return the counts as JSON.
    
    Args:
        subreddit (str): Subreddit name to filter (optional).
        from_date (str): Start date in ISO format (YYYY-MM-DD) (optional).
        to_date (str): End date in ISO format (YYYY-MM-DD) (optional).
    """
    # Call the fetch_and_analyze_sentiments function with the query parameters
    sentiments = fetch_and_analyze_sentiments(subreddit=subreddit, date_from=from_date, date_to=to_date)
    return {"sentiments": sentiments}
