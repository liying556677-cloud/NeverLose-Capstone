import { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { logApi } from "../../api/logApi";

const ItemLogModal = ({ itemId, onClose }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch logs on mount
  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await logApi.getLogsItem(itemId);
        const data = res.data; // FIXED: no need for await
        setLogs(data.events || []);
      } catch (err) {
        console.error("Failed to load logs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, [itemId]);

  return (
    <Modal show onHide={onClose} centered size="lg">
      {/* HEADER */}
      <Modal.Header closeButton>
        <Modal.Title>Item Log History</Modal.Title>
      </Modal.Header>

      {/* BODY */}
      <Modal.Body>
        {loading ? (
          <div className="d-flex align-items-center">
            <Spinner animation="border" size="sm" className="me-2" />
            Loading logs...
          </div>
        ) : logs.length === 0 ? (
          <p className="text-muted">No logs found for this item.</p>
        ) : (
          <ul className="list-group">
            {logs.map((log) => (
              <li key={log.id} className="list-group-item">
                <strong>{log.type}</strong>
                <br />
                <small className="text-muted">{log.timestamp}</small>
                <pre className="mt-2 bg-light p-2 rounded small">
                  {JSON.stringify(log.details, null, 2)}
                </pre>
              </li>
            ))}
          </ul>
        )}
      </Modal.Body>

      {/* FOOTER */}
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ItemLogModal;