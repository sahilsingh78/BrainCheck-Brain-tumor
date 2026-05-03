import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const UploadPage = () => {
  const navigate = useNavigate();
  const fileRef = useRef();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [notes, setNotes] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFile = (f) => {
    if (!f) return;
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowed.includes(f.type)) {
      setError("Only PNG, JPG, JPEG, WEBP images are accepted");
      return;
    }
    setFile(f);
    setError("");
    setResult(null);

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please select an MRI image");

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", file);
    if (patientName) formData.append("patientName", patientName);
    if (notes) formData.append("notes", notes);

    try {
      const { data } = await api.post("/scans/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ================= RESULT SCREEN =================
  if (result) {
    return (
      <div>
        <div className="page-header">
          <div>
            <div className="page-title">Analysis Complete</div>
            <div className="page-subtitle">
              Deep Learning (CNN + Attention Mechanism) brain tumor detection result
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 800 }}>
          
          {/* MRI IMAGE */}
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 14 }}>MRI Scan</div>
            <img src={result.imageData} alt="MRI" style={{ width: "100%", borderRadius: 10 }} />
          </div>

          {/* RESULT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            
            <div className={`result-box ${result.hasTumor ? "tumor" : "no-tumor"}`}>
              <div className="result-icon">{result.hasTumor ? "⚠️" : "✅"}</div>

              <div className="result-label">
                {result.result}
              </div>

              <div className="result-confidence">
                DL Model Confidence: {result.confidence}%
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => navigate(`/scans/${result.id}`)}
            >
              View Full Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= UPLOAD SCREEN =================
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Upload MRI Scan</div>
          <div className="page-subtitle">
            Deep Learning-based brain tumor detection system
          </div>
        </div>
      </div>

      {error && <div className="alert alert-error">⚠ {error}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

        {/* UPLOAD BOX */}
        <div
          className={`upload-zone ${dragOver ? "drag-over" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current.click()}
        >
          {preview ? (
            <img src={preview} alt="Preview" style={{ maxHeight: 200 }} />
          ) : (
            <span className="upload-zone-icon">🧠</span>
          )}
          <h3>{file ? file.name : "Drop MRI scan here"}</h3>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="card">
          <div className="form-group">
            <label>Patient Name</label>
            <input
              className="form-control"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              className="form-control"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="alert alert-success">
            🧠 Deep Learning model (CNN + Attention Mechanism) will analyze this MRI.
          </div>

          <button className="btn btn-primary btn-full" disabled={loading || !file}>
            {loading ? "Analyzing..." : "Run Analysis"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;