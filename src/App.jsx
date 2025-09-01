import React, { useContext } from 'react'
import Navbar from './Components/Navbar'
import Carousel from './Components/Carousel'
import { DetailsContext } from './Context/DataContext';
import { BrowserRouter } from 'react-router-dom';
import Hero from './Components/Hero';
import CouponFilter from './Components/Coupens';




 
const App = () => {
  const details = useContext(DetailsContext);
   
 console.log(details);
  return (
    <div>
    
      <Navbar/>
      <Carousel item={details.ads }/>
      <Hero item={details.ads}/>
      <CouponFilter coupons={details.coupons}/>

    </div>
  )
}

export default App
