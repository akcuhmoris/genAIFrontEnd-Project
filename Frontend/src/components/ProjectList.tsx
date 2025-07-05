import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { getProjects } from "../api/apiClient";

export function ProjectList() {
  const token = useAuthStore((s) => s.token);
  const [projects, setProjects] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      setError("");
      try {
        const data = await getProjects(token!);
        setProjects(data);
      } catch (err) {
        setError("Failed to load projects");
      }
    }

    fetchProjects();
  }, [token]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Your Projects</h2>
      {error && <div className="text-red-500">{error}</div>}
      <ul className="space-y-2">
        {projects.map((p) => (
          <li key={p.id} className="border p-2 rounded">
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-600">{p.codeUrl}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
