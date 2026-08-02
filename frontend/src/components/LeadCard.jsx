import { useState } from "react";
import {
  User,
  Calendar,
  MapPin,
  Building2,
  LayoutGrid,
  Target,
  Clock,
  FileText,
  ChevronDown,
  Phone,
  Tag,
} from "lucide-react";
import "./LeadCard.css";

const FALLBACK = "Not specified";

function formatBudget(budget) {
  if (!budget) return FALLBACK;
  const trimmed = budget.trim();
  return /[₹]/.test(trimmed) ? trimmed : `₹ ${trimmed}`;
}

function formatSeenAt(date) {
  if (!date) return null;
  const datePart = date.toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${datePart} · ${timePart}`;
}

export default function LeadCard({ lead }) {
  const [expanded, setExpanded] = useState(false);

  const chips = [
    { icon: MapPin, value: lead.location },
    { icon: Building2, value: lead.property_type },
    { icon: LayoutGrid, value: lead.configuration },
    { icon: Target, value: lead.purpose },
    { icon: Clock, value: lead.timeline },
  ].filter((chip) => chip.value);

  return (
    <article className="lead-card">
      <div className="lead-card__top">
        <div className="lead-card__identity">
          <div className="lead-card__avatar" aria-hidden="true">
            <User size={20} strokeWidth={2} />
          </div>
          <div>
            <h3 className="lead-card__name">{lead.name || "Unnamed Lead"}</h3>
            <p className="lead-card__timestamp">
              <Calendar size={13} strokeWidth={2} aria-hidden="true" />
              {formatSeenAt(lead.seenAt) || "Logged just now"}
            </p>
          </div>
        </div>

        <div className="lead-card__budget">
          <span className="lead-card__budget-value">{formatBudget(lead.budget)}</span>
          <span className="lead-card__budget-label">Budget</span>
        </div>
      </div>

      {chips.length > 0 && (
        <div className="lead-card__chips">
          {chips.map(({ icon: Icon, value }, i) => (
            <span className="lead-card__chip" key={i}>
              <Icon size={14} strokeWidth={2} aria-hidden="true" />
              {value}
            </span>
          ))}
        </div>
      )}

      <div className="lead-card__bottom">
        <div className="lead-card__summary">
          <p className="lead-card__summary-label">
            <FileText size={14} strokeWidth={2} aria-hidden="true" />
            Summary
          </p>
          <p className="lead-card__summary-text">{lead.summary || "No summary available."}</p>
        </div>

        <button
          type="button"
          className="lead-card__details-btn"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          View Details
          <ChevronDown
            size={16}
            strokeWidth={2.25}
            className={`lead-card__chevron ${expanded ? "lead-card__chevron--open" : ""}`}
          />
        </button>
      </div>

      {expanded && (
        <dl className="lead-card__extra">
          <div className="lead-card__extra-row">
            <dt>
              <Phone size={14} strokeWidth={2} aria-hidden="true" />
              Phone
            </dt>
            <dd>{lead.phone || FALLBACK}</dd>
          </div>
          <div className="lead-card__extra-row">
            <dt>
              <Tag size={14} strokeWidth={2} aria-hidden="true" />
              Buy or Invest
            </dt>
            <dd>{lead.buy_or_invest || FALLBACK}</dd>
          </div>
          <div className="lead-card__extra-row">
            <dt>Lead ID</dt>
            <dd>#{lead.id}</dd>
          </div>
        </dl>
      )}
    </article>
  );
}
