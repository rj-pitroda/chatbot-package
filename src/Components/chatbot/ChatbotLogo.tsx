import chatLogo from "../../assets/chatBot.png";

export const ChatbotLogo = ({ className = "" }: { className?: string }) => {
  return (
    <img
      src={chatLogo}
      alt={"logo"}
      height={"30px"}
      width={"30px"}
      className={className}
    />
  );
};
