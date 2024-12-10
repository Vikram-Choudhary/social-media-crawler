import localFont from "next/font/local";
import SentimentChart from "./SentimentChart";

export default function Home() {
  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <h1>4chan Job Market Sentiment Analysis</h1>
      <SentimentChart />
    </div>
  );
}
