import { Mic, PhoneOff, Loader2 } from "lucide-react";
import { useVapiCall } from "../hooks/useVapiCall";
import "./VoiceCallButton.css";

const LABELS = {
  idle: "Start Voice Call",
  connecting: "Connecting…",
  active: "End Call",
  error: "Start Voice Call",
};

export default function VoiceCallButton({ onCallEnd }) {
  const { callState, errorMessage, configured, startCall, stopCall } =
    useVapiCall({ onCallEnd });

  const isActive = callState === "active";
  const isConnecting = callState === "connecting";

  function handleClick() {
    console.log("Button clicked");

    if (isActive) {
      stopCall();
    } else {
      startCall();
    }
  }

  return (
    <div className="voice-call">
      <button
        type="button"
        className={`voice-call__button ${isActive ? "voice-call__button--active" : ""}`}
        onClick={handleClick}
        disabled={isConnecting}
      >
        {isActive && <span className="voice-call__ring" aria-hidden="true" />}
        <span className="voice-call__icon" aria-hidden="true">
          {isConnecting ? (
            <Loader2 size={18} className="voice-call__spin" />
          ) : isActive ? (
            <PhoneOff size={18} strokeWidth={2.25} />
          ) : (
            <Mic size={18} strokeWidth={2.25} />
          )}
        </span>
        {LABELS[callState]}
      </button>

      {!configured && (
        <p className="voice-call__hint">
          Add <code>VITE_VAPI_PUBLIC_KEY</code> and{" "}
          <code>VITE_VAPI_ASSISTANT_ID</code> to <code>.env</code> to enable calling.
        </p>
      )}
      {configured && errorMessage && (
        <p className="voice-call__hint voice-call__hint--error">{errorMessage}</p>
      )}
    </div>
  );
}
