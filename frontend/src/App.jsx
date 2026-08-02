import Header from "./components/Header";
import Hero from "./components/Hero";
import LeadList from "./components/LeadList";
import DeleteAllButton from "./components/DeleteAllButton";
import { useLeads } from "./hooks/useLeads";
import "./App.css";

export default function App() {
  const { leads, status, error, deleting, refresh, removeAll } = useLeads();

  return (
    <div className="app">
      <div className="app__shell">
        <Header />
        <Hero onCallEnd={() => refresh({ silent: true })} />
        <LeadList
          leads={leads}
          status={status}
          error={error}
          onRetry={() => refresh()}
        />
        <DeleteAllButton
          onDelete={removeAll}
          deleting={deleting}
          disabled={leads.length === 0 && status !== "error"}
        />
      </div>
    </div>
  );
}
