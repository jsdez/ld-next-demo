// components/Checklist.tsx
"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const Checklist = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Introduce the company and its mission", checked: false },
    { id: 2, text: "Review current progress of projects", checked: false },
    { id: 3, text: "Discuss challenges and roadblocks", checked: false },
    { id: 4, text: "Plan next steps and action items", checked: false },
    { id: 5, text: "Assign roles for upcoming tasks", checked: false },
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
