"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, User, Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useFeatureFlags } from "@/hooks/useFeatureFlags";

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState<string[]>([]);
    const { trackEvent } = useFeatureFlags();

    const handleSendMessage = () => {
        if (message.trim()) {
            // Add message to chat history
            setChatHistory([...chatHistory, `You: ${message}`, `Bot: "unknown:error"`]);
            
            // Track event in LaunchDarkly
            trackEvent("chatbot-message-sent", {
                messageLength: message.length,
                timestamp: new Date().toISOString()
            });
            
            setMessage(""); // Clear input after sending
        }
    };

    const handleToggle = () => {
        setOpen(!open);
        trackEvent("chatbot-toggled", { isOpen: !open });
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Button to toggle chatbot */}
            <Button
                variant="outline"
                className="bg-blue-500 text-white rounded-full p-5"
                onClick={handleToggle}
            >   Chat Bot
                <MessageCircle className="w-20 h-20 text-white" />
            </Button>

            {/* Chatbot popup */}
            {open && (
                <Card className="w-96 p-4 bg-card-bg text-foreground rounded-lg shadow-lg absolute bottom-24 right-6 max-h-[400px] overflow-auto">
                    <div className="space-y-2 h-60 overflow-y-auto mb-4">
                        {chatHistory.map((message, index) => {
                            // Check if message is from user or bot
                            const isUserMessage = message.startsWith("You:");
                            return (
                                <Alert
                                    key={index}
                                    variant="default"
                                    className={isUserMessage ? "bg-blue-100" : "bg-gray-100"}
                                >
                                    {isUserMessage ? (
                                        <User className="h-4 w-4 mr-2 text-blue-500" />
                                    ) : (
                                        <Bot className="h-4 w-4 mr-2 text-gray-500" />
                                    )}
                                    <AlertTitle>{isUserMessage ? "You" : "Bot"}</AlertTitle>
                                    <AlertDescription>{message.split(": ")[1]}</AlertDescription>
                                </Alert>
                            );
                        })}
                    </div>

                    <div className="flex">
                        <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="w-full mr-2 border border-input rounded-md"
                        />
                        <Button onClick={handleSendMessage} className="bg-blue-500 text-white rounded-md">
                            <Send className="w-5 h-5 text-white" />
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default Chatbot;