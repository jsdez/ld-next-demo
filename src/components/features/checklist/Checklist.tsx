// components/Checklist.tsx

"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface ChecklistItem {
  id: number;
  text: string;
  checked: boolean;
}

interface ChecklistProps {
  onComplete: () => void;  // Add the onComplete prop
}

const Checklist = ({ onComplete }: ChecklistProps) => {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: 1, text: "Turn on the feature flag to enable the chat bot", checked: false },
    { id: 2, text: "Test to make sure the chat bot feature works", checked: false },
    { id: 3, text: "Reverse the changes to turn off the chat bot", checked: false },
    { id: 4, text: "Implement the feature flag that enables theme change based on user role", checked: false },
    { id: 5, text: "Switch user roles to show the the feature appearing in context", checked: false },
    { id: 6, text: "Demonstrate the integration with vscode", checked: false },
    { id: 7, text: "Show the metric of which theme is more preferred", checked: false },
    { id: 8, text: "Show the metric on how long it took to complete this checklist", checked: false },
  ]);

  useEffect(() => {
    // Check if all checkboxes are checked, then call onComplete
    if (items.every(item => item.checked)) {
      onComplete();  // Call the onComplete function passed as a prop
    }
  }, [items, onComplete]);  // Re-run this effect whenever items change

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
