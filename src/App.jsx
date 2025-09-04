import React, { useContext } from 'react'
import Navbar from './Components/Navbar'
import Carousel from './Components/Carousel'
import { DetailsContext } from './Context/DataContext';
import { BrowserRouter } from 'react-router-dom';
import Hero from './Components/Hero';
import CouponFilter from './Components/Coupens';
import Footer from './Components/Footer';
import './index.css'
import BrowseStores from './Components/BrowseStores';
import TopOffersMarquee from './Components/TopOffersMarquee';
import TestimonialCarousel from './Components/TestimonialCarousel';
import GetInTouch from './Components/GetInTouch';
import StayUpdated from './Components/StayUpdated';
import JobBrowser from './Components/JobBrowser';





 
const App = () => {
  const details = useContext(DetailsContext);
   
 console.log(details);
  return (
    <div>
    
 
      <Carousel item={details.ads }/>
      <Hero item={details.ads}/>
      <CouponFilter coupons={details.coupons}/>
      
        <BrowseStores />
        <JobBrowser />
        <TopOffersMarquee/>
        <TestimonialCarousel />
        <GetInTouch />
        <StayUpdated />
   


    </div>
  )
}

export default App
