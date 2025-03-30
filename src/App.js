import { useState, useEffect } from "react";

const Button = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
  >
    {children}
  </button>
);

export default function EyeExerciseDashboard() {
  const [focus, setFocus] = useState("none");
  const [log, setLog] = useState([]);
  const [dailyCount, setDailyCount] = useState(0);
  const [stereoResult, setStereoResult] = useState(null);

  useEffect(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem("eyeExerciseLog");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.date === today) {
        setDailyCount(parsed.count);
      }
    }
  }, []);

  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem("eyeExerciseLog", JSON.stringify({ date: today, count: dailyCount }));
  }, [dailyCount]);

  const handleFocus = (bead) => {
    setFocus(bead);
    setLog((prev) => [...prev, `Focused on ${bead} bead at ${new Date().toLocaleTimeString()}`]);
    setDailyCount((prev) => prev + 1);
  };

  const runStereoTest = () => {
    const dominant = Math.random() > 0.5 ? "left" : "right";
    setStereoResult(`Your visual system may favour the ${dominant} eye today. This is a basic test – for full assessment, consult an eye care professional.`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-center space-y-6">
      <h1 className="text-3xl font-bold">Eye Exercise Dashboard</h1>

      <div className="text-right text-sm text-gray-500">Daily focus count: {dailyCount}</div>

      {/* Brock String Simulator */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Brock String Simulator</h2>
        <p>Click each bead below and focus your eyes as if the bead is at different depths.</p>
        <div className="flex justify-center space-x-12 text-lg">
          <Button onClick={() => handleFocus("near")}>🔴 Near</Button>
          <Button onClick={() => handleFocus("middle")}>🟠 Middle</Button>
          <Button onClick={() => handleFocus("far")}>🟢 Far</Button>
        </div>
        <p>Current focus: <strong>{focus}</strong></p>
      </div>

      {/* Pencil Push-Up Trainer */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Pencil Push-Up Trainer</h2>
        <p>Use a pencil and slowly bring it toward your nose. Stop if it becomes blurry or double.</p>
        <p className="italic">Tip: Try this in front of a mirror to watch for eye movement.</p>
      </div>

      {/* Barrel Fusion Trainer */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Barrel Fusion Trainer</h2>
        <p>Imagine fusing the barrels on either side. Red is left eye, green is right eye.</p>
        <div className="flex justify-center space-x-6 font-mono text-3xl">
          <div className="text-red-600">⭕ ⭕ ⭕</div>
          <div className="text-green-600">🟢 🟢 🟢</div>
        </div>
      </div>

      {/* Advanced Test */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Eye Dominance & Stereo Awareness</h2>
        <p>This quick test gives a rough idea of which eye might be dominant today.</p>
        <Button onClick={runStereoTest}>Run Stereo Test</Button>
        {stereoResult && <p className="mt-2 text-blue-600 font-medium">{stereoResult}</p>}
      </div>

      {/* Log Viewer */}
      <div className="text-left">
        <h2 className="text-xl font-semibold">Activity Log</h2>
        <ul className="list-disc list-inside">
          {log.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
