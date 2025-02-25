// app/page.tsx

"use client";

import { useUserContext } from "../context/UserContext"; // Import the UserContext hook
import Checklist from "@/components/Checklist"; // Import the Checklist component
import Chatbot from "@/components/Chatbot";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk"; // Import necessary hooks from LaunchDarkly
import { useState, useEffect } from "react"; // For tracking time

export default function Home() {
  const { user } = useUserContext();  // Access the user context
  const { enableChatbot } = useFlags();  // Get the feature flag for enabling the chatbot
  const ldClient = useLDClient(); // Access the LDClient
  const [startTime, setStartTime] = useState<number | null>(null);  // Track start time
  const [completedTime, setCompletedTime] = useState<number | null>(null); // Track completion time

  // Start tracking time once the user is logged in
  useEffect(() => {
    if (user) {
      setStartTime(Date.now()); // Record start time when the user logs in
    }
  }, [user]);

  // This function can be called once all checkboxes are checked
  const handleChecklistCompletion = () => {
    if (startTime && ldClient) {
      const elapsedTime = (Date.now() - startTime) / 1000; // Time in seconds
      setCompletedTime(elapsedTime);

      // Send the custom event to LaunchDarkly
      ldClient.track('time_to_complete_checklist', {
        value: elapsedTime,
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
