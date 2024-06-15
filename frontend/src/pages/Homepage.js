import React, { useState } from "react";
import axios from "axios";

export default function Homepage() {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileURL(URL.createObjectURL(selectedFile));
    setPrediction("");
    setError("");
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setPrediction(response.data.prediction);
      })
      .catch((error) => {
        if (error.response) {
          setError(
            `Server responded with status ${error.response.status}: ${error.response.data.error}`
          );
        } else if (error.request) {
          setError(
            "No response received from the server. Please try again later."
          );
        } else {
          setError(`Error setting up the request: ${error.message}`);
        }
        console.error("There was an error uploading the file!", error);
      });
  };

  const handleSelectAgain = () => {
    setFile(null);
    setFileURL(null);
    setPrediction("");
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Image Classification</h1>

      {file ? (
        <>
          <div className="mb-4 w-64 h-64 border-4 border-dashed border-gray-300 flex items-center justify-center">
            <img
              src={fileURL}
              alt="Selected"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Upload
            </button>
            <button
              onClick={handleSelectAgain}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Select Again
            </button>
          </div>
        </>
      ) : (
        <label className="w-64 h-64 flex flex-col items-center justify-center border-4 border-dashed border-gray-300 bg-white text-blue-500 cursor-pointer">
          <div className="text-center">
            <p>Upload</p>
          </div>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      )}

      {error && <p className="mt-4 text-red-500">{error}</p>}
      {prediction && <h2 className="mt-4 text-xl">Prediction: {prediction}</h2>}
    </div>
  );
}
