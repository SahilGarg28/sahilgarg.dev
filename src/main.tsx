import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { applySiteMeta } from "@/lib/site-meta";

applySiteMeta();

createRoot(document.getElementById("root")!).render(<App />);
