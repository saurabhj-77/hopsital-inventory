import React, { useState, useEffect } from 'react';

// Dummy Data Generator
const generateDummyData = () => {
  const projects = [
    {
      id: 1,
      name: 'Downtown Office Complex',
      client: 'TechCorp Industries',
      location: 'New York, NY',
      status: 'in-progress',
      progress: 67,
      budget: 5500000,
      endDate: '2025-12-30',
      priority: 'high',
      teamSize: 24,
    },
    {
      id: 2,
      name: 'Riverside Shopping Mall',
      client: 'Retail Ventures Ltd',
      location: 'Los Angeles, CA',
      status: 'in-progress',
      progress: 43,
      budget: 8200000,
      endDate: '2026-02-28',
      priority: 'medium',
      teamSize: 32,
    },
    {
      id: 3,
      name: 'Green Valley Residential',
      client: 'HomeBuild Co',
      location: 'Austin, TX',
      status: 'planning',
      progress: 15,
      budget: 3200000,
      endDate: '2025-10-15',
      priority: 'low',
      teamSize: 18,
    },
    {
      id: 4,
      name: 'Harbor Bridge Renovation',
      client: 'City Infrastructure',
      location: 'Seattle, WA',
      status: 'in-progress',
      progress: 89,
      budget: 12500000,
      endDate: '2025-01-30',
      priority: 'high',
      teamSize: 45,
    },
  ];

  return { 
    projects, 
    totalEmployees: 75,
    completedTasks: 95,
  };
};

