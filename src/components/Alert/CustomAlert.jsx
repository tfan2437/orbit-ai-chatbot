import "./CustomAlert.css";

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="alert-container fixed inset-0 bg-gray-800 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg text-center">
        <p className="mb-2">{message}</p>
        <button
          onClick={onClose}
          className="bg-[#ff0000] text-white px-2 py-1 rounded-full hover:bg-[#bb0000] transition duration-300 text-[8px]"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
