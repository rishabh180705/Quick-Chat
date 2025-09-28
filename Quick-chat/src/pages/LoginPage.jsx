import React, { useState } from "react";


export default function LoginPage() {
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  function handleSubmit(e) {
    e.preventDefault();
    if (mode === "login") {
      console.log("Logging in with:", form);
    } else {
      console.log("Signing up with:", form);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
     
    >
      <div className="max-w-md w-full bg-white backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-800">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {mode === "login" ? "Login to continue" : "Sign up to get started"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-sm text-slate-600">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-slate-600">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:opacity-95"
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="text-center text-sm text-slate-500">
          {mode === "login" ? (
            <p>
              Don’t have an account? {" "}
              <button
                onClick={() => setMode("signup")}
                className="text-indigo-600 font-medium hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account? {" "}
              <button
                onClick={() => setMode("login")}
                className="text-indigo-600 font-medium hover:underline"
              >
                Login
              </button>
            </p>
          )}
        </div>

      

       
      </div>
    </div>
  );
}
