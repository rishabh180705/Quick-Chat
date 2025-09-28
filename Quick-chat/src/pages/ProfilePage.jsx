import React, { useState } from "react";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Rishabh Singh",
    email: "rishabh@example.com",
    phone: "+91 98765 43210",
    bio: "Building cool things with React & Node.js",
    avatar: "https://i.pravatar.cc/150?img=47",
  });

  const [form, setForm] = useState(user);

  function handleSave(e) {
    e.preventDefault();
    setUser(form);
    setEditing(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-10 px-4">
      <div className="max-w-2xl w-full bg-white border border-slate-200 rounded-2xl shadow p-8 space-y-6">
        <div className="flex items-center gap-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-24 w-24 rounded-full object-cover border border-slate-200"
          />
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">{user.name}</h1>
            <p className="text-slate-500 text-sm">{user.email}</p>
          </div>
        </div>

        {!editing ? (
          <>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-500">Phone</label>
                <p className="font-medium text-slate-700">{user.phone}</p>
              </div>
              <div>
                <label className="text-sm text-slate-500">Bio</label>
                <p className="font-medium text-slate-700">{user.bio}</p>
              </div>
            </div>

            <button
              onClick={() => setEditing(true)}
              className="mt-6 px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:opacity-95"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-600">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600">Bio</label>
              <textarea
                value={form.bio}
                onChange={e => setForm({ ...form, bio: e.target.value })}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:opacity-95"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-5 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
