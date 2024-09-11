import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import AdvertisementsPage from "./pages/AdvertisementsPage";
import OrdersPage from "./pages/OrdersPage";
import AdvertisementItem from "./pages/AdvertisementItem";

const App: React.FC = () => {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/advertisements" element={<AdvertisementsPage />} />
                <Route path="/advertisements/:id" element={<AdvertisementItem />} />
                <Route path="/orders" element={<OrdersPage />} />
            </Routes>
        </Router>
    );
};

export default App;
