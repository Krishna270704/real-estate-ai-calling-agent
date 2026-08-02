import { Loader2, Inbox, AlertTriangle, RotateCw } from "lucide-react";
import "./StateMessage.css";

export function LoadingState() {
  return (
    <div className="state-message">
      <Loader2 size={28} strokeWidth={2} className="state-message__spin" />
      <p className="state-message__title">Loading leads…</p>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="state-message">
      <div className="state-message__icon state-message__icon--neutral">
        <Inbox size={22} strokeWidth={2} />
      </div>
      <p className="state-message__title">No leads yet</p>
      <p className="state-message__body">
        Start a voice call above and qualified leads will show up here.
      </p>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state-message">
      <div className="state-message__icon state-message__icon--danger">
        <AlertTriangle size={22} strokeWidth={2} />
      </div>
      <p className="state-message__title">Couldn't load leads</p>
      <p className="state-message__body">{message}</p>
      {onRetry && (
        <button type="button" className="state-message__retry" onClick={onRetry}>
          <RotateCw size={14} strokeWidth={2.25} />
          Try again
        </button>
      )}
    </div>
  );
}
