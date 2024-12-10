import { useState, useEffect } from "react";
import SentimentChart from "./SentimentChart";

export default function Home() {
  const [connectionStatus, setConnectionStatus] = useState(0); // 0: Loading, 1: Connected, -1: Failed

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      setConnectionStatus(-1);
    }, 5000);

    const checkAPIConnection = async () => {
      try {
        console.log("Request: /testconnection");
        const response = await fetch("http://127.0.0.1:8000/testconnection", {
          signal: controller.signal,
        });
        if (response.ok) {
          await response.json();
          clearTimeout(timeoutId);
          setConnectionStatus(1);
        } else {
          throw new Error("API response not OK");
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.error("Connection request timed out.");
        } else {
          console.error("Error connecting backend API:", error);
        }
        setConnectionStatus(-1);
      }
    };

    checkAPIConnection();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  const renderContent = () => {
    switch (connectionStatus) {
      case 0:
        return <div className="error-msg"> <div className="app-loader"><div class="loader"></div>Loading...</div>Checking API connection...</div>;
      case -1:
        return (
          <div className="error-msg">
            Unable to connect to API. Please ensure the API service is running in backend.
          </div>
        );
      case 1:
        return (
          <div style={{ width: "600px", margin: "0 auto" }}>
            <h1>4chan Job Market Sentiment Analysis</h1>
            <SentimentChart />
          </div>
        );
      default:
        return null;
    }
  };

  return renderContent();
}
