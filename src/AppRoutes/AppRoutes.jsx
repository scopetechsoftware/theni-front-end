import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App.jsx";
import StoreDetail from "../pages/StoreDetail/StoreDetail.jsx";
import Store from "../pages/Store.jsx";
import Offer from "../pages/Offer.jsx";
import About from "../pages/AboutUs.jsx";
import Contact from "../pages/ContactUs.jsx";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import JobBrowser from "../Components/JobBrowser.jsx";


export default function AppRoutes() {
  return (
    <BrowserRouter>
    <Navbar />
  
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/storedetails/:id" element={<StoreDetail />} />
        <Route path="/store" element={<Store />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/jobs" element={<JobBrowser />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