const StatCard = ({ title, value, subtitle, icon, gradient, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`stat-card ${isHovered ? 'hovered' : ''}`}
      style={{ 
        background: gradient,
        animationDelay: `${delay}s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="stat-shimmer"></div>
      <div className="stat-content">
        <div className="stat-info">
          <div className="stat-value">{value}</div>
          <div className="stat-title">{title}</div>
          <div className="stat-subtitle">{subtitle}</div>
        </div>
        <div className="stat-icon-wrapper">
          <div className="stat-icon">{icon}</div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, delay }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#f5576c';
      case 'medium': return '#ffa726';
      case 'low': return '#66bb6a';
      default: return '#757575';
    }
  };

  const getProgressColor = (progress) => {
    if (progress > 75) return 'linear-gradient(90deg, #66bb6a, #81c784)';
    if (progress > 40) return 'linear-gradient(90deg, #ffa726, #ffb74d)';
    return 'linear-gradient(90deg, #f5576c, #f48fb1)';
  };

  return (
    <div 
      className={`project-card ${isHovered ? 'hovered' : ''}`}
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="project-priority-bar" 
        style={{ background: getPriorityColor(project.priority) }}
      ></div>
      
      <div className="project-content">
        <div className="project-header">
          <div>
            <h3 className="project-name">{project.name}</h3>
            <span className={`status-badge ${project.status}`}>
              {project.status === 'in-progress' ? '⏱ IN PROGRESS' : '📋 ' + project.status.toUpperCase()}
            </span>
          </div>
          <button className="more-btn">⋮</button>
        </div>

        <div className="project-info-box">
          <div className="info-row">
            <span className="info-icon">📍</span>
            <span className="info-text">{project.location}</span>
          </div>
          <div className="client-name">{project.client}</div>
        </div>

        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-label">Progress</span>
            <span 
              className="progress-value"
              style={{ 
                color: project.progress > 75 ? '#66bb6a' : project.progress > 40 ? '#ffa726' : '#f5576c' 
              }}
            >
              {project.progress}%
            </span>
          </div>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill"
              style={{ 
                width: `${project.progress}%`,
                background: getProgressColor(project.progress),
              }}
            ></div>
          </div>
        </div>

        <div className="project-footer">
          <div className="footer-item">
            <span className="footer-label">Budget</span>
            <span className="footer-value budget">${(project.budget / 1000000).toFixed(1)}M</span>
          </div>
          <div className="footer-item">
            <span className="footer-label">Due Date</span>
            <span className="footer-value date">
              📅 {new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>

        <div className="project-team">
          <div className="team-info">
            <span className="team-icon">👥</span>
            <span className="team-text">{project.teamSize} members</span>
          </div>
          <div className="avatar-group">
            {Array.from({ length: Math.min(project.teamSize, 4) }).map((_, i) => (
              <div 
                key={i} 
                className="avatar"
                style={{ 
                  backgroundColor: `hsl(${i * 80}, 60%, 60%)`,
                  zIndex: 4 - i,
                }}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function EnhancedManagerDashboard() {
  const { projects, totalEmployees, completedTasks } = generateDummyData();

  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'in-progress').length,
    totalEmployees,
    completedTasks,
    totalBudget: projects.reduce((sum, project) => sum + project.budget, 0),
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        .dashboard-container {
          padding: 2rem;
          background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
          min-height: 100vh;
        }

        .dashboard-header {
          margin-bottom: 3rem;
          animation: fadeInDown 0.6s ease-out;
        }

        .dashboard-title {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .dashboard-subtitle {
          color: #64748b;
          font-size: 1rem;
          font-weight: 500;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          color: white;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 0.6s ease-out both;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .stat-card.hovered {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }

        .stat-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.6s;
        }

        .stat-card.hovered .stat-shimmer {
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .stat-content {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .stat-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .stat-subtitle {
          font-size: 0.875rem;
          opacity: 0.9;
        }

        .stat-icon-wrapper {
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          padding: 1rem;
          backdrop-filter: blur(10px);
          transition: transform 0.3s ease;
        }

        .stat-card.hovered .stat-icon-wrapper {
          transform: scale(1.1) rotate(5deg);
        }

        .stat-icon {
          font-size: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .section-header {
          margin-bottom: 1.5rem;
          animation: fadeInLeft 0.6s ease-out 0.3s both;
        }

        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .count-badge {
          background: #e0e7ff;
          color: #4f46e5;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .section-subtitle {
          color: #64748b;
          font-size: 0.875rem;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 1.5rem;
        }

        .project-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: scaleIn 0.5s ease-out both;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          position: relative;
        }

        .project-card.hovered {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
        }

        .project-priority-bar {
          height: 4px;
          width: 100%;
        }

        .project-content {
          padding: 1.5rem;
        }

        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .project-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .status-badge.in-progress {
          background: #e3f2fd;
          color: #1976d2;
        }

        .status-badge.planning {
          background: #f5f5f5;
          color: #757575;
        }

        .status-badge.completed {
          background: #e8f5e9;
          color: #388e3c;
        }

        .more-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #94a3b8;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          transition: all 0.2s;
        }

        .more-btn:hover {
          background: #f1f5f9;
          color: #475569;
        }

        .project-info-box {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .info-icon {
          font-size: 1rem;
        }

        .info-text {
          font-size: 0.875rem;
          color: #64748b;
        }

        .client-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1e293b;
        }

        .progress-section {
          margin-bottom: 1.25rem;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .progress-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #64748b;
        }

        .progress-value {
          font-size: 0.875rem;
          font-weight: 700;
        }

        .progress-bar-bg {
          height: 10px;
          background: #e0e0e0;
          border-radius: 5px;
          overflow: hidden;
          position: relative;
        }

        .progress-bar-fill {
          height: 100%;
          border-radius: 5px;
          transition: width 1s ease-out 0.5s;
          position: relative;
          overflow: hidden;
        }

        .progress-bar-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: progressShimmer 2s infinite;
        }

        @keyframes progressShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .project-footer {
          display: flex;
          justify-content: space-between;
          padding-bottom: 1.25rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid #f0f0f0;
        }

        .footer-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .footer-label {
          font-size: 0.75rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .footer-value {
          font-size: 0.875rem;
          font-weight: 600;
        }

        .footer-value.budget {
          color: #1976d2;
          font-size: 1rem;
        }

        .footer-value.date {
          color: #1e293b;
        }

        .project-team {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .team-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .team-icon {
          font-size: 1rem;
        }

        .team-text {
          font-size: 0.875rem;
          color: #64748b;
        }

        .avatar-group {
          display: flex;
          align-items: center;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          border: 2px solid white;
          margin-left: -8px;
          transition: transform 0.2s;
        }

        .avatar:first-child {
          margin-left: 0;
        }

        .avatar:hover {
          transform: translateY(-2px) scale(1.1);
          z-index: 10 !important;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 1rem;
          }

          .dashboard-title {
            font-size: 1.75rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .stat-value {
            font-size: 2rem;
          }

          .project-footer {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Project Overview</h1>
          <p className="dashboard-subtitle">
            Welcome back! Here's what's happening with your projects today.
          </p>
        </div>

        <div className="stats-grid">
          <StatCard
            title="Total Projects"
            value={stats.totalProjects}
            subtitle="All projects tracked"
            icon="📊"
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            delay={0}
          />
          <StatCard
            title="Active Projects"
            value={stats.activeProjects}
            subtitle="Currently in progress"
            icon="📈"
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            delay={0.1}
          />
          <StatCard
            title="Team Members"
            value={stats.totalEmployees}
            subtitle="Total employees"
            icon="👥"
            gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
            delay={0.2}
          />
          <StatCard
            title="Total Budget"
            value={`${(stats.totalBudget / 1000000).toFixed(1)}M`}
            subtitle="Across all projects"
            icon="💰"
            gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
            delay={0.3}
          />
        </div>

        <div className="section-header">
          <h2 className="section-title">
            Active Projects
            <span className="count-badge">{projects.length} total</span>
          </h2>
          <p className="section-subtitle">
            Track and manage your construction projects
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              delay={0.4 + index * 0.1} 
            />
          ))}
        </div>
      </div>
    </>
  );
}