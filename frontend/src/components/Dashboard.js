import React, { useEffect, useState } from "react";
import API from "../api";

const SKILL_LABELS = {
  java: "Java", python: "Python", javascript: "JavaScript",
  sql: "SQL", machinelearning: "Machine Learning",
  react: "React", nodejs: "Node.js", mongodb: "MongoDB",
};

export default function Dashboard({ refresh, onNavigate }) {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    API.get("/").then(r => setCandidates(r.data)).finally(() => setLoading(false));
  }, [refresh]);

  if (loading) return <div className="loading-screen"><div className="spinner"></div><p>Loading dashboard…</p></div>;

  // stats
  const total   = candidates.length;
  const avgScore = total ? Math.round(candidates.reduce((s, c) => s + c.score, 0) / total) : 0;
  const topScore = total ? Math.max(...candidates.map(c => c.score)) : 0;
  const roles    = [...new Set(candidates.map(c => c.role))].length;

  // skill frequency
  const skillFreq = {};
  candidates.forEach(c => c.skills.forEach(s => {
    const k = s.toLowerCase().replace(/\s+/g, "");
    skillFreq[k] = (skillFreq[k] || 0) + 1;
  }));
  const topSkills = Object.entries(skillFreq).sort((a,b) => b[1]-a[1]).slice(0, 6);
  const maxFreq   = topSkills[0]?.[1] || 1;

  // top 3 ranked
  const top3 = [...candidates].sort((a,b) => b.score - a.score).slice(0, 3);

  // role distribution
  const roleMap = {};
  candidates.forEach(c => roleMap[c.role] = (roleMap[c.role] || 0) + 1);

  const ROLE_COLORS = {
    "AI Engineer":              "#f59e0b",
    "Backend Developer":        "#3b82f6",
    "Frontend Developer":       "#10b981",
    "General Software Developer":"#8b5cf6",
  };

  return (
    <div className="dashboard">
      {/* ── STAT CARDS ── */}
      <div className="stat-grid">
        {[
          { label: "Total Candidates", value: total,    sub: "registered",    accent: "#3b82f6", icon: "👥" },
          { label: "Avg. Score",        value: avgScore, sub: "skill points",  accent: "#10b981", icon: "📊" },
          { label: "Top Score",         value: topScore, sub: "highest rated", accent: "#f59e0b", icon: "🏆" },
          { label: "Role Categories",   value: roles,    sub: "distinct roles",accent: "#8b5cf6", icon: "💼" },
        ].map(card => (
          <div key={card.label} className="stat-card" style={{"--accent": card.accent}}>
            <div className="stat-icon">{card.icon}</div>
            <div className="stat-value">{card.value}</div>
            <div className="stat-label">{card.label}</div>
            <div className="stat-sub">{card.sub}</div>
            <div className="stat-bar" style={{background: card.accent}}></div>
          </div>
        ))}
      </div>

      <div className="dash-row">
        {/* ── SKILL CHART ── */}
        <div className="panel panel-wide">
          <div className="panel-header">
            <span className="panel-title">Skill Distribution</span>
            <span className="panel-badge">{topSkills.length} skills tracked</span>
          </div>
          {topSkills.length === 0 ? (
            <p className="empty-msg">No candidates yet</p>
          ) : (
            <div className="skill-bars">
              {topSkills.map(([skill, count]) => (
                <div key={skill} className="skill-row">
                  <span className="skill-label">{SKILL_LABELS[skill] || skill}</span>
                  <div className="skill-track">
                    <div
                      className="skill-fill"
                      style={{ width: `${(count / maxFreq) * 100}%` }}
                    ></div>
                  </div>
                  <span className="skill-count">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── TOP 3 ── */}
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Top Performers</span>
            <button className="panel-link" onClick={() => onNavigate("ranking")}>View all →</button>
          </div>
          {top3.length === 0 ? (
            <p className="empty-msg">No candidates yet</p>
          ) : (
            top3.map((c, i) => (
              <div key={c._id} className="top-row">
                <div className={`medal medal-${i+1}`}>{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</div>
                <div className="top-info">
                  <div className="top-name">{c.name}</div>
                  <div className="top-role">{c.role}</div>
                </div>
                <div className="top-score">{c.score}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── ROLE DISTRIBUTION ── */}
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">Role Distribution</span>
        </div>
        <div className="role-grid">
          {Object.entries(roleMap).map(([role, count]) => (
            <div key={role} className="role-chip" style={{"--rc": ROLE_COLORS[role] || "#6b7280"}}>
              <span className="role-dot"></span>
              <span className="role-name">{role}</span>
              <span className="role-num">{count}</span>
            </div>
          ))}
          {Object.keys(roleMap).length === 0 && <p className="empty-msg">No data yet</p>}
        </div>
      </div>

      {/* ── CTA ── */}
      {total === 0 && (
        <div className="cta-card">
          <div className="cta-text">
            <h3>Get Started</h3>
            <p>Add your first candidate to begin analyzing resumes and ranking applicants.</p>
          </div>
          <button className="cta-btn" onClick={() => onNavigate("add")}>Add First Candidate →</button>
        </div>
      )}
    </div>
  );
}
