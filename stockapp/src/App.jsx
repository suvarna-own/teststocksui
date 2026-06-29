import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login';
import MainContainer from './components/MainContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/TabData/Dashboard';
import Orders from './components/TabData/Orders';
import Holdings from './components/TabData/Holdings';
import SampleWatchList1 from './components/TabData/SampleWatchList1';
import WatchList from './components/TabData/WatchList';
import CompanyTableData from './components/CompanyTableData';
import Basket from './components/Basket';
import Buy from './components/Buy';
import Funds from './components/Funds';
import About from './components/Header/About';
import Contact from './components/Header/Contact';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Navigate } from 'react-router-dom';
import AddFundsForm from './components/Funds/AddFundsForm';


function Placeholder({ title }) {
  return <div className="tab-page-placeholder">{title}</div>;
}

function App() {
  const isLoggedIn = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={isLoggedIn ? <MainContainer /> : <Navigate to="/login" />}>
          <Route index element={<Dashboard />} />
          <Route path="company" element={<CompanyTableData />} />
          <Route path="buy" element={<Buy />} />
          <Route path="watchlist" element={<WatchList />} />
          <Route path="holdings" element={<Holdings />} />
          <Route path="positions" element={<Placeholder title="Positions" />} />
          <Route path="bids" element={<Placeholder title="Bids" />} />
          <Route path="funds" element={<Funds />} />
          <Route path="basket" element={<Basket />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        {/* <Route path="*" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
