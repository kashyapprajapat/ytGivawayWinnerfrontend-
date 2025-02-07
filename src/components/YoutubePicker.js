"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

export default function YoutubePicker() {
  const [videoUrl, setVideoUrl] = useState("");
  const [winnerCount, setWinnerCount] = useState(1);
  const [winners, setWinners] = useState([]);

  const fetchWinners = async () => {
    try {
      const response = await axios.post("https://youtubegiveawaypicker.onrender.com/get-winners", {
        videoUrl,
        winnerCount: parseInt(winnerCount),
      });
      setWinners(response.data.winners);
    } catch (error) {
      console.error("Error fetching winners:", error);
      setWinners([]);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto mt-10 p-6 shadow-lg">
      <CardContent>
        <h2 className="text-xl font-bold mb-4 text-center">🎉 YouTube Winner Picker 🎉</h2>
        <Input
          type="text"
          placeholder="Enter YouTube Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="mb-4"
        />
        <Input
          type="number"
          placeholder="Enter number of winners"
          value={winnerCount}
          onChange={(e) => setWinnerCount(e.target.value)}
          className="mb-4"
        />
        <Button onClick={fetchWinners} className="w-full">
          Get Winners 🎯
        </Button>

        {winners.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Winners:</h3>
            <ul className="list-disc pl-6">
              {winners.map((winner, index) => (
                <li key={index} className="mt-2">
                  {winner.name} - "{winner.comment}"
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
