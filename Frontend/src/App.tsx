// import { useState } from "react";
// import { CodeEditor } from "./components/Editor";
// import { GrapeEditor } from "./components/GrapeEditor";
import { useAuthStore } from "./store/authStore";
import Login from "./components/Login";


export default function App() {
  // const [code, setCode] = useState("<h1>Hello World</h1>");
  const token = useAuthStore((s) => s.token);

  if (!token) {
    return <Login />;
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Frontend Builder</h1>
      
    </div>
  );
}
