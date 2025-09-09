export const ChatLoader = () => {
  return (
    <div className="ml-2 w-full">
      <div
        role="status"
        className="w-[80%] animate-[pulse_1.5s_ease-in-out_infinite]"
      >
        <div className="mb-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2 h-2.5 w-4/5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2 h-2.5 w-3/5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};
