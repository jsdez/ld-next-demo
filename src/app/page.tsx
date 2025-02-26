// app/page.tsx
"use client";

import { useUserContext } from "../context/UserContext";
import Checklist from "@/components/features/checklist/Checklist";
import Chatbot from "@/components/features/chatbot/Chatbot";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import { useState, useEffect } from "react";
import { useLaunchDarklyIdentify } from "@/hooks/useLaunchDarklyIdentify"; // Import the new hook

export default function Home() {
  const { user } = useUserContext();
  const { enableChatbot } = useFlags();
  const ldClient = useLDClient();
  const [startTime, setStartTime] = useState<number | null>(null);
  const [completedTime, setCompletedTime] = useState<number | null>(null);
  
  // Use the identify hook to ensure LD context is updated
  useLaunchDarklyIdentify();

  // Start tracking time once the user is logged in
  useEffect(() => {
    if (user) {
      setStartTime(Date.now());
      console.log("Started tracking time for user:", user.name);
    }
  }, [user]);

  // This function can be called once all checkboxes are checked
  const handleChecklistCompletion = () => {
    if (startTime && ldClient) {
      const elapsedTime = (Date.now() - startTime) / 1000; // Time in seconds
      setCompletedTime(elapsedTime);
  
      console.log(`Tracking completion time: ${elapsedTime}s for user: ${user?.name}`);
      
      // Send the event to LaunchDarkly with the correct event key
      ldClient.track('time-to-complete-checklist-seconds', {
        value: elapsedTime,
        userName: user?.name,
        userGroup: user?.group,
      });
    }
  };
  
  if (!user) {
    return (
      <main className="flex flex-col items-center justify-center w-full h-full bg-transparent dark:bg-gray-900 transition-all duration-300 ease-in-out">
        <section className="max-w-auto w-full text-center p-8 bg-transparent">
          <h2 className="text-3xl font-semibold mb-6">Please log in to continue</h2>
        </section>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center w-full h-full bg-transparent dark:bg-gray-900 transition-all duration-300 ease-in-out">
      <section className="max-w-auto w-full text-center p-8 bg-transparent">
        <h2 className="text-3xl font-semibold mb-6">
          Welcome to the demo, {user.name}! <br></br> You are logged in as a {user.group}.
        </h2>
        <p className="text-lg md:text-xl mb-4">
          This application is designed to help track your progress while showing a technical demo for LaunchDarkly.
        </p>
        <p className="text-lg md:text-xl mt-4">
          By tracking your steps in this app, you can easily check off each item as you complete them.
        </p>
      </section>
      {/* Checklist Section */}
      <section className="mt-8 p-4 rounded-lg max-w-2xl w-full">
        <h3 className="text-xl font-semibold mb-4">Presentation Checklist</h3>
        <Checklist onComplete={handleChecklistCompletion} />
      </section>
      {/* Conditionally render the Chatbot based on the feature flag */}
      {enableChatbot ? (
        <Chatbot />
      ) : (
        ''
      )}
      
      {/* Display the completed time if available */}
      {completedTime !== null && (
        <div className="mt-4 text-lg">
          <p>Time to complete the checklist: {completedTime.toFixed(2)} seconds</p>
        </div>
      )}
    </main>
  );
}