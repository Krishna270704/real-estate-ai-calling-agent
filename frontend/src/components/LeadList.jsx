import LeadCard from "./LeadCard";
import { LoadingState, EmptyState, ErrorState } from "./StateMessage";
import "./LeadList.css";

export default function LeadList({ leads, status, error, onRetry }) {
  return (
    <section className="lead-list-section">
      <div className="lead-list-section__header">
        <div>
          <h2 className="lead-list-section__title">Recent Leads</h2>
          <p className="lead-list-section__subtitle">
            View and manage your qualified leads
          </p>
        </div>
        <span className="lead-list-section__count">
          {status === "success" ? `${leads.length} total` : null}
        </span>
      </div>

      {status === "loading" && <LoadingState />}
      {status === "error" && <ErrorState message={error} onRetry={onRetry} />}
      {status === "empty" && <EmptyState />}
      {status === "success" && (
        <div className="lead-list">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </section>
  );
}
