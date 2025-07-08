<<<<<<< HEAD
import { useAuthStore } from "./store/authStore";
import Login from "./components/Login";
import { CodeEditor } from "./components/Editor";
import { GrapeEditor } from "./components/GrapeEditor";

export default function App() {
  const token = useAuthStore((s) => s.token);
=======
import react, { useState } from 'react';
import PromptBar from './components/PromptBar';
import axios from 'axios';

function App() {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePrompt = async (prompt: string) => {
    setLoading(true);
    console.log('User asked:', prompt);
>>>>>>> r-promptbar

  try {
    const apiKey = 'my key'; 

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const message = response.data.choices[0].message.content;
    setResponse(message);
  } catch (error) {
    console.error('API call error:', error);
    setResponse('Sorry, something went wrong with the API call.');
  } finally {
    setLoading(false);
  }
};

  return (
<<<<<<< HEAD
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Frontend Builder</h1>
      <CodeEditor value="<h1>Hello</h1>" onChange={(val) => console.log(val)} />
      <GrapeEditor />
=======
    <div className="min-h-screen pb-20 px-6 pt-6 bg-gray-100 text-gray-90">
      <h1 className=" text-2xl font-semibold mb-4">Frontend Generator</h1>

      {response && (
        <div className="bg-white rounded-xl shadow-md p-4 mb-4">
          <p>{response}</p>
        </div>
      )}
      <PromptBar onSubmit={handlePrompt} loading={loading} />
>>>>>>> r-promptbar
    </div>
  );
}

export default App;
