"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion"; // For animations
import axios from "axios";

export default function YoutubePicker() {
  const [videoUrl, setVideoUrl] = useState("");
  const [winnerCount, setWinnerCount] = useState(1);
  const [winners, setWinners] = useState([]);
  const [error, setError] = useState("");

  const fetchWinners = async () => {
    // Validation
    if (!videoUrl.trim()) {
      setError("Please enter a valid YouTube video URL.");
      return;
    }
    if (winnerCount < 1) {
      setError("Winner count must be at least 1.");
      return;
    }

    setError(""); // Clear previous errors

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
        
        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

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
          min="1"
          onChange={(e) => setWinnerCount(Math.max(1, parseInt(e.target.value) || 1))}
          className="mb-4"
        />

        <Button onClick={fetchWinners} className="w-full">
          Get Winners 🎯
        </Button>

        {/* Winners Display */}
        {winners.length > 0 && (
          <motion.div 
            className="mt-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-center mb-4">🥇 Winners 🥇</h3>
            
            <div className="grid grid-cols-1 gap-4">
              {winners.map((winner, index) => (
                <motion.div
                  key={index}
                  className="p-4 border rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="font-semibold text-lg">{winner.name}</p>
                  <p className="text-sm italic text-gray-600 dark:text-gray-300">"{winner.comment}"</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
