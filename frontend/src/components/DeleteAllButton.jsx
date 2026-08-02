import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import "./DeleteAllButton.css";

export default function DeleteAllButton({ onDelete, deleting, disabled }) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="delete-all delete-all--confirm">
        <p className="delete-all__confirm-text">
          <AlertTriangle size={16} strokeWidth={2.25} aria-hidden="true" />
          Delete all leads? This can't be undone.
        </p>
        <div className="delete-all__confirm-actions">
          <button
            type="button"
            className="delete-all__cancel-btn"
            onClick={() => setConfirming(false)}
            disabled={deleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="delete-all__confirm-btn"
            onClick={async () => {
              await onDelete();
              setConfirming(false);
            }}
            disabled={deleting}
          >
            {deleting ? "Deleting…" : "Yes, delete all"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="delete-all"
      onClick={() => setConfirming(true)}
      disabled={disabled}
    >
      <Trash2 size={17} strokeWidth={2.1} aria-hidden="true" />
      Delete All Leads
    </button>
  );
}
