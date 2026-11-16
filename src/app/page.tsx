"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AIFeaturesSection from "@/components/AIFeaturesSection";
import TeamUseCasesSection from "@/components/TeamUseCasesSection";
import WorldTrustBanner from "@/components/WorldTrustBanner";
import BoardroomAdvantageSection from "@/components/BoardroomAdvantageSection";
import ExploreFeaturesSection from "@/components/ExploreFeaturesSection";
import MobileAppSection from "@/components/MobileAppSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CustomerStoriesSection from "@/components/CustomerStoriesSection";
import PricingSection from "@/components/PricingSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import MeetingModal from "@/components/MeetingModal";
import ActiveConference from "@/components/ActiveConference";
import AuthModal from "@/components/AuthModal";
import { AuthProvider } from "@/contexts/AuthContext";
import { Meeting } from "@/services/meetingService";

function MainContent() {
  const [roomName, setRoomName] = useState("");
  const [userName, setUserName] = useState("");
  const [meetingMeta, setMeetingMeta] = useState<Meeting | undefined>();
  const [token, setToken] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isSharedLink, setIsSharedLink] = useState(false);

  useEffect(() => {
    // If a room parameter is present in URL, prepopulate and prompt to join immediately
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get("room");
    if (roomParam) {
      setRoomName(roomParam);
      setIsSharedLink(true);
      setIsModalOpen(true);
    }
  }, []);

  const handleOpenJoin = (customRoom?: string) => {
    setIsSharedLink(false);
    if (customRoom) {
      setRoomName(customRoom);
    } else if (!roomName) {
      // Default placeholder if none set
      const rand = Math.floor(100 + Math.random() * 900);
      setRoomName(`sala-${rand}`);
    }
    setIsModalOpen(true);
  };

  const handleJoin = async (targetRoom: string, targetUser: string, meta?: Meeting) => {
    setIsJoining(true);
    try {
      const resp = await fetch(
        `/api/livekit?room=${encodeURIComponent(targetRoom)}&username=${encodeURIComponent(targetUser)}`
      );
      const data = await resp.json();
      if (data.token) {
        setRoomName(targetRoom);
        setUserName(targetUser);
        setMeetingMeta(meta);
        setToken(data.token);
        setIsModalOpen(false);
      } else {
        alert(data.error || "Não foi possível obter o token da reunião. Verifique as credenciais do LiveKit.");
      }
    } catch (err) {
      console.error("Erro ao entrar na reunião:", err);
      alert("Erro de conexão ao servidor de reuniões. Por favor, tente novamente.");
    } finally {
      setIsJoining(false);
    }
  };

  const handleDisconnect = () => {
    setToken("");
  };

  // If connected, show full-screen LiveKit meeting room
  if (token) {
    return (
      <ActiveConference
        token={token}
        roomName={roomName}
        username={userName}
        meetingMeta={meetingMeta}
        onDisconnect={handleDisconnect}
      />
    );
  }

  // Otherwise show the landing page
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Navigation */}
      <Navbar
        onOpenJoin={() => handleOpenJoin()}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      <main className="flex-1">
        {/* 1. Hero */}
        <HeroSection onStartMeeting={(room) => handleOpenJoin(room)} />

        {/* 2. Stats Bar */}
        <StatsSection />

        {/* 3. AI Features */}
        <AIFeaturesSection onExplore={() => handleOpenJoin()} />

        {/* 4. Team Use Cases */}
        <TeamUseCasesSection />

        {/* 5. World Trust Banner */}
        <WorldTrustBanner onLearnMore={() => handleOpenJoin()} />

        {/* 6. Boardroom Advantage */}
        <BoardroomAdvantageSection />

        {/* 7. Explore More Grid */}
        <ExploreFeaturesSection />

        {/* 8. Mobile App On the Go */}
        <MobileAppSection />

        {/* 9. Testimonials */}
        <TestimonialsSection />

        {/* 10. Customer Stories */}
        <CustomerStoriesSection />

        {/* 11. Pricing */}
        <PricingSection onSelectPlan={() => handleOpenJoin()} />

        {/* 12. Pre-Footer Call to Action */}
        <CtaBanner onStartTrial={() => handleOpenJoin()} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Join / Start Modal */}
      <MeetingModal
        isOpen={isModalOpen}
        initialRoom={roomName}
        isJoining={isJoining}
        isSharedLink={isSharedLink}
        onClose={() => setIsModalOpen(false)}
        onJoin={handleJoin}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
