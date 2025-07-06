import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { login } from "../api/apiClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useAuthStore((s) => s.setToken);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await login(email, password);
      setToken(res.access_token);
    } catch {
      setError("Invalid credentials");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-10">
      <h2 className="text-xl font-bold">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="border p-2 w-full"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}
