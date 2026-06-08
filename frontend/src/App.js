import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import CustomerDashboard from './screens/CustomerDashboard';
import ProviderDashboard from './screens/ProviderDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/customer" element={<CustomerDashboard />} />
        <Route exact path="/provider" element={<ProviderDashboard />} />
      </Routes>
    </Router>
  );
}
export default App;