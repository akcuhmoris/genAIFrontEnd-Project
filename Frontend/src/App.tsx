
import { useState } from 'react';
import PromptBar from './components/PromptBar';
import axios from 'axios';
import { useAuthStore } from './store/authStore';
import Login from "./components/Login";
import Title from './components/Title';
import Navbar from './components/Navbar';

function App() {
  document.title = 'Frontend Generator';

  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((s) => s.token);
  
  const handlePrompt = async (prompt: string) => {
  setLoading(true);
  setResponse(null);
  console.log('User entered:', prompt);

  try {
    if (!token) {
      setResponse('You must be logged in.');
      return;
    }

    const result = await axios.post(
      'http://localhost:3000/projects/upload-prompt',
      { prompt },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setResponse(result.data.message || 'Upload successful!');
  } catch (err: any) {
    console.error('S3 upload failed:', err);
    setResponse('Upload failed. Check console for details.');
  } finally {
    setLoading(false);
  }
};

  if(!token){
    return <Login />
  }
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Navbar onHistoryClick={() => {}} profileUrl={"/defaultuser.jpeg"}
        />

      {response && (
        <div className="bg-white rounded-xl shadow-md p-4 mb-4">
          <p>{response}</p>
        </div>
      )}
      <PromptBar onSubmit={handlePrompt} loading={loading} />

    </div>
  );
}

export default App;
