import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route
        path="*"
        element={
          <main>
            <h1>Something Went Wrong!</h1>
            <p>No routes match this path...</p>
          </main>
        }
      />
    </Routes>
  );
};

export default App;
