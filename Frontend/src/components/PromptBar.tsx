import React, { useState } from 'react';

interface PromptBarProps {
  onSubmit: (prompt: string) => void;
  loading?: boolean;
}

const PromptBar: React.FC<PromptBarProps> = ({ onSubmit, loading = false }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit(prompt.trim());
    setPrompt('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 right-0 bg-white px-4 py-3 border-t border-gray-200 flex items-center gap-2 z-50"
    >
      <textarea
        rows={1}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask anything..."
        className="flex-1 resize-none rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? '...' : 'Send ➤'}
      </button>
    </form>
  );
};

export default PromptBar;
