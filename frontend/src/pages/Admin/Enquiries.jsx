import { useEffect, useState } from "react";
import { getEnquiries, updateEnquiryStatus } from "../../services/api";
import "./Enquiries.css";

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "completed", label: "Completed" },
];

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getEnquiries();
      setEnquiries(response.data);
    } catch (err) {
      console.error("Error fetching enquiries:", err);
      setError("Unable to load enquiries. Please try refreshing the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      await updateEnquiryStatus(id, newStatus);
      setEnquiries((prev) =>
        prev.map((enq) => (enq.id === id ? { ...enq, status: newStatus } : enq))
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <p className="admin-loading">Loading enquiries...</p>;
  }

  if (error) {
    return <p className="admin-error">{error}</p>;
  }

  return (
    <div className="admin-enquiries-page">
      <h1>Enquiries</h1>

      {enquiries.length === 0 ? (
        <p className="admin-empty">No enquiries yet.</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enq) => (
                <tr key={enq.id}>
                  <td>{enq.name}</td>
                  <td>{enq.phone}</td>
                  <td>{enq.email || "-"}</td>
                  <td className="admin-table-message">{enq.message || "-"}</td>
                  <td>{new Date(enq.created_at).toLocaleDateString("en-GB")}</td>
                  <td>
                    <select
                      value={enq.status}
                      disabled={updatingId === enq.id}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                      className={`admin-status-select status-${enq.status}`}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Enquiries;
