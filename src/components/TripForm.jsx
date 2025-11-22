// src/components/TripForm.jsx
import React, { useState } from 'react';
import api from '../api';

const initial = { title: '', location: '', startDate: '', endDate: '', notes: '', rating: '' };

export default function TripForm(){
  const [form,setForm] = useState(initial);
  const [loading,setLoading] = useState(false);

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try{
      const payload = {
        title: form.title.trim(),
        location: form.location.trim(),
        startDate: form.startDate || undefined,
        endDate: form.endDate || undefined,
        notes: form.notes || undefined,
        rating: form.rating ? Number(form.rating) : undefined
      };
      await api.post('/api/trips', payload);
      setForm(initial);
      window.dispatchEvent(new Event('tripAdded'));
    }catch(err){
      console.error(err);
      alert('Could not add trip — check console for details');
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3 style={{marginBottom:8}}>Add a Trip</h3>
      <p className="small" style={{marginBottom:14}}>Quickly jot down a trip — start date required.</p>

      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label className="label">Title</label>
          <input className="input" name="title" placeholder="e.g., Summer in Bali" value={form.title} onChange={handleChange} required />
        </div>

        <div>
          <label className="label">Location</label>
          <input className="input" name="location" placeholder="City, Country" value={form.location} onChange={handleChange} required />
        </div>

        <div className="form-row date-pair">
          <div style={{flex:1}}>
            <label className="label">Start Date</label>
            <input className="input" type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
          </div>
          <div style={{width:150}}>
            <label className="label">End Date</label>
            <input className="input" type="date" name="endDate" value={form.endDate} onChange={handleChange} />
          </div>
        </div>

        <div>
          <label className="label">Notes</label>
          <textarea className="input" name="notes" placeholder="Memories, tips..." value={form.notes} onChange={handleChange} />
        </div>

        <div style={{display:'flex',gap:12, alignItems:'flex-end'}}>
          <div style={{minWidth:120}}>
            <label className="label">Rating</label>
            <input className="input" type="number" name="rating" min="1" max="5" value={form.rating} onChange={handleChange} />
          </div>

          <div style={{marginLeft:'auto'}}>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? 'Saving…' : 'Add Trip'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
