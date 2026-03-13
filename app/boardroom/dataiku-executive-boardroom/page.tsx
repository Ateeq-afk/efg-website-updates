"use client";

import { useRef, useState, useEffect, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// ═══════════════════════════════════════════════════════════════════════════
// DESIGN SYSTEM — Premium EFG + Dataiku Aesthetic
// ═══════════════════════════════════════════════════════════════════════════

const GOLD = "#C9935A";
const DATAIKU_TEAL = "#2EBDAA";
const BG = "#000000";
const TEXT = "#ffffff";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const DATAIKU_LOGO = "https://images.ctfassets.net/5nvgvgqbpp73/6f63ePFTcBtQIWJiVIbKVV/708831f68f139c954afadead4486d894/White_Dataiku_Lockup_Logo.svg";
const EFG_LOGO = "/events-first-group_logo_alt.svg";

// ═══════════════════════════════════════════════════════════════════════════
// EVENT DATA
// ═══════════════════════════════════════════════════════════════════════════

const EVENT = {
  sponsor: {
    name: "Dataiku",
    logo: DATAIKU_LOGO,
    tagline: "Platform for AI Success",
  },
  title: "Executive AI Boardroom",
  roomName: "dataiku-executive-boardroom",
  date: {
    full: "March 27th, 2026",
    day: "27",
    month: "MAR",
    year: "2026",
  },
  time: "10:00 AM – 12:00 PM GST",
  venue: "Virtual Roundtable",
  seats: 15,
  description: "An intimate executive roundtable exploring how leading enterprises move from AI experimentation to enterprise-scale success. Candid discussions on governance, orchestration, and measurable ROI.",
  topics: [
    { title: "From AI Chaos to AI Success", detail: "Building unified systems for agents, models, and analytics" },
    { title: "Agentic AI in Production", detail: "Deploying AI agents grounded in enterprise data" },
    { title: "Enterprise AI Governance", detail: "Visibility, cost controls, and audit-ready oversight" },
    { title: "Analytics to Trusted Decisions", detail: "AI-assisted pipelines at enterprise scale" },
  ],
  speakers: [
    {
      name: "Dr. Sarah Chen",
      title: "VP of AI Strategy",
      company: "Standard Chartered Bank",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face&q=80",
    },
    {
      name: "Marcus Thompson",
      title: "Chief Data Officer",
      company: "Novartis",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&q=80",
    },
    {
      name: "Elena Rodriguez",
      title: "Head of AI Platforms",
      company: "Dataiku",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face&q=80",
    },
  ],
  agenda: [
    { time: "10:00", label: "AM", title: "Welcome & Introductions" },
    { time: "10:15", label: "AM", title: "Keynote: The AI Success Formula" },
    { time: "10:45", label: "AM", title: "Panel: Governance at Scale" },
    { time: "11:15", label: "AM", title: "Interactive Roundtable Discussion" },
    { time: "11:45", label: "AM", title: "Key Takeaways & Close" },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  opacity: [0.5, 1, 0.5],
  transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
};

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

type ViewState = "loading" | "invalid" | "landing" | "register" | "confirmation" | "prejoin" | "waiting" | "joining" | "joined" | "left";

interface RegistrationData {
  fullName: string;
  email: string;
  company: string;
  jobTitle: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// CAMERA PREVIEW COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function CameraPreview({ 
  onCameraToggle, 
  onMicToggle,
  cameraOn,
  micOn,
}: { 
  onCameraToggle: (on: boolean) => void;
  onMicToggle: (on: boolean) => void;
  cameraOn: boolean;
  micOn: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    let mounted = true;

    const initMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: cameraOn,
          audio: micOn,
        });
        
        if (!mounted) {
          mediaStream.getTracks().forEach(t => t.stop());
          return;
        }

        setStream(mediaStream);

        if (videoRef.current && cameraOn) {
          videoRef.current.srcObject = mediaStream;
        }

        // Setup audio analysis
        if (micOn) {
          const audioContext = new AudioContext();
          const analyser = audioContext.createAnalyser();
          const source = audioContext.createMediaStreamSource(mediaStream);
          source.connect(analyser);
          analyser.fftSize = 32;
          
          audioContextRef.current = audioContext;
          analyserRef.current = analyser;

          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          
          const updateLevel = () => {
            if (!mounted) return;
            analyser.getByteFrequencyData(dataArray);
            const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
            setAudioLevel(avg / 255);
            animationRef.current = requestAnimationFrame(updateLevel);
          };
          updateLevel();
        }
      } catch (err) {
        console.error("Media access error:", err);
      }
    };

    initMedia();

    return () => {
      mounted = false;
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [cameraOn, micOn]);

  return (
    <div className="relative w-full max-w-md aspect-video bg-black/50 rounded-lg overflow-hidden border border-white/10">
      {cameraOn ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover scale-x-[-1]"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-3xl text-white/40">👤</span>
          </div>
        </div>
      )}

      {/* Controls overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <button
          onClick={() => onCameraToggle(!cameraOn)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            cameraOn ? 'bg-white/20 hover:bg-white/30' : 'bg-red-500/80 hover:bg-red-500'
          }`}
        >
          <span className="text-lg">{cameraOn ? '📹' : '📷'}</span>
        </button>
        
        <button
          onClick={() => onMicToggle(!micOn)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors relative ${
            micOn ? 'bg-white/20 hover:bg-white/30' : 'bg-red-500/80 hover:bg-red-500'
          }`}
        >
          <span className="text-lg">{micOn ? '🎙️' : '🔇'}</span>
          {/* Audio level indicator */}
          {micOn && (
            <div 
              className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-green-500 transition-transform"
              style={{ transform: `scale(${0.5 + audioLevel})` }}
            />
          )}
        </button>
      </div>

      {/* Audio level bar */}
      {micOn && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all"
            style={{ width: `${audioLevel * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// WAITING ROOM COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function WaitingRoom({ 
  userName, 
  company,
  onLeave,
}: { 
  userName: string;
  company: string;
  onLeave: () => void;
}) {
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(false);
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => (d + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center max-w-lg w-full"
      >
        {/* Dataiku Branding */}
        <img src={DATAIKU_LOGO} alt="Dataiku" className="h-6 mx-auto mb-8 opacity-60" />

        {/* Waiting Animation */}
        <div className="relative mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 mx-auto rounded-full border-2 border-[#C9935A]/20 border-t-[#C9935A]"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div animate={pulseAnimation} className="w-16 h-16 rounded-full bg-[#C9935A]/10" />
          </div>
        </div>

        <h1 className="text-2xl font-light text-white mb-3">You're in the waiting room</h1>
        <p className="text-white/50 text-sm mb-8">
          The host will admit you shortly{'.'.repeat(dots)}
        </p>

        {/* Camera Preview */}
        <div className="mb-8">
          <CameraPreview
            cameraOn={cameraOn}
            micOn={micOn}
            onCameraToggle={setCameraOn}
            onMicToggle={setMicOn}
          />
          <p className="text-white/30 text-xs mt-3">
            Adjust your camera and mic while you wait
          </p>
        </div>

        {/* User Info */}
        <div className="border border-white/10 rounded-lg p-4 mb-6 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C9935A]/20 flex items-center justify-center">
              <span className="text-lg">👤</span>
            </div>
            <div>
              <p className="text-white font-medium">{userName}</p>
              <p className="text-white/40 text-sm">{company}</p>
            </div>
          </div>
        </div>

        <button
          onClick={onLeave}
          className="text-white/40 text-sm hover:text-white/60 transition-colors"
        >
          Leave waiting room
        </button>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PRE-JOIN SCREEN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function PreJoinScreen({
  userName,
  company,
  onJoin,
  onBack,
}: {
  userName: string;
  company: string;
  onJoin: (cameraOn: boolean, micOn: boolean) => void;
  onBack: () => void;
}) {
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(false);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center max-w-lg w-full"
      >
        {/* Co-branding */}
        <div className="flex items-center justify-center gap-6 mb-10">
          <img src={DATAIKU_LOGO} alt="Dataiku" className="h-6 opacity-70" />
          <div className="h-6 w-px bg-white/20" />
          <img src={EFG_LOGO} alt="Events First Group" className="h-5 opacity-50" />
        </div>

        <h1 className="text-2xl font-light text-white mb-2">Ready to join?</h1>
        <p className="text-white/40 text-sm mb-8">
          Check your camera and microphone before entering
        </p>

        {/* Camera Preview */}
        <div className="mb-8">
          <CameraPreview
            cameraOn={cameraOn}
            micOn={micOn}
            onCameraToggle={setCameraOn}
            onMicToggle={setMicOn}
          />
        </div>

        {/* User Info */}
        <div className="border border-[#C9935A]/20 rounded-lg p-5 mb-8 bg-[#C9935A]/5">
          <p className="text-white/40 text-xs tracking-wider uppercase mb-2">Joining as</p>
          <p className="text-white text-lg font-medium mb-1">{userName}</p>
          <p className="text-white/50 text-sm">{company}</p>
        </div>

        {/* Event Details */}
        <div className="border border-white/10 rounded-lg p-5 mb-8 text-left text-sm">
          <div className="flex items-center gap-4 mb-3">
            <div className="text-center">
              <div className="text-xl font-light text-[#C9935A]">{EVENT.date.day}</div>
              <div className="text-xs text-white/40 tracking-wider">{EVENT.date.month}</div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <div className="text-white">{EVENT.title}</div>
              <div className="text-white/40 text-sm">{EVENT.time}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
            <span className="text-white/30 text-xs">Speakers:</span>
            <div className="flex -space-x-2">
              {EVENT.speakers.slice(0, 3).map((s, i) => (
                <img 
                  key={i}
                  src={s.image} 
                  alt={s.name}
                  className="w-6 h-6 rounded-full border border-black object-cover"
                />
              ))}
            </div>
            <span className="text-white/40 text-xs ml-2">
              {EVENT.speakers.map(s => s.name.split(' ')[1]).join(', ')}
            </span>
          </div>
        </div>

        {/* Join Button */}
        <button
          onClick={() => onJoin(cameraOn, micOn)}
          className="w-full py-4 bg-[#C9935A] text-black font-medium tracking-wide hover:bg-[#B8844A] transition-colors mb-4"
        >
          Join Boardroom
        </button>

        <button
          onClick={onBack}
          className="text-white/40 text-sm hover:text-white/60 transition-colors"
        >
          ← Go back
        </button>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// POST-MEETING SCREEN
// ═══════════════════════════════════════════════════════════════════════════

function PostMeetingScreen() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="text-center max-w-lg"
      >
        {/* Co-branding */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <img src={DATAIKU_LOGO} alt="Dataiku" className="h-6 opacity-60" />
          <div className="h-6 w-px bg-white/20" />
          <img src={EFG_LOGO} alt="Events First Group" className="h-5 opacity-40" />
        </div>

        {/* Success Icon */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#C9935A]/20 to-transparent border border-[#C9935A]/30 flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl text-[#C9935A]">✓</span>
        </div>

        <h1 className="text-3xl font-light text-white mb-4">Thank you for joining</h1>
        <p className="text-white/50 text-lg mb-3">We hope you found the discussion valuable.</p>
        <p className="text-white/40 text-sm mb-10">
          A recording and summary will be sent to your email within <span className="text-[#C9935A]">24 hours</span>.
        </p>

        {/* Info Cards */}
        <div className="space-y-4 mb-10">
          <div className="border border-white/10 rounded-lg p-5 text-left">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📧</span>
              <div>
                <h3 className="text-white font-medium">Recording Coming Soon</h3>
                <p className="text-white/40 text-sm">Check your inbox for the session recording and key takeaways</p>
              </div>
            </div>
          </div>

          <div className="border border-white/10 rounded-lg p-5 text-left">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📝</span>
              <div>
                <h3 className="text-white font-medium">Share Your Feedback</h3>
                <p className="text-white/40 text-sm">Help us improve future boardrooms</p>
              </div>
            </div>
            <a
              href="https://forms.gle/feedback-placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-[#C9935A] text-sm hover:underline"
            >
              Take 2-minute survey →
            </a>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link 
            href="/"
            className="block w-full py-4 bg-[#C9935A] text-black font-medium tracking-wide hover:bg-[#B8844A] transition-colors"
          >
            Return to Events First Group
          </Link>
          <a
            href="https://www.dataiku.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 border border-[#2EBDAA]/30 text-[#2EBDAA] text-sm tracking-wide hover:bg-[#2EBDAA]/10 transition-colors"
          >
            Learn More About Dataiku
          </a>
        </div>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// INVALID TOKEN SCREEN
// ═══════════════════════════════════════════════════════════════════════════

function InvalidTokenScreen({ onRegister }: { onRegister: () => void }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center mx-auto mb-8">
          <span className="text-3xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-light text-white mb-4">Invalid or Expired Link</h1>
        <p className="text-white/50 text-sm mb-8 leading-relaxed">
          This registration link is no longer valid. It may have expired or already been used.
        </p>
        <button
          onClick={onRegister}
          className="w-full py-4 bg-[#C9935A] text-black font-medium tracking-wide hover:bg-[#B8844A] transition-colors mb-4"
        >
          Register Again
        </button>
        <Link href="/" className="text-white/40 text-sm hover:text-white/60 transition-colors">
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-center">
        <img src={DATAIKU_LOGO} alt="Dataiku" className="h-8 mx-auto mb-8 opacity-60" />
        <div className="w-10 h-10 border-2 border-white/20 border-t-[#C9935A] rounded-full animate-spin mx-auto" />
        <p className="text-white/40 text-sm mt-4">Loading...</p>
      </div>
    </div>
  );
}

export default function DataikuBoardroomPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <DataikuBoardroomContent />
    </Suspense>
  );
}

function DataikuBoardroomContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [view, setView] = useState<ViewState>(token ? "loading" : "landing");
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: "",
    email: "",
    company: "",
    jobTitle: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [joinToken, setJoinToken] = useState<string | null>(token);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const callRef = useRef<any>(null);

  // ─────────────────────────────────────────────────────────────────────────
  // VERIFY TOKEN ON LOAD
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!token) return;

    const verifyToken = async () => {
      try {
        const res = await fetch("/api/boardroom/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, roomName: EVENT.roomName }),
        });
        const data = await res.json();

        if (!res.ok || !data.valid) {
          setView("invalid");
          return;
        }

        // Pre-fill form data from registration
        setFormData({
          fullName: data.registration.fullName,
          email: data.registration.email,
          company: data.registration.company || "",
          jobTitle: data.registration.jobTitle || "",
        });
        setJoinToken(token);
        setView("prejoin");
      } catch (err) {
        console.error("Token verification error:", err);
        setView("invalid");
      }
    };

    verifyToken();
  }, [token]);

  // ─────────────────────────────────────────────────────────────────────────
  // HANDLERS
  // ─────────────────────────────────────────────────────────────────────────

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/boardroom/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomName: EVENT.roomName, ...formData }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || data.details || "Registration failed");
      }
      
      setJoinToken(data.joinToken);
      setView("confirmation");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const joinBoardroom = useCallback(async (cameraOn: boolean, micOn: boolean) => {
    setView("joining");
    try {
      const DailyIframe = (await import("@daily-co/daily-js")).default;
      
      const tokenRes = await fetch("/api/boardroom/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          roomName: EVENT.roomName, 
          userName: formData.fullName, 
          isOwner: false,
          joinToken,
          email: formData.email,
        }),
      });
      
      if (!tokenRes.ok) {
        const data = await tokenRes.json();
        throw new Error(data.error || "Failed to get token");
      }
      
      const { token: dailyToken } = await tokenRes.json();

      if (containerRef.current) {
        callRef.current = DailyIframe.createFrame(containerRef.current, {
          iframeStyle: { width: "100%", height: "100%", border: "0" },
          showLeaveButton: true,
          showFullscreenButton: true,
          theme: {
            colors: {
              accent: GOLD,
              accentText: "#000000",
              background: "#000000",
              backgroundAccent: "#0a0a0a",
              baseText: "#ffffff",
              border: "rgba(255,255,255,0.1)",
              mainAreaBg: "#000000",
              mainAreaBgAccent: "#0a0a0a",
              mainAreaText: "#ffffff",
              supportiveText: "rgba(255,255,255,0.6)",
            },
          },
        });

        // Handle waiting room (knocking)
        callRef.current.on("waiting-participant", () => {
          setView("waiting");
        });

        callRef.current.on("joined-meeting", () => {
          setView("joined");
        });

        callRef.current.on("left-meeting", () => {
          setView("left");
          callRef.current?.destroy();
        });

        callRef.current.on("error", (e: any) => {
          console.error("Daily error:", e);
          setView("landing");
        });

        await callRef.current.join({ 
          url: `https://eventsfirstgroup.daily.co/${EVENT.roomName}`, 
          token: dailyToken,
          startVideoOff: !cameraOn,
          startAudioOff: !micOn,
        });
      }
    } catch (err) {
      console.error("Join error:", err);
      setError(err instanceof Error ? err.message : "Failed to join");
      setView("prejoin");
    }
  }, [formData, joinToken]);

  useEffect(() => {
    return () => {
      callRef.current?.destroy();
    };
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // LOADING STATE
  // ─────────────────────────────────────────────────────────────────────────

  if (view === "loading") {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center">
          <img src={DATAIKU_LOGO} alt="Dataiku" className="h-8 mx-auto mb-8 opacity-60" />
          <div className="w-10 h-10 border-2 border-white/20 border-t-[#C9935A] rounded-full animate-spin mx-auto" />
          <p className="text-white/40 text-sm mt-4">Verifying your registration...</p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // INVALID TOKEN
  // ─────────────────────────────────────────────────────────────────────────

  if (view === "invalid") {
    return <InvalidTokenScreen onRegister={() => setView("register")} />;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // VIDEO STATES
  // ─────────────────────────────────────────────────────────────────────────

  if (view === "waiting") {
    return (
      <WaitingRoom
        userName={formData.fullName}
        company={formData.company}
        onLeave={() => {
          callRef.current?.leave();
          setView("landing");
        }}
      />
    );
  }

  if (view === "joining" || view === "joined") {
    return (
      <div className="fixed inset-0 bg-black">
        {view === "joining" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10 pointer-events-none">
            <img src={DATAIKU_LOGO} alt="Dataiku" className="h-8 mb-8 opacity-60" />
            <div className="w-12 h-12 border-2 border-white/20 border-t-[#C9935A] rounded-full animate-spin" />
            <p className="text-white/60 mt-4 text-sm tracking-wide">Connecting to boardroom...</p>
          </div>
        )}
        <div ref={containerRef} className="w-full h-full" />
      </div>
    );
  }

  if (view === "left") {
    return <PostMeetingScreen />;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PRE-JOIN SCREEN
  // ─────────────────────────────────────────────────────────────────────────

  if (view === "prejoin") {
    return (
      <PreJoinScreen
        userName={formData.fullName}
        company={formData.company}
        onJoin={joinBoardroom}
        onBack={() => setView("confirmation")}
      />
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // CONFIRMATION
  // ─────────────────────────────────────────────────────────────────────────

  if (view === "confirmation") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-lg">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#C9935A]/20 to-transparent border border-[#C9935A]/30 flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl text-[#C9935A]">✓</span>
          </div>
          <h1 className="text-3xl font-light text-white mb-3">You're confirmed</h1>
          <p className="text-white/50 text-sm mb-8">
            Check your inbox for details. Join link sent to <span className="text-white">{formData.email}</span>
          </p>
          
          <div className="border border-[#C9935A]/20 rounded-lg p-6 mb-8 text-left bg-[#C9935A]/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-light text-[#C9935A]">{EVENT.date.day}</div>
                <div className="text-xs text-white/40 tracking-wider">{EVENT.date.month}</div>
              </div>
              <div className="h-12 w-px bg-[#C9935A]/20" />
              <div>
                <div className="text-white font-medium">{EVENT.title}</div>
                <div className="text-white/40 text-sm">{EVENT.time}</div>
              </div>
            </div>
          </div>

          <button onClick={() => setView("prejoin")} className="w-full py-4 bg-[#C9935A] text-black font-medium tracking-wide hover:bg-[#B8844A] transition-colors">
            Join Boardroom Now
          </button>
          <p className="text-white/30 text-xs mt-4">Or use the link in your email</p>
        </motion.div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // REGISTRATION
  // ─────────────────────────────────────────────────────────────────────────

  if (view === "register") {
    return (
      <div className="min-h-screen bg-black py-20 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
          <button onClick={() => setView("landing")} className="text-white/40 text-sm mb-8 hover:text-white/60 transition-colors">
            ← Back
          </button>

          <div className="mb-8">
            <img src={EVENT.sponsor.logo} alt={EVENT.sponsor.name} className="h-6 mb-6 opacity-70" />
            <h1 className="text-2xl font-light text-white mb-2">Request your seat</h1>
            <p className="text-white/40 text-sm">Limited to {EVENT.seats} executives</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-sm rounded"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {[
              { key: "fullName", label: "Full Name", type: "text" },
              { key: "email", label: "Work Email", type: "email" },
              { key: "company", label: "Company", type: "text" },
              { key: "jobTitle", label: "Title", type: "text" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-white/40 text-xs tracking-wider mb-2 uppercase">{field.label}</label>
                <input
                  type={field.type}
                  required
                  value={formData[field.key as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white text-sm rounded-none focus:outline-none focus:border-[#C9935A]/50 transition-colors"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#C9935A] text-black font-medium tracking-wide hover:bg-[#B8844A] transition-colors disabled:opacity-50 mt-4"
            >
              {loading ? "Submitting..." : "Confirm Registration"}
            </button>
          </form>

          <p className="text-white/20 text-xs mt-6 text-center">
            By registering, you agree to our <Link href="/privacy" className="underline">Privacy Policy</Link>
          </p>
        </motion.div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // LANDING PAGE
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 py-20 relative overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        
        {/* Gradient orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-[#C9935A]/5 to-transparent blur-3xl pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 max-w-4xl text-center"
        >
          {/* Sponsor */}
          <motion.div variants={fadeUp} className="mb-12">
            <span className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4 block">Hosted by</span>
            <img src={EVENT.sponsor.logo} alt={EVENT.sponsor.name} className="h-8 mx-auto opacity-80" />
          </motion.div>

          {/* Date badge */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-4 border border-[#C9935A]/20 px-6 py-3 mb-10">
            <div className="text-center">
              <div className="text-xl font-light text-[#C9935A]">{EVENT.date.day}</div>
              <div className="text-[10px] text-white/40 tracking-widest">{EVENT.date.month}</div>
            </div>
            <div className="h-8 w-px bg-[#C9935A]/20" />
            <div className="text-left">
              <div className="text-xs text-white/60">{EVENT.time}</div>
              <div className="text-xs text-white/30">{EVENT.venue}</div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight mb-6">
            {EVENT.title}
          </motion.h1>

          {/* Description */}
          <motion.p variants={fadeUp} className="text-white/50 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
            {EVENT.description}
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setView("register")}
              className="px-10 py-4 bg-[#C9935A] text-black font-medium tracking-wide hover:bg-[#B8844A] transition-all"
            >
              Reserve Your Seat
            </button>
            <a href="#speakers" className="px-8 py-4 border border-white/10 text-white/60 text-sm tracking-wide hover:border-white/30 hover:text-white transition-all">
              View Speakers
            </a>
          </motion.div>

          {/* Seats */}
          <motion.p variants={fadeUp} className="text-white/30 text-xs tracking-wider mt-8">
            Limited to {EVENT.seats} executives
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#C9935A]/30 to-transparent" />
        </motion.div>
      </section>

      {/* Topics */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-[#C9935A] text-xs tracking-[0.3em] uppercase">Agenda</span>
            <h2 className="text-3xl md:text-4xl font-extralight mt-4">Discussion Topics</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {EVENT.topics.map((topic, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border border-white/5 hover:border-[#C9935A]/20 transition-colors group"
              >
                <div className="text-[#C9935A]/40 text-xs tracking-widest mb-4">0{i + 1}</div>
                <h3 className="text-xl font-light text-white mb-3 group-hover:text-[#C9935A] transition-colors">{topic.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{topic.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section id="speakers" className="py-24 px-6 bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-[#C9935A] text-xs tracking-[0.3em] uppercase">Featured</span>
            <h2 className="text-3xl md:text-4xl font-extralight mt-4">Speakers</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {EVENT.speakers.map((speaker, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border border-[#C9935A]/20 group-hover:border-[#C9935A]/40 transition-colors" />
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">{speaker.name}</h3>
                <p className="text-[#C9935A] text-sm mb-1">{speaker.title}</p>
                <p className="text-white/40 text-sm">{speaker.company}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-[#C9935A] text-xs tracking-[0.3em] uppercase">Schedule</span>
            <h2 className="text-3xl md:text-4xl font-extralight mt-4">Timeline</h2>
          </motion.div>

          <div className="space-y-0">
            {EVENT.agenda.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 py-5 border-b border-white/5 group"
              >
                <div className="flex items-baseline gap-1 w-20">
                  <span className="text-xl font-light text-[#C9935A]">{item.time}</span>
                  <span className="text-xs text-white/30">{item.label}</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#C9935A]/30 group-hover:bg-[#C9935A] transition-colors" />
                <span className="text-white/70 group-hover:text-white transition-colors">{item.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C9935A]/5 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extralight mb-6">Ready to join the conversation?</h2>
          <p className="text-white/40 text-lg mb-10">
            Secure your seat at this exclusive executive roundtable.
          </p>
          <button
            onClick={() => setView("register")}
            className="px-12 py-5 bg-[#C9935A] text-black font-medium tracking-wide hover:bg-[#B8844A] transition-all"
          >
            Register Now
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="text-white/30 text-xs tracking-wider">Hosted by</span>
            <img src={EFG_LOGO} alt="Events First Group" className="h-5 opacity-60" />
          </div>
          <div className="flex items-center gap-6">
            <span className="text-white/30 text-xs tracking-wider">Powered by</span>
            <img src={EVENT.sponsor.logo} alt={EVENT.sponsor.name} className="h-5 opacity-60" />
          </div>
        </div>
      </footer>
    </div>
  );
}
