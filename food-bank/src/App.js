import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import OrderPage from './pages/OrderPage';
import DeliveryStatusPage from './pages/DeliveryStatusPage';
import MapPage from './pages/MapPage';
import InventoryPage from './pages/InventoryPage';
import CalendarPage from './pages/CalendarPage';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import { useState } from "react";
import PartnerInfo from './components/PartnerInfo';

const theme = extendTheme({
  colors: {
    orange: {
      500: "#FF7A00",
    },
  },
})

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formToShow, setFormToShow] = useState("login");
  const [userRole, setUserRole] = useState("partner");
  const handleFormSwitch = (formName) => {
    setFormToShow(formName);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null)
  };


  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        {!isLoggedIn && (
          <>
            {formToShow === "login" && (
              <Login onFormSwitch={handleFormSwitch} onLogin={handleLogin} />
            )}
            {formToShow === "register" && (
              <Register onFormSwitch={handleFormSwitch} />
            )}
          </>
        )}
      </div>

      {isLoggedIn && (
        <div>
          <NavBar userRole="partner" onLogout={handleLogout} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/order" component={OrderPage} />
            <Route path="/delivery-status" component={DeliveryStatusPage} />
            <Route path="/map" component={MapPage} />
            <Route path="/inventory" component={InventoryPage} />
            <Route path="/calendar" component={CalendarPage} />
          </Switch>
        </div>
      )}
      
    </ChakraProvider>
  );
}

export default App;
