import React, { useEffect, useState } from "react";
import API from "../api";

const ROLE_COLORS = {
  "AI Engineer":              "#f59e0b",
  "Backend Developer":        "#3b82f6",
  "Frontend Developer":       "#10b981",
  "General Software Developer":"#8b5cf6",
};

export default function CandidateList({ refresh }) {
  const [list, setList]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetch = () => {
    setLoading(true);
    API.get("/").then(r => setList(r.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, [refresh]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove ${name} from the system?`)) return;
    setDeleting(id);
    try {
      await API.delete(`/${id}`);
      setList(prev => prev.filter(c => c._id !== id));
    } catch { alert("Delete failed."); }
    finally { setDeleting(null); }
  };

  const scoreColor = (s) => s >= 60 ? "#10b981" : s >= 30 ? "#f59e0b" : "#ef4444";
  const scoreLabel = (s) => s >= 60 ? "Strong"   : s >= 30 ? "Average" : "Weak";

  if (loading) return <div className="loading-screen"><div className="spinner"></div><p>Loading candidates…</p></div>;

  return (
    <div className="list-page">
      <div className="list-header">
        <div>
          <h2>{list.length} Candidate{list.length !== 1 ? "s" : ""}</h2>
          <p>All registered applicants in the system</p>
        </div>
        <button className="refresh-btn" onClick={fetch}>↻ Refresh</button>
      </div>

      {list.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📂</div>
          <p>No candidates found. Add some to get started.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {list.map(c => (
            <div key={c._id} className="candidate-card">
              <div className="card-top">
                <div className="avatar">{c.name.charAt(0).toUpperCase()}</div>
                <div className="card-info">
                  <div className="card-name">{c.name}</div>
                  <div className="card-email">{c.email}</div>
                </div>
                <div
                  className="score-badge"
                  style={{ color: scoreColor(c.score), borderColor: scoreColor(c.score) }}
                >
                  <div className="score-num">{c.score}</div>
                  <div className="score-lbl">{scoreLabel(c.score)}</div>
                </div>
              </div>

              <div className="card-mid">
                <div className="role-tag" style={{ background: ROLE_COLORS[c.role] + "22", color: ROLE_COLORS[c.role] }}>
                  {c.role}
                </div>
                <div className="exp-tag">{c.experience} yr{c.experience !== 1 ? "s" : ""} exp</div>
              </div>

              <div className="card-skills">
                {c.skills.slice(0,5).map(s => (
                  <span key={s} className="tag">{s}</span>
                ))}
                {c.skills.length > 5 && <span className="tag tag-more">+{c.skills.length - 5}</span>}
              </div>

              <div className="card-footer">
                <div className="score-bar-track">
                  <div
                    className="score-bar-fill"
                    style={{ width: `${Math.min(c.score, 100)}%`, background: scoreColor(c.score) }}
                  ></div>
                </div>
                <button
                  className="delete-btn"
                  disabled={deleting === c._id}
                  onClick={() => handleDelete(c._id, c.name)}
                >
                  {deleting === c._id ? "…" : "Remove"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
