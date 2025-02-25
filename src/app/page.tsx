// app/page.tsx

"use client";  // Important: This ensures it's a client-side component

import { useUserContext } from "../context/UserContext"; // Import the UserContext hook
import Checklist from "@/components/Checklist"; // Import the Checklist component
import Chatbot from "@/components/Chatbot";

export default function Home() {
  const { user } = useUserContext();  // Access the user context

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
        <Checklist />
      </section>
      <Chatbot />
    </main>
  );
}
