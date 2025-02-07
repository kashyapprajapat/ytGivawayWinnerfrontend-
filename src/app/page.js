import YoutubePicker from "@/components/YoutubePicker";

import { Metadata } from "next";

export const metadata = {
  title: "YouTube Comment Picker - Random Winner Selector",
};


export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 sm:p-20">
      <YoutubePicker />
    </div>
  );
}
