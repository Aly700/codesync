import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

function App() {
  const [status, setStatus] = useState("Connecting to CodeSync server...");

  useEffect(() => {
    const handleConnect = () => {
      console.log("connected to CodeSync server");
      setStatus("Connected to CodeSync server");
    };

    const handleDisconnect = () => {
      setStatus("Disconnected from CodeSync server");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  return (
    <main className="app-shell">
      <section className="card">
        <p className="eyebrow">Phase 1</p>
        <h1>CodeSync</h1>
        <p className="status">{status}</p>
      </section>
    </main>
  );
}

export default App;
