import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDesigns, getProjects, getEnquiries } from "../../services/api";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({ designs: 0, projects: 0, enquiries: 0 });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [designsRes, projectsRes, enquiriesRes] = await Promise.all([
          getDesigns(),
          getProjects(),
          getEnquiries(),
        ]);

        setStats({
          designs: designsRes.data.length,
          projects: projectsRes.data.length,
          enquiries: enquiriesRes.data.length,
        });

        setRecentEnquiries(enquiriesRes.data.slice(0, 5));
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Unable to load dashboard data. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="admin-state-message">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="admin-state-message admin-state-error">{error}</div>;
  }

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="dashboard-stats">
        <Link to="/admin/designs" className="stat-card">
          <span className="stat-number">{stats.designs}</span>
          <span className="stat-label">Total Designs</span>
        </Link>
        <Link to="/admin/projects" className="stat-card">
          <span className="stat-number">{stats.projects}</span>
          <span className="stat-label">Total Projects</span>
        </Link>
        <Link to="/admin/enquiries" className="stat-card">
          <span className="stat-number">{stats.enquiries}</span>
          <span className="stat-label">Total Enquiries</span>
        </Link>
      </div>

      <div className="dashboard-recent">
        <div className="dashboard-recent-header">
          <h2>Recent Enquiries</h2>
          <Link to="/admin/enquiries" className="dashboard-view-all">View All →</Link>
        </div>

        {recentEnquiries.length > 0 ? (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentEnquiries.map((enquiry) => (
                <tr key={enquiry.id}>
                  <td>{enquiry.name}</td>
                  <td>{enquiry.phone}</td>
                  <td>
                    <span className={`status-badge status-${enquiry.status}`}>
                      {enquiry.status}
                    </span>
                  </td>
                  <td>{new Date(enquiry.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="dashboard-empty">No enquiries yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;