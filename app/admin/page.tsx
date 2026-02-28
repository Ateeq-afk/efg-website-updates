"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link"

type Event = {
  id: string
  name: string
  slug: string
  date: string
}

type Registration = {
  id: string
  event_id: string
  profile_id: string
  status: string
  registered_at: string
  admin_notes: string | null
  events: Event
  profiles: {
    id: string
    full_name: string
    email: string
    title: string | null
    company: string | null
    industry_id: string | null
    role_type: string
    linkedin_url: string | null
    bio: string | null
    industries?: { name: string } | null
  }
}

export default function AdminPage() {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("interested")
  const [processing, setProcessing] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }

      // Check if admin
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("user_id", user.id)
        .single()

      if (!profile?.is_admin) {
        router.push("/portal")
        return
      }

      setIsAdmin(true)

      // Load events
      const { data: eventsData } = await supabase
        .from("events")
        .select("id, name, slug, date")
        .eq("is_active", true)
        .order("date", { ascending: true })

      if (eventsData) setEvents(eventsData)

      setLoading(false)
    }
    init()
  }, [supabase, router])

  useEffect(() => {
    if (!isAdmin) return
    loadRegistrations()
  }, [isAdmin, selectedEvent, selectedStatus])

  const loadRegistrations = async () => {
    let query = supabase
      .from("event_registrations")
      .select(`
        *,
        events (id, name, slug, date),
        profiles (
          id, full_name, email, title, company, industry_id, role_type, linkedin_url, bio,
          industries:industry_id (name)
        )
      `)
      .order("registered_at", { ascending: false })

    if (selectedEvent !== "all") {
      query = query.eq("event_id", selectedEvent)
    }

    if (selectedStatus !== "all") {
      query = query.eq("status", selectedStatus)
    }

    const { data } = await query

    if (data) setRegistrations(data as Registration[])
  }

  const handleAction = async (regId: string, action: "approved" | "rejected") => {
    setProcessing(regId)

    const { error } = await supabase
      .from("event_registrations")
      .update({
        status: action,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", regId)

    if (!error) {
      setRegistrations(prev => 
        prev.map(r => r.id === regId ? { ...r, status: action } : r)
      )
    }

    setProcessing(null)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; color: string }> = {
      interested: { bg: "rgba(251, 191, 36, 0.15)", color: "#fbbf24" },
      approved: { bg: "rgba(34, 197, 94, 0.15)", color: "#22c55e" },
      rejected: { bg: "rgba(239, 68, 68, 0.15)", color: "#ef4444" },
      confirmed: { bg: "rgba(59, 130, 246, 0.15)", color: "#3b82f6" },
      attended: { bg: "rgba(139, 92, 246, 0.15)", color: "#8b5cf6" },
    }
    return styles[status] || styles.interested
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner" />
        <style jsx>{`
          .admin-loading {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0a0a0a;
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(255,255,255,0.1);
            border-top-color: var(--orange);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    )
  }

  return (
    <div className="admin">
      <header className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <Link href="/portal" className="back">← Portal</Link>
            <h1>Admin Panel</h1>
          </div>
          <div className="filters">
            <select 
              value={selectedEvent} 
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option value="all">All Events</option>
              {events.map(e => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>
            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="interested">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="confirmed">Confirmed</option>
            </select>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="stats">
          <div className="stat">
            <span className="stat-value">{registrations.filter(r => r.status === "interested").length}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat">
            <span className="stat-value">{registrations.filter(r => r.status === "approved").length}</span>
            <span className="stat-label">Approved</span>
          </div>
          <div className="stat">
            <span className="stat-value">{registrations.filter(r => r.status === "confirmed").length}</span>
            <span className="stat-label">Confirmed</span>
          </div>
        </div>

        <div className="registrations">
          {registrations.length === 0 ? (
            <div className="empty">No registrations found</div>
          ) : (
            registrations.map(reg => (
              <div key={reg.id} className="reg-card">
                <div className="reg-header">
                  <div className="applicant">
                    <div className="avatar">
                      {reg.profiles.full_name?.charAt(0) || "?"}
                    </div>
                    <div className="info">
                      <h3>{reg.profiles.full_name}</h3>
                      <p>{reg.profiles.title} {reg.profiles.company ? `at ${reg.profiles.company}` : ""}</p>
                    </div>
                  </div>
                  <div 
                    className="status-badge"
                    style={{ 
                      background: getStatusBadge(reg.status).bg,
                      color: getStatusBadge(reg.status).color 
                    }}
                  >
                    {reg.status}
                  </div>
                </div>

                <div className="reg-details">
                  <div className="detail">
                    <span className="label">Event</span>
                    <span className="value">{reg.events.name}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Email</span>
                    <span className="value">{reg.profiles.email}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Role</span>
                    <span className="value">{reg.profiles.role_type}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Industry</span>
                    <span className="value">{reg.profiles.industries?.name || "—"}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Applied</span>
                    <span className="value">{formatDate(reg.registered_at)}</span>
                  </div>
                  {reg.profiles.linkedin_url && (
                    <div className="detail">
                      <span className="label">LinkedIn</span>
                      <a href={reg.profiles.linkedin_url} target="_blank" rel="noopener" className="link">
                        View Profile →
                      </a>
                    </div>
                  )}
                </div>

                {reg.profiles.bio && (
                  <div className="bio">
                    <span className="label">Bio</span>
                    <p>{reg.profiles.bio}</p>
                  </div>
                )}

                {reg.status === "interested" && (
                  <div className="actions">
                    <button
                      className="btn approve"
                      onClick={() => handleAction(reg.id, "approved")}
                      disabled={processing === reg.id}
                    >
                      {processing === reg.id ? "..." : "Approve"}
                    </button>
                    <button
                      className="btn reject"
                      onClick={() => handleAction(reg.id, "rejected")}
                      disabled={processing === reg.id}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>

      <style jsx>{`
        .admin {
          min-height: 100vh;
          background: #0a0a0a;
        }

        .admin-header {
          background: rgba(0,0,0,0.8);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 20px 24px;
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(20px);
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .back {
          font-family: var(--font-outfit);
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          display: block;
          margin-bottom: 4px;
        }

        .back:hover { color: var(--orange); }

        h1 {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .filters {
          display: flex;
          gap: 12px;
        }

        .filters select {
          padding: 10px 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          font-family: var(--font-outfit);
          font-size: 13px;
          color: white;
          cursor: pointer;
        }

        .filters select option {
          background: #1a1a1a;
        }

        .admin-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 24px;
        }

        .stats {
          display: flex;
          gap: 16px;
          margin-bottom: 32px;
        }

        .stat {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 20px 24px;
          text-align: center;
          flex: 1;
        }

        .stat-value {
          display: block;
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 700;
          color: white;
        }

        .stat-label {
          font-family: var(--font-outfit);
          font-size: 13px;
          color: rgba(255,255,255,0.5);
        }

        .registrations {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .empty {
          text-align: center;
          padding: 48px;
          color: rgba(255,255,255,0.4);
          font-family: var(--font-outfit);
        }

        .reg-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 24px;
        }

        .reg-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .applicant {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(232, 101, 26, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          color: var(--orange);
        }

        .info h3 {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          color: white;
          margin: 0 0 4px;
        }

        .info p {
          font-family: var(--font-outfit);
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          margin: 0;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-family: var(--font-outfit);
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .reg-details {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 16px;
          margin-bottom: 16px;
        }

        .detail {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .label {
          font-family: var(--font-outfit);
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .value {
          font-family: var(--font-outfit);
          font-size: 14px;
          color: rgba(255,255,255,0.8);
        }

        .link {
          font-family: var(--font-outfit);
          font-size: 13px;
          color: var(--orange);
          text-decoration: none;
        }

        .link:hover { text-decoration: underline; }

        .bio {
          background: rgba(255,255,255,0.02);
          border-radius: 8px;
          padding: 12px 16px;
          margin-bottom: 16px;
        }

        .bio p {
          font-family: var(--font-outfit);
          font-size: 13px;
          color: rgba(255,255,255,0.7);
          line-height: 1.6;
          margin: 4px 0 0;
        }

        .actions {
          display: flex;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .btn {
          padding: 12px 24px;
          border-radius: 10px;
          font-family: var(--font-outfit);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn.approve {
          background: rgba(34, 197, 94, 0.15);
          color: #22c55e;
        }

        .btn.approve:hover:not(:disabled) {
          background: rgba(34, 197, 94, 0.25);
        }

        .btn.reject {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .btn.reject:hover:not(:disabled) {
          background: rgba(239, 68, 68, 0.2);
        }

        @media (max-width: 640px) {
          .stats { flex-direction: column; }
          .reg-details { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  )
}
