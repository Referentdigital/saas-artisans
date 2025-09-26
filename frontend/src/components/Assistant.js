import React, { useState } from 'react';
import ScheduleForm from './ScheduleForm';

function Assistant() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Fermer la prise de RDV" : "Prendre un rendez-vous"}
      </button>
      {showForm && <ScheduleForm />}
    </div>
  );
}

export default Assistant;