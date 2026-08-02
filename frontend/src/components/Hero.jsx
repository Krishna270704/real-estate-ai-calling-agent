import VoiceCallButton from "./VoiceCallButton";
import "./Hero.css";

export default function Hero({ onCallEnd }) {
  return (
    <section className="hero">
      <div className="hero__copy">
        <h2 className="hero__title">Welcome to your AI Calling Agent</h2>
        <p className="hero__subtitle">
          Start a voice call to qualify new real estate leads automatically.
        </p>
      </div>
      <VoiceCallButton onCallEnd={onCallEnd} />
    </section>
  );
}
