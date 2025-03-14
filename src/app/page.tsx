//page.tsx

"use client";

import { useUserContext } from "../context/UserContext";
import ProductCard_03 from "@/components/commerce-ui/product-cards-03";
import ProductCard_01 from "@/components/commerce-ui/product-cards-01";
import Chatbot from "@/components/features/chatbot/Chatbot";
import { useFlags } from "launchdarkly-react-client-sdk";
import { useLaunchDarklyIdentify } from "@/hooks/useLaunchDarklyIdentify";
import { Toaster, toast } from "sonner"; // Install with `npm install sonner`

export default function Home() {
  const { user } = useUserContext();
  const { enableChatbot } = useFlags();
  useLaunchDarklyIdentify();

  const handleAddToCart = (productName: string) => {
    toast.success(`${productName} added to cart!`);
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
          Welcome to the demo, {user.name}! You are logged in as a {user.group}.
        </h2>
      </section>

      {/* Product Cards Section */}
      <section className="mt-8 p-4 rounded-lg max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Discounted Products */}
        <ProductCard_03 
          productName="Gaming Headphones" 
          tagText="EXCLUSIVE"
          imageUrl="https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/headphone-1.jpg"
          originalPrice={199}
          discountPercentage={25}
          onAddToCart={() => handleAddToCart("Gaming Headphones")}
        />
        <ProductCard_03 
          productName="Wired Headphones"
          tagText="LOW STOCK"
          imageUrl="https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/headphone-2.jpg"
          originalPrice={99}
          discountPercentage={25}
          onAddToCart={() => handleAddToCart("Wired Headphones")}
        />
        <ProductCard_03 
          productName="Wireless Headphones"
          tagText="NEW IN"
          imageUrl="https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/headphone-3.jpg"
          originalPrice={250}
          discountPercentage={25}
          onAddToCart={() => handleAddToCart("Wired Headphones")}
        />
      </section>

      {/* Chatbot Feature Toggle */}
      {enableChatbot && <Chatbot />}

      {/* Toast Notifications */}
      <Toaster />
    </main>
  );
}
