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
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((s) => s.token);
  
  const handlePrompt = async (prompt: string) => {
    setLoading(true);
    setResponse(null);
    setGeneratedUrl(null); // clear previous URL

    try {
      if (!token) {
        setResponse('You must be logged in.');
        return;
      }

      // Step 1: Upload prompt to S3
      const uploadRes = await axios.post(
        'http://localhost:3000/projects/upload-prompt',
        { prompt },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponse(uploadRes.data.message || 'Upload successful!');

      // Step 2: Call /generate to run Python + upload HTML
      const generateRes = await axios.post('http://localhost:3000/generate', {
        key: 'prompts/first.txt', // Customize per user if needed
      });

      setGeneratedUrl(generateRes.data.url);
    } catch (err: any) {
      console.error('❌ Error:', err);
      setResponse('Something went wrong. Check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <Login />;
  }


  return (
    <div className="min-h-screen pb-20 px-6 pt-6 bg-gray-100 text-gray-90">
      <Title />
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Navbar onHistoryClick={() => {}} profileUrl={"/defaultuser.jpeg"}
        />


      {response && (
        <div className="bg-white rounded-xl shadow-md p-4 mb-4">
          <p>{response}</p>
        </div>
      )}

      <PromptBar onSubmit={handlePrompt} loading={loading} />

      {loading && <p className="mt-4 text-gray-500">⏳ Generating your website...</p>}

      {generatedUrl && (
        <div className="mt-6">
          <a
            href={generatedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            🌐 View Your Generated Website
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
