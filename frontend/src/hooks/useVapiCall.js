import { useEffect, useMemo, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

console.log("Imported Vapi:", Vapi);
export function useVapiCall({ onCallEnd } = {}) {
  const publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;
  const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;

  const vapiRef = useRef(null);
  const [callState, setCallState] = useState("idle"); // idle | connecting | active | error
  const [errorMessage, setErrorMessage] = useState(null);

  const configured = Boolean(publicKey && assistantId);

  useEffect(() => {
    if (!publicKey) return;
    const vapi = new Vapi.default(publicKey);
    vapiRef.current = vapi;

    const handleCallStart = () => setCallState("active");
    const handleCallEnd = () => {
      setCallState("idle");
      onCallEnd?.();
    };
    const handleError = (err) => {
      setErrorMessage(err?.message || "Voice call failed.");
      setCallState("error");
    };

    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("error", handleError);

    return () => {
      vapi.off("call-start", handleCallStart);
      vapi.off("call-end", handleCallEnd);
      vapi.off("error", handleError);
      vapi.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  const startCall = useMemo(
    () => async () => {
      console.log("startCall called");

      console.log("Vapi instance:", vapiRef.current);
      console.log("Assistant:", assistantId);

      try {
        await vapiRef.current.start(assistantId);
        console.log("Call started");
      } catch (err) {
        console.error(err);
      }
    },
    [assistantId]
  );

  const stopCall = () => {
    vapiRef.current?.stop();
    setCallState("idle");
  };

  return { callState, errorMessage, configured, startCall, stopCall };
}
