import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { getUsername, clearAuth } from "../utils/auth";
import "./AdminLayout.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = getUsername();

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Designs", path: "/admin/designs" },
    { name: "Projects", path: "/admin/projects" },
    { name: "Enquiries", path: "/admin/enquiries" },
  ];

  const handleLogout = () => {
    clearAuth();
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          Kitchen<span>Interiors</span>
        </div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? "admin-nav-link active" : "admin-nav-link"}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <span className="admin-header-title">Admin Dashboard</span>
          <div className="admin-header-user">
            <span>Welcome, {username}</span>
            <button onClick={handleLogout} className="admin-logout-btn">Log Out</button>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;