// src/components/TripList.jsx
import React, {useEffect, useState} from 'react';
import api from '../api';

export default function TripList(){
  const [trips,setTrips] = useState([]);
  const [loading,setLoading] = useState(true);

  const fetchTrips = async () => {
    setLoading(true);
    try{
      const res = await api.get('/api/trips');
      setTrips(res.data);
    }catch(err){
      console.error(err);
      alert('Could not load trips — is the backend running?');
    }finally{ setLoading(false); }
  };

  const deleteTrip = async (id) => {
    if(!window.confirm('Delete this trip?')) return;
    try{
      await api.delete(`/api/trips/${id}`);
      fetchTrips();
    }catch(err){
      console.error(err);
    }
  };

  useEffect(()=> {
    fetchTrips();
    const handler = ()=> fetchTrips();
    window.addEventListener('tripAdded', handler);
    return ()=> window.removeEventListener('tripAdded', handler);
  },[]);

  return (
    <div className="card">
      <h3 style={{marginBottom:8}}>Trips</h3>
      {loading ? <p className="small">Loading trips…</p> : (
        trips.length === 0 ? (
          <div className="empty">No trips logged yet — add one on the left.</div>
        ) : (
          <div className="trip-list">
            {trips.map(t => (
              <div key={t._id} className="trip-item">
                <div className="trip-main">
                  <div className="trip-title">{t.title}</div>
                  <div className="trip-meta">{t.location} • {t.startDate ? new Date(t.startDate).toLocaleDateString() : ''}{t.endDate ? ` → ${new Date(t.endDate).toLocaleDateString()}` : ''}{t.rating ? ` • ${t.rating}/5` : ''}</div>
                  {t.notes && <div className="trip-notes">{t.notes}</div>}
                </div>
                <div className="action-group">
                  <button className="delete-btn" onClick={()=>deleteTrip(t._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
