import React, { useState } from 'react';

function ScheduleForm() {
  const [artisanId, setArtisanId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/assistant/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ artisanId, date, time, clientName, clientPhone }),
    });
    if (response.ok) {
      setMessage('Rendez-vous enregistré et SMS envoyé !');
      setArtisanId('');
      setDate('');
      setTime('');
      setClientName('');
      setClientPhone('');
    } else {
      setMessage('Erreur lors de la prise de rendez-vous.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="ID Artisan" value={artisanId} onChange={e => setArtisanId(e.target.value)} required />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <input type="time" value={time} onChange={e => setTime(e.target.value)} required />
      <input placeholder="Nom du client" value={clientName} onChange={e => setClientName(e.target.value)} required />
      <input placeholder="Téléphone du client" value={clientPhone} onChange={e => setClientPhone(e.target.value)} required />
      <button type="submit">Valider RDV</button>
      <div>{message}</div>
    </form>
  );
}

export default ScheduleForm;