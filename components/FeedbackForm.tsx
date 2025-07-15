import React, { useState, useEffect } from 'react';

interface Area { id: number; name: string; }
interface FormData { name: string; email: string; area: string; comment: string; }

const FeedbackForm: React.FC = () => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [form, setForm] = useState<FormData>({ name: '', email: '', area: '', comment: '' });
  const [status, setStatus] = useState<string | null>(null);

  // Ná í svæði við mount
  useEffect(() => {
    fetch('/api/areas')
      .then(res => res.json())
      .then(data => setAreas(data))
      .catch(err => console.error('Error loading areas:', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('Takk fyrir ábendinguna!');
        setForm({ name: '', email: '', area: '', comment: '' });
      } else {
        setStatus('Villa við að senda. Reyndu aftur.');
      }
    } catch {
      setStatus('Netvilla. Reyndu seinna.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Senda inn athugasemd</h2>

      {/* ... Nafn og Netfang reitir fara hingað ... */}

      <label className="block mb-2">Svæði
        <select name="area" value={form.area} onChange={handleChange} className="w-full border p-2">
          <option value="">Veldu svæði</option>
          {areas.map(a => (
            <option key={a.id} value={a.name}>{a.name}</option>
          ))}
        </select>
      </label>

      {/* ... Athugasemd textabox ... */}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Senda</button>
      {status && <p className="mt-4">{status}</p>}
    </form>
  );
};

export default FeedbackForm;