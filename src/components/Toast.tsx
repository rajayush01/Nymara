import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 z-[99999]">
      <div
        className={`px-4 py-3 rounded-lg shadow-lg text-white transition-all duration-300 ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;