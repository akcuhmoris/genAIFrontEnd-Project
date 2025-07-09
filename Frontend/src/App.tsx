
import { useState } from 'react';
import PromptBar from './components/PromptBar';
import axios from 'axios';
import { useAuthStore } from './store/authStore';
import Login from "./components/Login";
import Title from './components/Title';

function App() {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((s) => s.token);

  const handlePrompt = async (prompt: string) => {
    setLoading(true);
    console.log('User asked:', prompt);


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
    setResponse('API call is not created yet. This is just a generated response 😁');
  } finally {
    setLoading(false);
  }
};
  if(!token){
    return <Login />
  }
    return (
    <div className="min-h-screen pb-20 px-6 pt-6 bg-gray-100 text-gray-90">
      <Title />

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
