const Badge = ({ text }: { text: string }) => {
  return (
    <span className="bg-gray-500 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-5 ml-1">
      {text}
    </span>
  );
};

export default Badge;
