# React Chatbot

[![npm version](https://img.shields.io/npm/v/simple-react-chatbot.svg)](https://www.npmjs.com/package/simple-react-chatbot)
[![npm downloads](https://img.shields.io/npm/dm/simple-react-chatbot.svg)](https://www.npmjs.com/package/simple-react-chatbot)
[![license](https://img.shields.io/npm/l/simple-react-chatbot.svg)](LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/simple-react-chatbot)](https://bundlephobia.com/package/simple-react-chatbot)

A customizable and lightweight **React chatbot widget** built with **TypeScript, Tailwind CSS, and Vite**.  
Easily embeddable into any React project, with support for **predefined questions**, **dynamic responses**, and **API/AI integrations** (like Gemini, OpenAI, or your custom backend).  

---

## 🎬 Demo

### **Option A: Autoplay GIF**

![Chatbot Demo](https://raw.githubusercontent.com/rj-pitroda/chatbot-package/main/public/preview.gif)

### **Option B: Video Link (needs click)**

[![Watch Demo Video](https://img.shields.io/badge/watch-demo-blue)](https://raw.githubusercontent.com/rj-pitroda/chatbot-package/main/public/preview.mp4)

---

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
npm install simple-react-chatbot
# or
yarn add simple-react-chatbot

## 📦 Installation

```bash
npm install simple-raj-chatbot
# or
yarn add simple-raj-chatbot


import { Chatbot } from "simple-react-chatbot";
import { useCallback } from 'react';

export default function App() {
  const onChatResponse = useCallback(
    async (
      question: string,
      setIsLoading: Dispatch<SetStateAction<boolean>>,
      appendChatResponse: (msg: string) => void
    ) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `You are a helpful assistant. Use the following context to answer questions:\n\n${RESUME_TXT_CONTEXT}\n\nQuestion: ${question}\n\nGive me the answer in properly formatted, readable responsive HTML that I can insert directly inside my page. If you include CSS, wrap it so all styles are scoped under a single wrapper class, do not include top margin, add white background to wrapper class. Do not include forms.`,
                    },
                  ],
                },
              ],
            }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }
        const data = await response.json();
        const raw =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ??
          data?.candidates?.[0]?.content?.text;
        if (!raw) throw new Error("No response from Gemini");
        appendChatResponse(raw);
      } catch (err: any) {
        console.error("Gemini API error:", err.message ?? err);
        appendChatResponse(ERROR_MSG);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <Chatbot
      botTitle="Raj's Chatbot"
      defaultMsg="Hi! How can I help you today?"
      predefinedQuestions={[
        "Quick Introduction",
        "Contact Details",
        "Work Experience Overview",
        "Compare with Your Job Description",
      ]}
      jdCompareText="Please compare with this JD:"
      errorMsg="Failed to fetch response"
      onChatResponse={onChatResponse}
    />
  );
}

| Prop                  | Type                                                        | Default            | Description                                                |
| --------------------- | ----------------------------------------------------------- | ------------------ | ---------------------------------------------------------- |
| `botTitle`            | `string`                                                    | –                  | Title displayed in the chatbot header                      |
| `defaultMsg`          | `string`                                                    | –                  | Default welcome message shown on chat open                 |
| `predefinedQuestions` | `string[]`                                                  | –                  | List of quick prompts shown under the first message        |
| `jdCompareText`       | `string`                                                    | –                  | Special keyword to trigger job description comparison flow |
| `errorMsg`            | `string`                                                    | –                  | Message shown when an API call fails                       |
| `primaryHaxColor`     | `string (hex)`                                              | `#876AE7`          | Primary theme color (used in header, buttons, highlights)  |
| `secondaryHaxColor`   | `string (hex)`                                              | lighter of primary | Secondary theme color (used in user bubbles, highlights)   |
| `botBubbleHaxColor`   | `string (hex)`                                              | `#FFFFFF`          | Background color of floating launcher button               |
| `onChatResponse`      | `(question, setIsLoading, onChatResponse) => Promise<void>` | –                  | Function to handle fetching and appending responses        |

