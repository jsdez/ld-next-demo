// components/Checklist.tsx
"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const Checklist = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Turn on the feature flag to enable the chat bot", checked: false },
    { id: 2, text: "Test to make sure the chat bot feature works", checked: false },
    { id: 3, text: "Reverse the changes to turn off the chat bot", checked: false },
    { id: 4, text: "Implement the feature flag that enables theme change based on user role", checked: false },
    { id: 5, text: "Switch user roles to show the the feature appearing in context", checked: false },
    { id: 6, text: "Show the metric of which theme is more preferred", checked: false },
    { id: 7, text: "Demonstrate the intrgration with Vercel", checked: false },
    { id: 8, text: "Show the metric on how long it took to complete this checklist", checked: false },
  ]);

  const handleCheck = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="space-y-4 p-4 rounded-lg shadow-md">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center space-x-2 text-sm md:text-base"
        >
          <Checkbox
            checked={item.checked}
            onCheckedChange={() => handleCheck(item.id)}
            aria-label={`Check if "${item.text}" is covered`}
            className="text-primary dark:text-primary-foreground"
          />
          <span
            className={`${
              item.checked ? "line-through text-gray-500 dark:text-gray-400" : ""
            }`}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Checklist;
