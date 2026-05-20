import React, { useState, useEffect } from "react";
import AddCandidate from "./components/AddCandidate";
import CandidateList from "./components/CandidateList";
import Ranking from "./components/Ranking";
import SearchBySkill from "./components/SearchBySkill";
import Dashboard from "./components/Dashboard";
import "./App.css";

const TABS = [
    { id: "dashboard", label: "Dashboard", icon: "▦" },
    { id: "add", label: "Add Candidate", icon: "＋" },
    { id: "search", label: "Search", icon: "⌕" },
    { id: "all", label: "All Candidates", icon: "≡" },
    { id: "ranking", label: "Rankings", icon: "⬆" },
];

export default function App() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [refresh, setRefresh] = useState(0);

    const handleAdded = () => {
        setRefresh(r => r + 1);
        setActiveTab("all");
    };

    return (
        <div className="app">
            {/* ── SIDEBAR ── */}
            <aside className="sidebar">
                <div className="brand">
                    <div className="brand-icon">SRA</div>
                    <div>
                        <div className="brand-name">Smart Resume Analyzer</div>
                        <div className="brand-sub">Employer Portal</div>
                    </div>
                </div>

                <nav className="nav">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            className={`nav-item ${activeTab === tab.id ? "active" : ""}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className="nav-icon">{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="footer-badge">AI-Powered Screening</div>
                    <div className="footer-info">Evaluate · Rank · Hire</div>
                    <div className="footer-copy">© 2026 Smart Resume Analyzer</div>
                    <div className="footer-edu">Built for Educational Purpose Only</div>
                </div>
            </aside>

            {/* ── MAIN ── */}
            <main className="main">
                <header className="topbar">
                    <div>
                        <h1 className="page-title">
                            {TABS.find(t => t.id === activeTab)?.label}
                        </h1>
                        <p className="page-sub">Smart Resume Analyzer</p>
                    </div>
                    <div className="topbar-right">
                        <div className="status-dot"></div>
                        <span className="status-text">System Active</span>
                    </div>
                </header>

                <div className="content">
                    {activeTab === "dashboard" && <Dashboard refresh={refresh} onNavigate={setActiveTab} />}
                    {activeTab === "add" && <AddCandidate onAdded={handleAdded} />}
                    {activeTab === "search" && <SearchBySkill />}
                    {activeTab === "all" && <CandidateList refresh={refresh} />}
                    {activeTab === "ranking" && <Ranking refresh={refresh} />}
                </div>
            </main>
        </div>
    );
}
