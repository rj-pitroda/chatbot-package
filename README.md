# Raj Chatbot

[![npm version](https://img.shields.io/npm/v/raj-chatbot.svg)](https://www.npmjs.com/package/raj-chatbot)
[![npm downloads](https://img.shields.io/npm/dm/raj-chatbot.svg)](https://www.npmjs.com/package/raj-chatbot)
[![license](https://img.shields.io/npm/l/raj-chatbot.svg)](LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/raj-chatbot)](https://bundlephobia.com/package/raj-chatbot)

A customizable and lightweight **React chatbot widget** built with **TypeScript, Tailwind CSS, and Vite**.  
Easily embeddable into any React project, with support for **predefined questions**, **dynamic responses**, and **API/AI integrations** (like Gemini, OpenAI, or your custom backend).  

---

## ✨ Features
- ⚡ Lightweight and fast — powered by **Vite** & **TypeScript**  
- 🎨 Fully themeable with **primary/secondary colors** and custom bubble backgrounds  
- 💬 Predefined question support for quick prompts  
- 🤖 Compatible with **AI models** or any async API (customizable request handler)  
- 📱 Responsive design with **expand/collapse** & **fullscreen support**  
- 🛠 Easy to integrate — works with any React project  

---

## 📦 Installation

```bash
npm install raj-chatbot
# or
yarn add raj-chatbot


import { Chatbot } from "raj-chatbot";

export default function App() {
  const requestChatResponse = async (
    question: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    appendChatResponse: (msg: string) => void
  ) => {
    setIsLoading(true);

    try {
      // Example: integrate with AI or custom API
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      appendChatResponse(data.answer);
    } catch (err) {
      appendChatResponse("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Chatbot
      botTitle="Raj's Chatbot"
      defaultMsg="Hi! How can I help you today?"
      predefinedQuestions={[
        "Tell me about this chatbot",
        "Compare with job description",
        "Add my job description",
      ]}
      jdCompareText="Add my job description"
      errorMsg="Failed to fetch response"
      primaryHaxColor="#876AE7"
      secondaryHaxColor="#BFAAF1"
      botBubbleHaxColor="#FFFFFF"
      requestChatResponse={requestChatResponse}
    />
  );
}


| Prop                  | Type                                                            | Default            | Description                                                |
| --------------------- | --------------------------------------------------------------- | ------------------ | ---------------------------------------------------------- |
| `botTitle`            | `string`                                                        | –                  | Title displayed in the chatbot header                      |
| `defaultMsg`          | `string`                                                        | –                  | Default welcome message shown on chat open                 |
| `predefinedQuestions` | `string[]`                                                      | –                  | List of quick prompts shown under the first message        |
| `jdCompareText`       | `string`                                                        | –                  | Special keyword to trigger job description comparison flow |
| `errorMsg`            | `string`                                                        | –                  | Message shown when an API call fails                       |
| `primaryHaxColor`     | `string (hex)`                                                  | `#876AE7`          | Primary theme color (used in header, buttons, highlights)  |
| `secondaryHaxColor`   | `string (hex)`                                                  | lighter of primary | Secondary theme color (used in user bubbles, highlights)   |
| `botBubbleHaxColor`   | `string (hex)`                                                  | `#FFFFFF`          | Background color of floating launcher button               |
| `requestChatResponse` | `(question, setIsLoading, appendChatResponse) => Promise<void>` | –                  | Function to handle fetching and appending responses        |
