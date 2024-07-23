import "./Alert.css";

const Alert = ({ message, onClose }) => {
  return (
    <div className="alert-container">
      <div className="alert-box">
        <p className="alert-message">{message}</p>
        <button onClick={onClose} className="alert-button">
          X
        </button>
      </div>
    </div>
  );
};

export default Alert;
