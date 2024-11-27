import React from "react";

interface ModalProps {
  title: string; // Title for the modal
  description: string; // Description for the modal
  buttonLabel: string; // Button text to open the modal
  onButtonClick?: () => void; // Optional callback for button clicks
}

const Modal: React.FC<ModalProps> = ({ title, description, buttonLabel, onButtonClick }) => {
  return (
    <div className="flex flex-col items-center p-4">
      {/* Button */}

      {/* Modal */}
      <div className="w-[15rem] h-[10rem] bg-slate-300 shadow-lg rounded-lg p-4 flex flex-col justify-between border border-gray-300">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>

        {/* Description */}
        <p className="text-gray-600 mt-2">{description}</p>
        <button
          onClick={onButtonClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg mb-4"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default Modal;
