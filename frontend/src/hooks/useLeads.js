import { useCallback, useEffect, useRef, useState } from "react";
import { fetchLeads, deleteAllLeads, ApiError } from "../services/api";

const POLL_INTERVAL_MS = 15000;

function useSeenAtStamps() {
  const stampsRef = useRef(new Map());

  const stamp = useCallback((leads) => {
    const now = new Date();
    return leads.map((lead) => {
      if (!stampsRef.current.has(lead.id)) {
        stampsRef.current.set(lead.id, now);
      }
      return { ...lead, seenAt: stampsRef.current.get(lead.id) };
    });
  }, []);

  return stamp;
}

export function useLeads() {
  const [leads, setLeads] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | empty | error
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const stamp = useSeenAtStamps();

  const load = useCallback(
    async ({ silent = false } = {}) => {
      if (!silent) setStatus((prev) => (prev === "success" ? prev : "loading"));
      try {
        const data = await fetchLeads();
        const normalized = Array.isArray(data) ? data : [];
        const withStamps = stamp(normalized).sort(
          (a, b) => b.seenAt - a.seenAt
        );
        setLeads(withStamps);
        setStatus(withStamps.length === 0 ? "empty" : "success");
        setError(null);
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "Something went wrong.");
        setStatus("error");
      }
    },
    [stamp]
  );

  const removeAll = useCallback(async () => {
    setDeleting(true);
    try {
      await deleteAllLeads();
      setLeads([]);
      setStatus("empty");
      setError(null);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not delete leads.");
    } finally {
      setDeleting(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(() => load({ silent: true }), POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [load]);

  return { leads, status, error, deleting, refresh: load, removeAll };
}
