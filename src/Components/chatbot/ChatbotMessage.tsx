import { Fragment, RefObject } from "react";

import { isHTML } from "../../utils/helperFun";
import { ChatbotLogo } from "./ChatbotLogo";
import { ChatLoader } from "./ChatLoader";

type Props = {
  containerRef: RefObject<HTMLDivElement>;
  defaultMsg: string;
  PREDEFINED_QUESTIONS?: string[];
  isLoading: boolean;
  handleAsk: (question: string) => void;
  questionArr: string[];
  answerArr: string[];
  secondaryHaxColor: string;
  primaryHaxColor: string;
  ERROR_MSG: string;
  handleRetry: (index: number) => void;
};
const ChatBotMessages = (props: Props) => {
  const {
    containerRef,
    PREDEFINED_QUESTIONS,
    answerArr,
    defaultMsg,
    handleAsk,
    isLoading,
    questionArr,
    secondaryHaxColor,
    primaryHaxColor,
    ERROR_MSG,
    handleRetry,
  } = props;

  return (
    <div
      className="flex-1 space-y-3 overflow-y-auto bg-gray-50 px-3 py-4"
      ref={containerRef}
    >
      {/* Default starting message */}
      <div className="flex items-start space-x-2">
        <ChatbotLogo className="-mt-1" />
        <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-white pt-2 text-sm shadow-sm">
          <p className="px-3 pb-2">{defaultMsg}</p>

          {PREDEFINED_QUESTIONS?.length > 0 && (
            <div className="border-t-1 border-gray-300 gap-2 py-0 pb-0.5 text-sm">
              {PREDEFINED_QUESTIONS.map((x) => (
                <p
                  className={`border-t border-gray-300 py-1 text-center font-semibold ${
                    isLoading
                      ? "cursor-not-allowed text-gray-300"
                      : "cursor-pointer text-blue-400"
                  }`}
                  key={x}
                  onClick={() => {
                    handleAsk(x);
                  }}
                >
                  {x}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bot message */}
      {questionArr.map((que, i) => (
        <Fragment key={que + " " + i}>
          {/* User message */}
          {que && (
            <div className="flex justify-end gap-1 opacity-80">
              <div
                className="max-w-[80%] rounded-2xl rounded-tr-none px-3 py-2 text-sm shadow-sm"
                style={{ background: secondaryHaxColor }}
              >
                {que}
              </div>
            </div>
          )}
          <div className="flex items-start space-x-1">
            {answerArr[i] && (
              <>
                <ChatbotLogo className="-mt-1" />
                <div className="flex gap-1">
                  {isHTML(answerArr[i]) ? (
                    <div
                      className="max-w-[80%] rounded-2xl rounded-tl-none text-sm"
                      key={answerArr[i]}
                      dangerouslySetInnerHTML={{ __html: answerArr[i] }}
                    ></div>
                  ) : (
                    <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-white px-3 py-2 text-sm shadow-sm">
                      {answerArr[i]}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {answerArr[i] === ERROR_MSG && i === answerArr?.length - 1 && (
            <div className="flex justify-center">
              <button
                style={{ backgroundColor: primaryHaxColor }}
                className={`hover:opacity-80 cursor-pointer rounded-full px-4 py-2 text-sm text-white transition`}
                onClick={() => handleRetry(i)}
              >
                Retry
              </button>
            </div>
          )}
        </Fragment>
      ))}
      {isLoading && (
        <div className="flex items-start space-x-1">
          <ChatbotLogo className="-mt-1" />
          <ChatLoader />
        </div>
      )}
    </div>
  );
};

export default ChatBotMessages;
