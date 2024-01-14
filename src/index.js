import React from "react";
import axios from "axios";
import { createRoot } from 'react-dom/client';

import "./App.css";
import App from "./App";

axios.defaults.withCredentials = true; // true

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);