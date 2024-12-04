import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Tunnel from './Tunnel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tunnel" element={<Tunnel />} />
        <Route path="*" element={<p>Not Found</p>} />

      </Routes>
    </Router>
  );
}

export default App;
