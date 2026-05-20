import React, { useEffect, useState } from "react";
import API from "../api";

const MEDALS = ["🥇","🥈","🥉"];
const ROLE_COLORS = {
  "AI Engineer":              "#f59e0b",
  "Backend Developer":        "#3b82f6",
  "Frontend Developer":       "#10b981",
  "General Software Developer":"#8b5cf6",
};

export default function Ranking({ refresh }) {
  const [list, setList]       = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/rank").then(r => setList(r.data)).finally(() => setLoading(false));
  }, [refresh]);

  const max = list[0]?.score || 1;

  if (loading) return <div className="loading-screen"><div className="spinner"></div><p>Loading rankings…</p></div>;

  return (
    <div className="rank-page">
      {/* Podium top 3 */}
      {list.length >= 3 && (
        <div className="podium">
          {[list[1], list[0], list[2]].map((c, i) => {
            const pos = i === 1 ? 1 : i === 0 ? 2 : 3;
            return (
              <div key={c._id} className={`podium-col podium-${pos}`}>
                <div className="podium-medal">{MEDALS[pos-1]}</div>
                <div className="podium-avatar">{c.name.charAt(0)}</div>
                <div className="podium-name">{c.name.split(" ")[0]}</div>
                <div className="podium-score">{c.score} pts</div>
                <div className="podium-block">#{pos}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full table */}
      <div className="rank-table-wrap">
        <div className="panel-header">
          <span className="panel-title">Full Leaderboard</span>
          <span className="panel-badge">{list.length} candidates</span>
        </div>
        {list.length === 0 ? (
          <div className="empty-state"><div className="empty-icon">📋</div><p>No candidates ranked yet.</p></div>
        ) : (
          <table className="rank-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Candidate</th>
                <th>Role</th>
                <th>Skills</th>
                <th>Experience</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c, i) => (
                <tr key={c._id} className={i < 3 ? "top-row-hl" : ""}>
                  <td>
                    <span className="rank-pos">
                      {i < 3 ? MEDALS[i] : `#${i+1}`}
                    </span>
                  </td>
                  <td>
                    <div className="table-candidate">
                      <div className="t-avatar">{c.name.charAt(0)}</div>
                      <div>
                        <div className="t-name">{c.name}</div>
                        <div className="t-email">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="role-tag small" style={{
                      background: (ROLE_COLORS[c.role] || "#6b7280") + "22",
                      color: ROLE_COLORS[c.role] || "#6b7280"
                    }}>
                      {c.role}
                    </span>
                  </td>
                  <td>
                    <div className="tag-row">
                      {c.skills.slice(0,3).map(s=>(
                        <span key={s} className="tag small">{s}</span>
                      ))}
                      {c.skills.length > 3 && <span className="tag small tag-more">+{c.skills.length-3}</span>}
                    </div>
                  </td>
                  <td>{c.experience} yr{c.experience !== 1 ? "s" : ""}</td>
                  <td>
                    <div className="table-score-wrap">
                      <div className="table-score-bar">
                        <div style={{width:`${(c.score/max)*100}%`, background: ROLE_COLORS[c.role] || "#3b82f6"}}></div>
                      </div>
                      <strong>{c.score}</strong>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
