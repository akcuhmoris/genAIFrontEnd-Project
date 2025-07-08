import { useAuthStore } from "./store/authStore";
import Login from "./components/Login";
import { CodeEditor } from "./components/Editor";
import { GrapeEditor } from "./components/GrapeEditor";

export default function App() {
  const token = useAuthStore((s) => s.token);

  if (!token) {
    return <Login />;
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Frontend Builder</h1>
      <CodeEditor value="<h1>Hello</h1>" onChange={(val) => console.log(val)} />
      <GrapeEditor />
    </div>
  );
}
