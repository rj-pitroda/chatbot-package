import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { BiCollapseAlt, BiExpandAlt } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

import {
  cleanGeminiOutput,
  getLighterColor,
  isValidHex,
} from "../../utils/helperFun";
import { ChatbotLogo } from "./ChatbotLogo";
import ChatBotMessages from "./ChatbotMessage";
import ChatbotBubbleLogo from "./ChatbotBubbleLogo";

export type Props = {
  predefinedQuestions: string[];
  jdCompareText: string;
  errorMsg: string;
  botTitle: string;
  defaultMsg: string;
  primaryHaxColor?: string;
  secondaryHaxColor?: string;
  botBubbleHaxColor?: string;
  onChatResponse: (
    question: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    appendChatResponse: (msg: string) => void
  ) => Promise<void>;
};

export const Chatbot = (props: Props) => {
  const {
    predefinedQuestions: PREDEFINED_QUESTIONS,
    jdCompareText: JD_COMPARE_TEXT,
    errorMsg: ERROR_MSG,
    botTitle,
    defaultMsg,
    primaryHaxColor = isValidHex(props.primaryHaxColor)
      ? props.primaryHaxColor
      : "#876AE7",
    secondaryHaxColor = isValidHex(props.secondaryHaxColor)
      ? props.secondaryHaxColor
      : getLighterColor(primaryHaxColor),
    onChatResponse,
    botBubbleHaxColor = "#fff",
  } = props;

  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [showMsgTooltip, setShowMsgTooltip] = useState(false);
  const [question, setQuestion] = useState("");
  const [questionArr, setQuestionArr] = useState<string[]>([]);
  const [answerArr, setAnswerArr] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowMsgTooltip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTo({ behavior: "smooth", top: el.scrollHeight + 30 });
    }
  }, [answerArr, questionArr]);

  const handleToggleChatbot = () => {
    setShowMsgTooltip(false);
    inputRef.current?.focus();
    setIsChatbotOpen((prev) => !prev);
  };

  const handleAsk = (manualQuestion = "") => {
    const promptMsg = (manualQuestion || question).trim();
    if (!promptMsg) return;

    setQuestionArr((prev) => [...prev, promptMsg]);
    setQuestion("");
    inputRef.current?.focus();

    let finalPrompt = promptMsg;
    if (promptMsg.includes(JD_COMPARE_TEXT)) {
      finalPrompt +=
        " Give in tabular format also provide the how many percentage fit.";
    } else if (promptMsg === PREDEFINED_QUESTIONS.at(-1)) {
      setAnswerArr((prev) => [...prev, "Please add your job description."]);
      setQuestion(JD_COMPARE_TEXT);
      return;
    }

    onChatResponse(finalPrompt, setIsLoading, appendChatResponse);
  };

  const appendChatResponse = (newAns: string) =>
    setAnswerArr((prev) => [...prev, cleanGeminiOutput(newAns)]);

  const handleRetry = (index: number) => {
    setAnswerArr((prev) => prev.slice(0, -1));
    onChatResponse(questionArr[index], setIsLoading, appendChatResponse);
  };

  return (
    <div>
      <div
        className={`fixed bottom-6 right-6 flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl sm:bottom-8 sm:right-8 ${
          isChatbotOpen
            ? isFullScreen
              ? "h-11/12 w-[calc(100vw-4rem)]"
              : "h-4/5 w-[85%] sm:w-96"
            : "h-0 w-0"
        } transition-all duration-200 ease-in`}
      >
        {/* Header */}
        <div
          style={{ backgroundColor: primaryHaxColor }}
          className={`flex items-center justify-between gap-3 px-4 py-3 text-white`}
        >
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-bold "
            style={{ color: primaryHaxColor }}
          >
            <ChatbotLogo />
          </div>
          <div className="flex-2 self-start">
            <h2 className="font-semibold">{botTitle}</h2>

            <span className="inline-flex items-center gap-1">
              <span className="relative flex h-[9px] w-[10px]">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500"></span>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
              </span>
              <span className="text-xs opacity-80">Online</span>
            </span>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setIsFullScreen(!isFullScreen)}
          >
            {isFullScreen ? (
              <BiCollapseAlt
                fontWeight={"800"}
                fontSize={20}
                className="hidden transition-all duration-100 ease-in hover:scale-[1.2] sm:block"
              />
            ) : (
              <BiExpandAlt
                fontWeight={"800"}
                fontSize={18}
                className="hidden transition-all duration-100 ease-in hover:scale-[1.2] sm:block"
              />
            )}
          </div>
          <div className="cursor-pointer" onClick={handleToggleChatbot}>
            <CgClose
              fontSize={18}
              className="transition-all duration-100 ease-in hover:scale-[1.2]"
            />
          </div>
        </div>
        {/* Messages area */}
        <ChatBotMessages
          containerRef={containerRef}
          PREDEFINED_QUESTIONS={PREDEFINED_QUESTIONS}
          answerArr={answerArr}
          defaultMsg={defaultMsg}
          handleAsk={handleAsk}
          isLoading={isLoading}
          questionArr={questionArr}
          secondaryHaxColor={secondaryHaxColor}
          primaryHaxColor={primaryHaxColor}
          ERROR_MSG={ERROR_MSG}
          handleRetry={handleRetry}
        />
        {/* Input area */}
        <div
          className={`justify-content flex flex-col gap-1.5 border-t border-gray-300 transition-all duration-100 ease-in sm:flex-row sm:space-x-2 ${
            isLoading ? "h-0 scale-0 p-0" : "h-fit p-3"
          }`}
        >
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-full  border border-gray-500 focus:border-transparent px-3 py-2 text-sm "
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") handleAsk();
            }}
            ref={inputRef}
            onFocus={(e) => {
              e.target.style.borderColor = "transparent";
              e.target.style.boxShadow = `0 0 0 2px ${primaryHaxColor}`;
              e.target.style.outline = "none";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "lightGray";
              e.target.style.boxShadow = "none";
            }}
          />
          <button
            className={`rounded-full px-4 py-2 text-sm text-white transition hover:opacity-80 ${
              question?.trim()
                ? "cursor-pointer "
                : "cursor-not-allowed !bg-gray-400"
            }`}
            style={{ backgroundColor: primaryHaxColor }}
            onClick={() => handleAsk()}
          >
            Send
          </button>
        </div>
      </div>
      <ChatbotBubbleLogo
        isChatbotOpen={isChatbotOpen}
        showMsgTooltip={showMsgTooltip}
        setShowMsgTooltip={setShowMsgTooltip}
        primaryHaxColor={primaryHaxColor}
        handleToggleChatbot={handleToggleChatbot}
        secondaryHaxColor={secondaryHaxColor}
        defaultMsg={defaultMsg}
        botBubbleHaxColor={botBubbleHaxColor}
        answerArr={answerArr}
      />
    </div>
  );
};
