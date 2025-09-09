import { Dispatch, SetStateAction } from "react";
import chatLogo from "../../assets/chatBot.png";

type Props = {
  isChatbotOpen: boolean;
  showMsgTooltip: boolean;
  setShowMsgTooltip: Dispatch<SetStateAction<boolean>>;
  primaryHaxColor: string;
  secondaryHaxColor: string;
  handleToggleChatbot: () => void;
  defaultMsg: string;
  botBubbleHaxColor: string;
  answerArr: string[];
};

const ChatbotBubbleLogo = (props: Props) => {
  const {
    isChatbotOpen,
    showMsgTooltip,
    setShowMsgTooltip,
    primaryHaxColor,
    handleToggleChatbot,
    secondaryHaxColor,
    defaultMsg,
    botBubbleHaxColor,
    answerArr,
  } = props;

  return (
    <div
      className={`${
        isChatbotOpen ? "scale-0" : "scale-100"
      } fixed bottom-8 right-8 flex cursor-pointer items-center justify-center transition-all duration-100 ease-in`}
    >
      <div className="flex items-center justify-center gap-1.5">
        {showMsgTooltip && (
          <>
            <p
              className="absolute -left-1 top-2 flex h-5 w-5 items-center justify-center rounded-full p-2 text-lg pb-2.5"
              style={{
                backgroundColor: primaryHaxColor,
                color: "white",
              }}
              onClick={() => setShowMsgTooltip(false)}
            >
              x
            </p>
            <div
              className="rounded-2xl bg-white px-3 py-2 text-sm text-gray-800 shadow-xl"
              onClick={handleToggleChatbot}
            >
              {defaultMsg}
            </div>
          </>
        )}
        <div
          className="rounded-full  p-3 shadow-2xl"
          onClick={handleToggleChatbot}
          style={{ backgroundColor: botBubbleHaxColor }}
        >
          {!showMsgTooltip && answerArr?.length > 0 && (
            <div
              className="absolute -right-5 -top-1 flex gap-1 rounded-xl rounded-bl-none p-1 px-2 opacity-80 shadow-2xl"
              style={{ backgroundColor: secondaryHaxColor }}
            >
              <div
                className="size-2 animate-bounce rounded-full "
                style={{ backgroundColor: primaryHaxColor }}
              ></div>
              <div
                className="size-2 animate-bounce rounded-full  delay-100"
                style={{ backgroundColor: primaryHaxColor }}
              ></div>
              <div
                className="size-2 animate-bounce rounded-full  delay-150"
                style={{ backgroundColor: primaryHaxColor }}
              ></div>
            </div>
          )}
          <img src={chatLogo} alt={"logo"} height={"40px"} width={"40px"} />
        </div>
      </div>
    </div>
  );
};

export default ChatbotBubbleLogo;
