function App() {
  return (
    <div className="App">
      <button
        onClick={handleShowAlert}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
      >
        Show Alert
      </button>
      {showAlert && (
        <CustomAlert
          message="This is a custom alert!"
          onClose={handleCloseAlert}
        />
      )}
    </div>
  );
}

export default App;
