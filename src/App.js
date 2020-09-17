import React, { useState } from "react";
import "./App.css";
import Albums from "./components/Albums";
import AdminPanel from "./components/AdminPanel";

const views = {
  ALBUMS: "ALBUMS",
  ADMIN: "ADMIN",
};

function App() {
  const [view, setView] = useState(views.ALBUMS);


  return (
    <div>
      <header>
        <nav>
          <button
           className={`nav-button ${view === views.ALBUMS ? "active" : ""}`} 
           onClick={() => setView(views.ALBUMS)}
          >
            Albums
          </button>
          <button 
            className={`nav-button ${view === views.ADMIN ? "active" : ""}`} 
            onClick={() => setView(views.ADMIN)}
          >
            Admin
          </button>
        </nav>
      </header>
      <main>
        {view === views.ALBUMS && <Albums />}
        {view === views.ADMIN && <AdminPanel />}
      </main>
    </div>
  );
}

export default App;
