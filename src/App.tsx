import { Dispatch, SetStateAction, useCallback } from "react";
import { Chatbot } from "./Components/chatbot/Chatbot";
import { RESUME_TXT_CONTEXT } from "./utils/constant";

const JD_COMPARE_TEXT = "Please compare with this JD: ";
const ERROR_MSG = "Sorry, something went wrong while fetching the answer.";
const GEMINI_KEY = "YOUR_GEMINI_KEY";
const PREDEFINED_QUESTIONS = [
  "Quick Introduction",
  "Contact Details",
  "Work Experience Overview",
  "Compare with Your Job Description",
];

function App() {
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
    <>
      <div className="h-lvh bg-amber-200 flex justify-center items-center font-bold text-2xl text-shadow-lg">
        Welcome! This is a demo of Raj’s Personal Chatbot package
      </div>
      <Chatbot
        jdCompareText={JD_COMPARE_TEXT}
        predefinedQuestions={PREDEFINED_QUESTIONS}
        errorMsg={ERROR_MSG}
        botTitle="Raj's Assistant"
        defaultMsg=" Hey there 👋 I’m Raj’s personal assistant. How can I help you?"
        onChatResponse={onChatResponse}
        botBubbleHaxColor="#fff"
      />
    </>
  );
}

export default App;
