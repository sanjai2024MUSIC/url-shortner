
"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function shortenURL() {
    if (url.trim() === "") {
      alert("Please enter a URL");
      return;
    }

    setLoading(true);
    setShortUrl("");

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Unable to shorten URL");
        return;
      }

      setShortUrl(data.shortUrl);

    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <div className="card">

        <h1>URL Shortener</h1>

        <p className="description">
          Make your long URLs short and easy to share.
        </p>

        <input
          type="url"
          placeholder="Enter your long URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button onClick={shortenURL} disabled={loading}>
          {loading ? "Shortening..." : "Shorten URL"}
        </button>

        <div className="result">
          {shortUrl ? (
            <>
              <p>Your short URL:</p>
              <a href={shortUrl} target="_blank" rel="noreferrer">
                {shortUrl}
              </a>
            </>
          ) : (
            <p>Your shortened URL will appear here.</p>
          )}
        </div>

      </div>
    </main>
  );
}

