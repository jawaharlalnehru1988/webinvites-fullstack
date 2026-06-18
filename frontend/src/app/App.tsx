import { BrowserRouter, Routes, Route } from "react-router";
import { HeroSection } from "./components/sections/HeroSection";
import { SaveTheDateSection } from "./components/sections/SaveTheDateSection";
import { CountdownSection } from "./components/sections/CountdownSection";
import { CoupleSection } from "./components/sections/CoupleSection";
import { EventsSection } from "./components/sections/EventsSection";
import { RSVPSection } from "./components/sections/RSVPSection";
import { ClosingSection } from "./components/sections/ClosingSection";
import { FooterSection } from "./components/sections/FooterSection";
import { AdminPage } from "./components/admin/AdminPage";

function InvitationPage() {
  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[720px] flex flex-col">
        <HeroSection />
        <SaveTheDateSection />
        <CountdownSection />
        <CoupleSection />
        <EventsSection />
        <RSVPSection />
        <ClosingSection />
        <FooterSection />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InvitationPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
