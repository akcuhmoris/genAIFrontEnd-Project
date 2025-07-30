// src/components/WebsiteLink.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function WebsiteLink() {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/website/url') // adjust backend URL if needed
      .then(res => setUrl(res.data.url))
      .catch(err => console.error('Error fetching URL:', err));
  }, []);

  return (
    <div className="mt-6">
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          View Your Generated Website
        </a>
      ) : (
        <p>Loading website link...</p>
      )}
    </div>
  );
}
