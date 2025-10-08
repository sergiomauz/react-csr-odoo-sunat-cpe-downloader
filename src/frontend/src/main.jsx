import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const App = () => <h1>Hola desde React + Vite</h1>;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
