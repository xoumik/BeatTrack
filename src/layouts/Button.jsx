import React from "react";

const Button = ({ title, color }) => {
  const bgColorClass = color ? `bg-${color}-800` : "bg-orange-800";
  return (
    <div>
      <button
        className={`${bgColorClass} text-white px-4 py-2 rounded-md transition duration-300 ease-in-out`}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
