import React, { useState } from "react";
import API from "../api";

const PRESET_SKILLS = ["Java", "Python", "JavaScript", "SQL", "MachineLearning", "React", "NodeJS", "MongoDB", "HTML", "CSS"];

export default function AddCandidate({ onAdded }) {
  const [form, setForm]       = useState({ name: "", email: "", experience: "" });
  const [skills, setSkills]   = useState([]);
  const [custom, setCustom]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);

  const toggleSkill = (s) => setSkills(prev =>
    prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
  );

  const addCustom = () => {
    const val = custom.trim();
    if (val && !skills.includes(val)) setSkills(prev => [...prev, val]);
    setCustom("");
  };

  const removeSkill = (s) => setSkills(prev => prev.filter(x => x !== s));

  const handleSubmit = async () => {
    if (!form.name || !form.email || skills.length === 0) {
      setError("Name, email and at least one skill are required.");
      return;
    }
    setError(""); setLoading(true);
    try {
      await API.post("/add", {
        name: form.name,
        email: form.email,
        skills,
        experience: Number(form.experience) || 0,
      });
      setSuccess(true);
      setForm({ name: "", email: "", experience: "" });
      setSkills([]);
      setTimeout(() => { setSuccess(false); onAdded?.(); }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add candidate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-header">
          <h2>New Candidate</h2>
          <p>Fill in the applicant's details to analyze their resume profile.</p>
        </div>

        {success && <div className="alert alert-success">✓ Candidate added successfully! Redirecting…</div>}
        {error   && <div className="alert alert-error">⚠ {error}</div>}

        <div className="form-grid">
          <div className="field">
            <label>Full Name</label>
            <input
              placeholder="e.g. Rahul Sharma"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
            />
          </div>
          <div className="field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="e.g. rahul@email.com"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
            />
          </div>
          <div className="field">
            <label>Years of Experience</label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 2"
              value={form.experience}
              onChange={e => setForm({...form, experience: e.target.value})}
            />
          </div>
        </div>

        {/* Skill selector */}
        <div className="field">
          <label>Skills <span className="label-note">(click to select)</span></label>
          <div className="preset-skills">
            {PRESET_SKILLS.map(s => (
              <button
                key={s}
                type="button"
                className={`skill-chip ${skills.includes(s) ? "selected" : ""}`}
                onClick={() => toggleSkill(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Custom skill input */}
        <div className="field">
          <label>Add Custom Skill</label>
          <div className="custom-row">
            <input
              placeholder="Type skill name…"
              value={custom}
              onChange={e => setCustom(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addCustom()}
            />
            <button type="button" className="btn-add" onClick={addCustom}>Add</button>
          </div>
        </div>

        {/* Selected skills */}
        {skills.length > 0 && (
          <div className="field">
            <label>Selected Skills ({skills.length})</label>
            <div className="selected-skills">
              {skills.map(s => (
                <span key={s} className="selected-chip">
                  {s}
                  <button onClick={() => removeSkill(s)}>×</button>
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading || success}
        >
          {loading ? <><span className="btn-spinner"></span> Analyzing…</> : "Submit & Analyze Resume"}
        </button>
      </div>

      {/* Score legend */}
      <div className="legend-card">
        <h3>Scoring Guide</h3>
        <div className="legend-grid">
          {[
            ["Machine Learning", 25], ["Java", 20], ["Python", 15],
            ["JavaScript", 12], ["React", 12], ["Node.js", 12],
            ["SQL", 10], ["MongoDB", 10], ["HTML/CSS", 5],
          ].map(([s, pts]) => (
            <div key={s} className="legend-row">
              <span>{s}</span>
              <span className="pts">+{pts} pts</span>
            </div>
          ))}
          <div className="legend-row">
            <span>Each Year of Experience</span>
            <span className="pts">+5 pts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
