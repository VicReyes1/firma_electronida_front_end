import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Rutas from './routes/Routes';


function App() {
  return (
    <div className="App">
      <Router>
        <Rutas />
      </Router>

    </div>
  );
}

export default App;
 