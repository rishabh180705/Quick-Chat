

import React, { useState, useEffect, useRef } from "react";

 function HomePage() {
  const [conversations, setConversations] = useState(sampleConversations);
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [query, setQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [activeId, conversations]);

  function scrollToBottom() {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }

  function selectConversation(id) {
    setActiveId(id);
    setMobileOpen(false);
  }

  function sendMessage(e) {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setConversations(prev =>
      prev.map(conv =>
        conv.id === activeId
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                { id: Date.now(), from: "me", text: newMessage, time: new Date().toLocaleTimeString() },
              ],
              lastMessage: newMessage,
              updatedAt: new Date().toISOString(),
            }
          : conv
      )
    );
    setNewMessage("");
  }

  const activeConv = conversations.find(c => c.id === activeId) || conversations[0];
  const filtered = conversations.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white/60 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-md hover:bg-slate-100"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="toggle sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <h1 className="text-lg font-semibold">Chatter</h1>
            <p className="text-sm text-slate-500">Connect with your friends</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search people, messages..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="hidden md:inline-block w-64 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <button className="p-2 rounded-md hover:bg-slate-100" title="New chat">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              <img src="https://ui-avatars.com/api/?name=You" alt="you" className="h-9 w-9 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar - conversations list */}
        <aside className={`md:col-span-1 bg-white border border-slate-200 rounded-xl overflow-hidden ${mobileOpen ? "absolute inset-0 z-30" : ""}`}>
          <div className="p-4 border-b border-slate-100 flex items-center gap-3">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none"
            />
            <button className="p-2 rounded-md hover:bg-slate-50" onClick={() => setConversations(sampleConversations)} title="Reset sample">
              ↺
            </button>
          </div>

          <div className="divide-y divide-slate-100 max-h-[60vh] overflow-auto">
            {filtered.map(conv => (
              <div
                key={conv.id}
                onClick={() => selectConversation(conv.id)}
                className={`p-4 flex items-start gap-3 cursor-pointer hover:bg-slate-50 ${conv.id === activeId ? "bg-indigo-50 border-l-4 border-indigo-400" : ""}`}
              >
                <img src={conv.avatar} alt={conv.name} className="h-12 w-12 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{conv.name}</h3>
                    <span className="text-xs text-slate-400">{timeAgo(conv.updatedAt)}</span>
                  </div>
                  <p className="text-sm text-slate-500 truncate">{conv.lastMessage}</p>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="p-6 text-center text-slate-400">No conversations found</div>
            )}
          </div>
        </aside>

        {/* Main chat area */}
        <section className="md:col-span-2 bg-white border border-slate-200 rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center gap-4">
            <img src={activeConv.avatar} alt="active" className="h-10 w-10 rounded-full" />
            <div>
              <div className="text-sm font-medium">{activeConv.name}</div>
              <div className="text-xs text-slate-500">{activeConv.subtitle}</div>
            </div>

            <div className="ml-auto flex items-center gap-3 text-slate-500">
              <button className="p-2 rounded-md hover:bg-slate-50" title="Call">
                📞
              </button>
              <button className="p-2 rounded-md hover:bg-slate-50" title="More">
                ⋯
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6 space-y-4 bg-gradient-to-b from-white to-slate-50">
            {activeConv.messages.map(msg => (
              <div key={msg.id} className={`max-w-xl ${msg.from === "me" ? "ml-auto text-right" : ""}`}>
                <div className={`inline-block px-4 py-2 rounded-2xl shadow-sm ${msg.from === "me" ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-800"}`}>
                  <div className="text-sm">{msg.text}</div>
                  <div className="text-[10px] text-slate-300 mt-1">{msg.time}</div>
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="p-4 border-t border-slate-100 flex items-center gap-3">
            <button type="button" className="p-2 rounded-md hover:bg-slate-50" title="Attach">
              📎
            </button>
            <input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder={`Message ${activeConv.name}...`}
              className="flex-1 px-3 py-2 rounded-full border border-slate-200 focus:outline-none"
            />
            <button className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium hover:opacity-95">Send</button>
          </form>
        </section>
      </main>

      {/* small footer */}
      <div className="text-center text-xs text-slate-400 py-6">Built with ♥ — replace with your real backend & socket events</div>
    </div>
  );
}

// ---------- helpers & sample data below ----------

function timeAgo(iso) {
  if (!iso) return "";
  const then = new Date(iso);
  const diff = Math.floor((Date.now() - then.getTime()) / 1000);
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

const sampleConversations = [
  {
    id: "c1",
    name: "Aisha Khan",
    avatar: "https://i.pravatar.cc/150?img=32",
    subtitle: "Last seen 2h ago",
    lastMessage: "I'll send the notes tonight.",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    messages: [
      { id: 1, from: "her", text: "Hey! are we meeting today?", time: "10:12 AM" },
      { id: 2, from: "me", text: "Yes, at 5pm — see you then.", time: "10:14 AM" },
    ],
  },
  {
    id: "c2",
    name: "Dev Team",
    avatar: "https://i.pravatar.cc/150?img=12",
    subtitle: "3 members",
    lastMessage: "Deployed to staging.",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    messages: [
      { id: 11, from: "them", text: "Deployed to staging. Please test.", time: "Yesterday" },
      { id: 12, from: "me", text: "Working on it now.", time: "Yesterday" },
    ],
  },
  {
    id: "c3",
    name: "Mom",
    avatar: "https://i.pravatar.cc/150?img=8",
    subtitle: "Family",
    lastMessage: "Call me when you're free.",
    updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    messages: [
      { id: 21, from: "her", text: "Call me when you're free.", time: "Just now" },
    ],
  },
];


export default HomePage;