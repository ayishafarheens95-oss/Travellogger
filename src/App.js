import React, { useState } from "react";
import "./styles.css";

function App() {
  const [trips, setTrips] = useState([]);

  // Form state
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState("");

  // Add Trip
  const addTrip = () => {
    if (!title || !location || !startDate || !endDate) {
      alert("Please fill all required fields (Title, Location, Dates)");
      return;
    }

    const newTrip = {
      id: Date.now(),
      title,
      location,
      startDate,
      endDate,
      notes,
      rating,
    };

    setTrips([newTrip, ...trips]);

    // Clear fields
    setTitle("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setNotes("");
    setRating("");
  };

  // Delete Trip
  const deleteTrip = (id) => {
    setTrips(trips.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      {/* HEADER */}
      <div className="header">
        <div className="logo">✈️</div>
        <div>
          <div className="title">TravelLogger</div>
          <div className="subtitle">Log your trips and revisit beautiful memories.</div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid">
        {/* ---------- LEFT COLUMN: FORM ---------- */}
        <div className="card">
          <div className="form">

            <div>
              <label className="label">Title *</label>
              <input
                className="input"
                placeholder="e.g. Summer in Bali"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="label">Location *</label>
              <input
                className="input"
                placeholder="City, Country"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="date-pair">
              <div>
                <label className="label">Start Date *</label>
                <input
                  type="date"
                  className="input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <label className="label">End Date *</label>
                <input
                  type="date"
                  className="input"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="label">Notes</label>
              <textarea
                className="input"
                placeholder="Memories, places, tips..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div>
              <label className="label">Rating (1–5)</label>
              <input
                className="input"
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                style={{ width: "110px" }}
              />
            </div>

            <button className="btn" onClick={addTrip}>
              Add Trip
            </button>
          </div>
        </div>

        {/* ---------- RIGHT COLUMN: TRIP LIST ---------- */}
        <div className="card">
          <h3>Your Trips</h3>

          {trips.length === 0 ? (
            <div className="empty">No trips logged yet — add one above.</div>
          ) : (
            <div className="trip-list">
              {trips.map((trip) => (
                <div className="trip-item" key={trip.id}>
                  <div className="trip-main">
                    <div className="trip-title">
                      {trip.title} — <span className="chip">{trip.location}</span>
                    </div>
                    <div className="trip-meta">
                      {trip.startDate} → {trip.endDate}
                      {trip.rating && (
                        <> · ⭐ {trip.rating}/5</>
                      )}
                    </div>

                    {trip.notes && (
                      <div className="trip-notes">{trip.notes}</div>
                    )}
                  </div>

                  <div className="action-group">
                    <button className="delete-btn" onClick={() => deleteTrip(trip.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
