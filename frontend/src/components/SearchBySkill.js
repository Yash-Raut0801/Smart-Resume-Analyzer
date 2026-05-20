import React, { useState } from "react";
import API from "../api";

const QUICK_SKILLS = ["Java","Python","JavaScript","SQL","MachineLearning","React","NodeJS","MongoDB"];

const ROLE_COLORS = {
  "AI Engineer":              "#f59e0b",
  "Backend Developer":        "#3b82f6",
  "Frontend Developer":       "#10b981",
  "General Software Developer":"#8b5cf6",
};

export default function SearchBySkill() {
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const search = async (skill) => {
    const s = (skill || query).trim();
    if (!s) return;
    setQuery(s); setLoading(true); setSearched(false);
    try {
      const r = await API.get(`/search?skill=${s}`);
      setResults(r.data);
    } catch { setResults([]); }
    finally { setLoading(false); setSearched(true); }
  };

  return (
    <div className="search-page">
      <div className="search-hero">
        <h2>Find Candidates by Skill</h2>
        <p>Search your talent pool for specific technical skills</p>

        <div className="search-bar">
          <span className="search-icon">⌕</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="e.g. Python, Java, MachineLearning…"
            onKeyDown={e => e.key === "Enter" && search()}
          />
          <button onClick={() => search()} disabled={loading}>
            {loading ? "…" : "Search"}
          </button>
        </div>

        <div className="quick-row">
          <span className="quick-label">Quick:</span>
          {QUICK_SKILLS.map(s => (
            <button key={s} className="quick-chip" onClick={() => search(s)}>{s}</button>
          ))}
        </div>
      </div>

      {searched && (
        <div className="search-results">
          <div className="results-header">
            <span>
              {results.length === 0
                ? `No candidates found with skill "${query}"`
                : `${results.length} candidate${results.length !== 1 ? "s" : ""} found with "${query}"`}
            </span>
          </div>

          {results.map(c => (
            <div key={c._id} className="result-row">
              <div className="t-avatar">{c.name.charAt(0)}</div>
              <div className="result-info">
                <div className="t-name">{c.name}</div>
                <div className="t-email">{c.email} · {c.experience} yr{c.experience !== 1 ? "s" : ""} exp</div>
              </div>
              <span className="role-tag" style={{
                background: (ROLE_COLORS[c.role] || "#6b7280") + "22",
                color: ROLE_COLORS[c.role] || "#6b7280",
              }}>
                {c.role}
              </span>
              <div className="result-score">
                <strong>{c.score}</strong>
                <span>pts</span>
              </div>
              <div className="tag-row">
                {c.skills.map(s => (
                  <span key={s} className={`tag small ${s.toLowerCase() === query.toLowerCase() ? "tag-match" : ""}`}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
