// app/page.tsx

import Checklist from "@/components/Checklist"; // Import the Checklist component

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full h-full bg-transparent dark:bg-gray-900 transition-all duration-300 ease-in-out">
      <section className="max-w-lg w-full text-center p-8 bg-transparent">
        <h2 className="text-3xl font-semibold mb-4">Welcome to ABC Company</h2>
        <p className="text-lg md:text-xl">
          This is an application where we can track talking points in our meeting. Below is a checklist to guide the conversation.
        </p>
      </section>

      {/* Checklist Section */}
      <section className="mt-8 p-4 rounded-lg max-w-xl w-full">
        <h3 className="text-xl font-semibold mb-4">Presentation Checklist</h3>
        <Checklist />
      </section>
    </main>
  );
}
