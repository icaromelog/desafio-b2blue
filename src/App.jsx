import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ColetaResiduos from './pages/ColetaResiduos';
import Layout from './components/Layout/Layout';

import './styles/global.scss';

function App() {
  return (
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<ColetaResiduos />} />
          </Routes>
        </Router>
      </Layout>
  );
}

export default App;