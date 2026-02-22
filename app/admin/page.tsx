"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Speaker, Sponsor, SeriesSlug, SponsorTier } from "@/lib/supabase";

type Tab = "speakers" | "sponsors";
type ModalType = "add" | "edit" | null;

const SERIES_OPTIONS: { value: SeriesSlug; label: string }[] = [
  { value: "ot-security-first", label: "OT Security First" },
  { value: "data-ai-first", label: "Data & AI First" },
  { value: "opex-first", label: "Opex First" },
  { value: "cxo-first", label: "CXO First" },
];

const TIER_OPTIONS: { value: SponsorTier; label: string }[] = [
  { value: "title", label: "Title Sponsor" },
  { value: "platinum", label: "Platinum" },
  { value: "gold", label: "Gold" },
  { value: "silver", label: "Silver" },
  { value: "bronze", label: "Bronze" },
  { value: "partner", label: "Partner" },
  { value: "media", label: "Media Partner" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("speakers");
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [speakerSeries, setSpeakerSeries] = useState<Record<string, SeriesSlug[]>>({});
  const [sponsorSeries, setSponsorSeries] = useState<Record<string, { series: SeriesSlug; tier: SponsorTier }[]>>({});
  const [modalType, setModalType] = useState<ModalType>(null);
  const [editingItem, setEditingItem] = useState<Speaker | Sponsor | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Check auth
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
        return;
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  // Fetch data
  const fetchData = useCallback(async () => {
    // Fetch speakers with their series
    const { data: speakersData } = await supabase
      .from("speakers")
      .select("*")
      .order("sort_order", { ascending: true });

    if (speakersData) {
      setSpeakers(speakersData);

      // Fetch speaker series relationships
      const { data: speakerSeriesData } = await supabase
        .from("speaker_series")
        .select("speaker_id, series_slug");

      if (speakerSeriesData) {
        const seriesMap: Record<string, SeriesSlug[]> = {};
        speakerSeriesData.forEach((ss) => {
          if (!seriesMap[ss.speaker_id]) seriesMap[ss.speaker_id] = [];
          seriesMap[ss.speaker_id].push(ss.series_slug as SeriesSlug);
        });
        setSpeakerSeries(seriesMap);
      }
    }

    // Fetch sponsors with their series
    const { data: sponsorsData } = await supabase
      .from("sponsors")
      .select("*")
      .order("sort_order", { ascending: true });

    if (sponsorsData) {
      setSponsors(sponsorsData);

      // Fetch sponsor series relationships
      const { data: sponsorSeriesData } = await supabase
        .from("sponsor_series")
        .select("sponsor_id, series_slug, tier");

      if (sponsorSeriesData) {
        const seriesMap: Record<string, { series: SeriesSlug; tier: SponsorTier }[]> = {};
        sponsorSeriesData.forEach((ss) => {
          if (!seriesMap[ss.sponsor_id]) seriesMap[ss.sponsor_id] = [];
          seriesMap[ss.sponsor_id].push({
            series: ss.series_slug as SeriesSlug,
            tier: ss.tier as SponsorTier
          });
        });
        setSponsorSeries(seriesMap);
      }
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchData();
    }
  }, [loading, fetchData]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <p style={{ color: "#606060", fontFamily: "var(--font-outfit)" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Top Navigation */}
      <nav style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "#0A0A0A",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.5px",
          }}>
            EFG Admin
          </h1>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setActiveTab("speakers")}
              style={{
                padding: "8px 16px",
                background: activeTab === "speakers" ? "#E8651A" : "transparent",
                border: activeTab === "speakers" ? "none" : "1px solid rgba(255,255,255,0.15)",
                borderRadius: 6,
                fontFamily: "var(--font-outfit)",
                fontSize: 14,
                fontWeight: 500,
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              Speakers
            </button>
            <button
              onClick={() => setActiveTab("sponsors")}
              style={{
                padding: "8px 16px",
                background: activeTab === "sponsors" ? "#E8651A" : "transparent",
                border: activeTab === "sponsors" ? "none" : "1px solid rgba(255,255,255,0.15)",
                borderRadius: 6,
                fontFamily: "var(--font-outfit)",
                fontSize: 14,
                fontWeight: 500,
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              Sponsors
            </button>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          style={{
            padding: "8px 16px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 6,
            fontFamily: "var(--font-outfit)",
            fontSize: 13,
            color: "#808080",
            cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </nav>

      {/* Content */}
      <div style={{ padding: "32px" }}>
        {/* Header with Add Button */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: 24,
            fontWeight: 700,
            color: "#ffffff",
          }}>
            {activeTab === "speakers" ? "Speakers" : "Sponsors"}
          </h2>
          <button
            onClick={() => {
              setEditingItem(null);
              setModalType("add");
            }}
            style={{
              padding: "10px 20px",
              background: "#E8651A",
              border: "none",
              borderRadius: 6,
              fontFamily: "var(--font-outfit)",
              fontSize: 14,
              fontWeight: 600,
              color: "#ffffff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 18 }}>+</span>
            Add {activeTab === "speakers" ? "Speaker" : "Sponsor"}
          </button>
        </div>

        {/* Table */}
        {activeTab === "speakers" ? (
          <SpeakersTable
            speakers={speakers}
            speakerSeries={speakerSeries}
            onEdit={(speaker) => {
              setEditingItem(speaker);
              setModalType("edit");
            }}
            onDelete={async (id) => {
              if (confirm("Are you sure you want to delete this speaker?")) {
                await supabase.from("speaker_series").delete().eq("speaker_id", id);
                await supabase.from("speakers").delete().eq("id", id);
                fetchData();
              }
            }}
          />
        ) : (
          <SponsorsTable
            sponsors={sponsors}
            sponsorSeries={sponsorSeries}
            onEdit={(sponsor) => {
              setEditingItem(sponsor);
              setModalType("edit");
            }}
            onDelete={async (id) => {
              if (confirm("Are you sure you want to delete this sponsor?")) {
                await supabase.from("sponsor_series").delete().eq("sponsor_id", id);
                await supabase.from("sponsors").delete().eq("id", id);
                fetchData();
              }
            }}
          />
        )}
      </div>

      {/* Modal */}
      {modalType && (
        <Modal
          type={activeTab}
          mode={modalType}
          item={editingItem}
          itemSeries={activeTab === "speakers"
            ? (editingItem ? speakerSeries[editingItem.id] || [] : [])
            : (editingItem ? sponsorSeries[editingItem.id] || [] : [])
          }
          saving={saving}
          error={error}
          onClose={() => {
            setModalType(null);
            setEditingItem(null);
            setError("");
          }}
          onSave={async (data, series) => {
            setSaving(true);
            setError("");
            try {
              if (activeTab === "speakers") {
                if (modalType === "add") {
                  const { data: newSpeaker, error: insertError } = await supabase
                    .from("speakers")
                    .insert(data)
                    .select()
                    .single();

                  if (insertError) throw insertError;

                  // Add series relationships
                  if (newSpeaker && (series as SeriesSlug[]).length > 0) {
                    await supabase.from("speaker_series").insert(
                      (series as SeriesSlug[]).map((s) => ({
                        speaker_id: newSpeaker.id,
                        series_slug: s,
                      }))
                    );
                  }
                } else {
                  const { error: updateError } = await supabase
                    .from("speakers")
                    .update(data)
                    .eq("id", editingItem!.id);

                  if (updateError) throw updateError;

                  // Update series relationships
                  await supabase.from("speaker_series").delete().eq("speaker_id", editingItem!.id);
                  if ((series as SeriesSlug[]).length > 0) {
                    await supabase.from("speaker_series").insert(
                      (series as SeriesSlug[]).map((s) => ({
                        speaker_id: editingItem!.id,
                        series_slug: s,
                      }))
                    );
                  }
                }
              } else {
                // Sponsors
                if (modalType === "add") {
                  const { data: newSponsor, error: insertError } = await supabase
                    .from("sponsors")
                    .insert(data)
                    .select()
                    .single();

                  if (insertError) throw insertError;

                  // Add series relationships
                  const sponsorSeriesData = series as { series: SeriesSlug; tier: SponsorTier }[];
                  if (newSponsor && sponsorSeriesData.length > 0) {
                    await supabase.from("sponsor_series").insert(
                      sponsorSeriesData.map((s) => ({
                        sponsor_id: newSponsor.id,
                        series_slug: s.series,
                        tier: s.tier,
                      }))
                    );
                  }
                } else {
                  const { error: updateError } = await supabase
                    .from("sponsors")
                    .update(data)
                    .eq("id", editingItem!.id);

                  if (updateError) throw updateError;

                  // Update series relationships
                  await supabase.from("sponsor_series").delete().eq("sponsor_id", editingItem!.id);
                  const sponsorSeriesData = series as { series: SeriesSlug; tier: SponsorTier }[];
                  if (sponsorSeriesData.length > 0) {
                    await supabase.from("sponsor_series").insert(
                      sponsorSeriesData.map((s) => ({
                        sponsor_id: editingItem!.id,
                        series_slug: s.series,
                        tier: s.tier,
                      }))
                    );
                  }
                }
              }

              setModalType(null);
              setEditingItem(null);
              fetchData();
            } catch (err) {
              setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
              setSaving(false);
            }
          }}
        />
      )}
    </div>
  );
}

// Speakers Table Component
function SpeakersTable({
  speakers,
  speakerSeries,
  onEdit,
  onDelete
}: {
  speakers: Speaker[];
  speakerSeries: Record<string, SeriesSlug[]>;
  onEdit: (speaker: Speaker) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div style={{
      background: "#141414",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.08)",
      overflow: "hidden",
    }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.03)" }}>
            <th style={thStyle}>Photo</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Organization</th>
            <th style={thStyle}>Series</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {speakers.map((speaker) => (
            <tr key={speaker.id} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <td style={tdStyle}>
                {speaker.photo_url ? (
                  <img
                    src={speaker.photo_url}
                    alt={`${speaker.first_name} ${speaker.last_name}`}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      objectFit: "cover"
                    }}
                  />
                ) : (
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    color: "#606060",
                  }}>
                    {speaker.first_name[0]}{speaker.last_name[0]}
                  </div>
                )}
              </td>
              <td style={tdStyle}>
                <span style={{ fontWeight: 500 }}>
                  {speaker.first_name} {speaker.last_name}
                </span>
                {speaker.is_featured && (
                  <span style={{
                    marginLeft: 8,
                    padding: "2px 6px",
                    background: "#E8651A",
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}>
                    Featured
                  </span>
                )}
              </td>
              <td style={tdStyle}>{speaker.job_title}</td>
              <td style={tdStyle}>{speaker.organization}</td>
              <td style={tdStyle}>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {(speakerSeries[speaker.id] || []).map((series) => (
                    <span key={series} style={{
                      padding: "2px 8px",
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: 4,
                      fontSize: 11,
                      color: "#a0a0a0",
                    }}>
                      {series}
                    </span>
                  ))}
                </div>
              </td>
              <td style={tdStyle}>
                <span style={{
                  padding: "4px 8px",
                  background: speaker.status === "active"
                    ? "rgba(34, 197, 94, 0.15)"
                    : "rgba(239, 68, 68, 0.15)",
                  color: speaker.status === "active" ? "#22c55e" : "#ef4444",
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 500,
                }}>
                  {speaker.status}
                </span>
              </td>
              <td style={tdStyle}>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => onEdit(speaker)}
                    style={actionBtnStyle}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(speaker.id)}
                    style={{ ...actionBtnStyle, color: "#ef4444" }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {speakers.length === 0 && (
            <tr>
              <td colSpan={7} style={{ ...tdStyle, textAlign: "center", color: "#606060" }}>
                No speakers found. Add your first speaker.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Sponsors Table Component
function SponsorsTable({
  sponsors,
  sponsorSeries,
  onEdit,
  onDelete
}: {
  sponsors: Sponsor[];
  sponsorSeries: Record<string, { series: SeriesSlug; tier: SponsorTier }[]>;
  onEdit: (sponsor: Sponsor) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div style={{
      background: "#141414",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.08)",
      overflow: "hidden",
    }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.03)" }}>
            <th style={thStyle}>Logo</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Industry</th>
            <th style={thStyle}>Series & Tier</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sponsors.map((sponsor) => (
            <tr key={sponsor.id} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <td style={tdStyle}>
                {sponsor.logo_url ? (
                  <img
                    src={sponsor.logo_url}
                    alt={sponsor.name}
                    style={{
                      width: 60,
                      height: 40,
                      objectFit: "contain",
                      background: "#ffffff",
                      borderRadius: 4,
                      padding: 4,
                    }}
                  />
                ) : (
                  <div style={{
                    width: 60,
                    height: 40,
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    color: "#606060",
                  }}>
                    {sponsor.name.substring(0, 3)}
                  </div>
                )}
              </td>
              <td style={tdStyle}>
                <span style={{ fontWeight: 500 }}>{sponsor.name}</span>
              </td>
              <td style={tdStyle}>{sponsor.industry || "-"}</td>
              <td style={tdStyle}>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {(sponsorSeries[sponsor.id] || []).map((ss, i) => (
                    <span key={i} style={{
                      padding: "2px 8px",
                      background: getTierColor(ss.tier),
                      borderRadius: 4,
                      fontSize: 11,
                      color: "#ffffff",
                    }}>
                      {ss.series}: {ss.tier}
                    </span>
                  ))}
                </div>
              </td>
              <td style={tdStyle}>
                <span style={{
                  padding: "4px 8px",
                  background: sponsor.status === "active"
                    ? "rgba(34, 197, 94, 0.15)"
                    : "rgba(239, 68, 68, 0.15)",
                  color: sponsor.status === "active" ? "#22c55e" : "#ef4444",
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 500,
                }}>
                  {sponsor.status}
                </span>
              </td>
              <td style={tdStyle}>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => onEdit(sponsor)}
                    style={actionBtnStyle}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(sponsor.id)}
                    style={{ ...actionBtnStyle, color: "#ef4444" }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {sponsors.length === 0 && (
            <tr>
              <td colSpan={6} style={{ ...tdStyle, textAlign: "center", color: "#606060" }}>
                No sponsors found. Add your first sponsor.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Modal Component
function Modal({
  type,
  mode,
  item,
  itemSeries,
  saving,
  error,
  onClose,
  onSave
}: {
  type: Tab;
  mode: "add" | "edit";
  item: Speaker | Sponsor | null;
  itemSeries: SeriesSlug[] | { series: SeriesSlug; tier: SponsorTier }[];
  saving: boolean;
  error: string;
  onClose: () => void;
  onSave: (data: Record<string, unknown>, series: SeriesSlug[] | { series: SeriesSlug; tier: SponsorTier }[]) => void;
}) {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [selectedSeries, setSelectedSeries] = useState<SeriesSlug[]>([]);
  const [sponsorSeriesData, setSponsorSeriesData] = useState<{ series: SeriesSlug; tier: SponsorTier }[]>([]);

  useEffect(() => {
    if (type === "speakers") {
      if (item) {
        const speaker = item as Speaker;
        setFormData({
          first_name: speaker.first_name,
          last_name: speaker.last_name,
          job_title: speaker.job_title,
          organization: speaker.organization,
          photo_url: speaker.photo_url || "",
          bio: speaker.bio || "",
          linkedin_url: speaker.linkedin_url || "",
          country: speaker.country || "",
          is_featured: speaker.is_featured || false,
          status: speaker.status || "active",
          sort_order: speaker.sort_order || 0,
        });
        setSelectedSeries(itemSeries as SeriesSlug[]);
      } else {
        setFormData({
          first_name: "",
          last_name: "",
          job_title: "",
          organization: "",
          photo_url: "",
          bio: "",
          linkedin_url: "",
          country: "",
          is_featured: false,
          status: "active",
          sort_order: 0,
        });
        setSelectedSeries([]);
      }
    } else {
      if (item) {
        const sponsor = item as Sponsor;
        setFormData({
          name: sponsor.name,
          logo_url: sponsor.logo_url || "",
          website_url: sponsor.website_url || "",
          description: sponsor.description || "",
          industry: sponsor.industry || "",
          status: sponsor.status || "active",
          sort_order: sponsor.sort_order || 0,
        });
        setSponsorSeriesData(itemSeries as { series: SeriesSlug; tier: SponsorTier }[]);
      } else {
        setFormData({
          name: "",
          logo_url: "",
          website_url: "",
          description: "",
          industry: "",
          status: "active",
          sort_order: 0,
        });
        setSponsorSeriesData([]);
      }
    }
  }, [item, itemSeries, type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, type === "speakers" ? selectedSeries : sponsorSeriesData);
  };

  const toggleSeries = (series: SeriesSlug) => {
    setSelectedSeries((prev) =>
      prev.includes(series)
        ? prev.filter((s) => s !== series)
        : [...prev, series]
    );
  };

  const addSponsorSeries = () => {
    setSponsorSeriesData((prev) => [...prev, { series: "ot-security-first", tier: "gold" }]);
  };

  const updateSponsorSeries = (index: number, field: "series" | "tier", value: string) => {
    setSponsorSeriesData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value as SeriesSlug | SponsorTier };
      return updated;
    });
  };

  const removeSponsorSeries = (index: number) => {
    setSponsorSeriesData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: 24,
    }}>
      <div style={{
        background: "#141414",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.1)",
        width: "100%",
        maxWidth: 600,
        maxHeight: "90vh",
        overflow: "auto",
      }}>
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: 18,
            fontWeight: 700,
            color: "#ffffff",
            margin: 0,
          }}>
            {mode === "add" ? "Add" : "Edit"} {type === "speakers" ? "Speaker" : "Sponsor"}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#808080",
              fontSize: 24,
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: 24 }}>
          {type === "speakers" ? (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <FormField
                  label="First Name"
                  value={formData.first_name as string}
                  onChange={(v) => setFormData({ ...formData, first_name: v })}
                  required
                />
                <FormField
                  label="Last Name"
                  value={formData.last_name as string}
                  onChange={(v) => setFormData({ ...formData, last_name: v })}
                  required
                />
              </div>
              <FormField
                label="Job Title"
                value={formData.job_title as string}
                onChange={(v) => setFormData({ ...formData, job_title: v })}
                required
              />
              <FormField
                label="Organization"
                value={formData.organization as string}
                onChange={(v) => setFormData({ ...formData, organization: v })}
                required
              />
              <FormField
                label="Photo URL"
                value={formData.photo_url as string}
                onChange={(v) => setFormData({ ...formData, photo_url: v })}
                placeholder="https://..."
              />
              <FormField
                label="Bio"
                value={formData.bio as string}
                onChange={(v) => setFormData({ ...formData, bio: v })}
                multiline
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <FormField
                  label="LinkedIn URL"
                  value={formData.linkedin_url as string}
                  onChange={(v) => setFormData({ ...formData, linkedin_url: v })}
                />
                <FormField
                  label="Country"
                  value={formData.country as string}
                  onChange={(v) => setFormData({ ...formData, country: v })}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Series</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {SERIES_OPTIONS.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => toggleSeries(s.value)}
                      style={{
                        padding: "6px 12px",
                        background: selectedSeries.includes(s.value) ? "#E8651A" : "transparent",
                        border: "1px solid",
                        borderColor: selectedSeries.includes(s.value) ? "#E8651A" : "rgba(255,255,255,0.15)",
                        borderRadius: 6,
                        fontFamily: "var(--font-outfit)",
                        fontSize: 13,
                        color: "#ffffff",
                        cursor: "pointer",
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Status</label>
                  <select
                    value={formData.status as string}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Sort Order</label>
                  <input
                    type="number"
                    value={formData.sort_order as number}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                    style={inputStyle}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", paddingTop: 24 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={formData.is_featured as boolean}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    />
                    <span style={{ fontFamily: "var(--font-outfit)", fontSize: 14, color: "#ffffff" }}>
                      Featured
                    </span>
                  </label>
                </div>
              </div>
            </>
          ) : (
            <>
              <FormField
                label="Company Name"
                value={formData.name as string}
                onChange={(v) => setFormData({ ...formData, name: v })}
                required
              />
              <FormField
                label="Logo URL"
                value={formData.logo_url as string}
                onChange={(v) => setFormData({ ...formData, logo_url: v })}
                placeholder="https://..."
              />
              <FormField
                label="Website URL"
                value={formData.website_url as string}
                onChange={(v) => setFormData({ ...formData, website_url: v })}
              />
              <FormField
                label="Industry"
                value={formData.industry as string}
                onChange={(v) => setFormData({ ...formData, industry: v })}
              />
              <FormField
                label="Description"
                value={formData.description as string}
                onChange={(v) => setFormData({ ...formData, description: v })}
                multiline
              />
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Series & Tier</label>
                {sponsorSeriesData.map((ss, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <select
                      value={ss.series}
                      onChange={(e) => updateSponsorSeries(i, "series", e.target.value)}
                      style={{ ...inputStyle, flex: 1 }}
                    >
                      {SERIES_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                    <select
                      value={ss.tier}
                      onChange={(e) => updateSponsorSeries(i, "tier", e.target.value)}
                      style={{ ...inputStyle, flex: 1 }}
                    >
                      {TIER_OPTIONS.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeSponsorSeries(i)}
                      style={{
                        padding: "0 12px",
                        background: "rgba(239, 68, 68, 0.15)",
                        border: "none",
                        borderRadius: 6,
                        color: "#ef4444",
                        cursor: "pointer",
                      }}
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSponsorSeries}
                  style={{
                    padding: "8px 16px",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 6,
                    fontFamily: "var(--font-outfit)",
                    fontSize: 13,
                    color: "#808080",
                    cursor: "pointer",
                  }}
                >
                  + Add Series
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Status</label>
                  <select
                    value={formData.status as string}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Sort Order</label>
                  <input
                    type="number"
                    value={formData.sort_order as number}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                    style={inputStyle}
                  />
                </div>
              </div>
            </>
          )}

          {error && (
            <div style={{
              padding: "12px 16px",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: 8,
              marginBottom: 16,
            }}>
              <p style={{
                fontFamily: "var(--font-outfit)",
                fontSize: 13,
                color: "#ef4444",
                margin: 0,
              }}>
                {error}
              </p>
            </div>
          )}

          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "10px 20px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 6,
                fontFamily: "var(--font-outfit)",
                fontSize: 14,
                color: "#808080",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: "10px 20px",
                background: saving ? "#404040" : "#E8651A",
                border: "none",
                borderRadius: 6,
                fontFamily: "var(--font-outfit)",
                fontSize: 14,
                fontWeight: 600,
                color: "#ffffff",
                cursor: saving ? "not-allowed" : "pointer",
              }}
            >
              {saving ? "Saving..." : mode === "add" ? "Add" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Form Field Component
function FormField({
  label,
  value,
  onChange,
  placeholder,
  required,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const Component = multiline ? "textarea" : "input";
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}</label>
      <Component
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          ...inputStyle,
          ...(multiline ? { minHeight: 100, resize: "vertical" as const } : {}),
        }}
      />
    </div>
  );
}

// Helper function for tier colors
function getTierColor(tier: SponsorTier): string {
  const colors: Record<SponsorTier, string> = {
    title: "#E8651A",
    platinum: "#6366f1",
    gold: "#eab308",
    silver: "#6b7280",
    bronze: "#b45309",
    partner: "#0ea5e9",
    media: "#8b5cf6",
  };
  return colors[tier] || "#6b7280";
}

// Styles
const thStyle: React.CSSProperties = {
  padding: "12px 16px",
  textAlign: "left",
  fontFamily: "var(--font-outfit)",
  fontSize: 12,
  fontWeight: 500,
  color: "#808080",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const tdStyle: React.CSSProperties = {
  padding: "12px 16px",
  fontFamily: "var(--font-outfit)",
  fontSize: 14,
  color: "#ffffff",
};

const actionBtnStyle: React.CSSProperties = {
  padding: "4px 12px",
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 4,
  fontFamily: "var(--font-outfit)",
  fontSize: 12,
  color: "#808080",
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-outfit)",
  fontSize: 12,
  fontWeight: 500,
  color: "#808080",
  marginBottom: 8,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  background: "#0A0A0A",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 6,
  fontFamily: "var(--font-outfit)",
  fontSize: 14,
  color: "#ffffff",
  outline: "none",
};
