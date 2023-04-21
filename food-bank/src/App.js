import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import OrderPage from './pages/OrderPage';
import FeedbackPage from './pages/FeedbackPage';
import DeliveryStatusPage from './pages/DeliveryStatusPage';
import RatingPage from './pages/RatingPage';
import InventoryPage from './pages/InventoryPage';
import CalendarPage from './pages/CalendarPage';
import "./css/App.css";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/order" component={OrderPage} />
        <Route path="/feedback" component={FeedbackPage} />
        <Route path="/delivery-status" component={DeliveryStatusPage} />
        <Route path="/rating" component={RatingPage} />
        <Route path="/inventory" component={InventoryPage} />
        <Route path="/calendar" component={CalendarPage} />
      </Switch>
    </div>
  );
}

export default App;
