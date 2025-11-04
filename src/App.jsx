import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import HealthMap from "./pages/HealthMap";
import MentalHealth from "./pages/MentalHealth";
import HelpRequest from "./pages/HelpRequest";
import SeasonalHealthTips from "./pages/SeasonalTips";
import MaternalHealth from "./pages/MaternalHealth";
import Symptoms from "./pages/Symptoms";
import Events from "./pages/Events";
import Workers from "./pages/Workers";
import DataExport from "./pages/DataExport";
import VoiceAssistant from "./pages/VoiceAssistant";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/health-map" element={<HealthMap />} />
        <Route path="/mental-health" element={<MentalHealth />} />
        <Route path="/help-request" element={<HelpRequest />} />
        <Route path="/seasonal-tips" element={<SeasonalHealthTips />} />
        <Route path="/maternal-health" element={<MaternalHealth />} />
        <Route path="/symptoms" element={<Symptoms />} />
        <Route path="/events" element={<Events />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/data-export" element={<DataExport />} />
        <Route path="/voice-assistant" element={<VoiceAssistant />} />
      </Routes>
    </div>
  );
}

export default App;
