import React, { useState } from "react";
import axios from "axios";
import "./styles/App.css";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "text/plain") {
      setFile(selected);
      setMessage("");
    } else {
      setFile(null);
      setMessage("Please upload a valid .txt file");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        "http://localhost:8080/documents/upload",
        formData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "converted.pdf");
      document.body.appendChild(link);
      link.click();

      setMessage("PDF downloaded successfully!");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage("Error converting file.");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Text to PDF Converter</h1>

      <label className="upload-box">
       <div>📄 Click to Upload .txt File</div>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          hidden
        />
        {file && <div className="file-name">{file.name}</div>}
      </label>

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Converting..." : "Convert to PDF"}
      </button>

      {loading && <div className="loader"></div>}

      {message && (
        <div
          className={`message ${
            message.includes("Error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default App;