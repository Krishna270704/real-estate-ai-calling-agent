import { Building2 } from "lucide-react";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header__identity">
        <div className="header__logo" aria-hidden="true">
          <Building2 size={22} strokeWidth={2.25} />
        </div>
        <div>
          <h1 className="header__title">Real Estate AI Calling Agent</h1>
          <p className="header__subtitle">AI-powered lead qualification for real estate</p>
        </div>
      </div>

      <span className="header__badge">
        <span className="header__badge-dot" aria-hidden="true" />
        Agent Active
      </span>
    </header>
  );
}
