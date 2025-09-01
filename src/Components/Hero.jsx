import React, { useContext } from 'react'
import { DetailsContext } from '../Context/DataContext'
import { Link } from 'react-router-dom';
const api = "http://localhost:4000";



const Hero = ({item}) => {
    // const heroItem = item.filter((val,i) => val.category == 'hero');
     const heroItem = item?.filter((val) => val.category === 'hero') || [];

  // Safely get image path
  const fixed_path = heroItem.length > 0 
    ? heroItem[0].hero.image.replace(/\\/g, "/") 
    : null;
  return (
    <div >
        {item && (
             <div style={{background: `url(${api}/${fixed_path}) rgba(0,0,0,0.3) center/cover no-repeat`, height: '80vh', backgroundPosition: 'center', backgroundSize: 'cover', width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: "5%", gap: '10px', alignItems: 'center', backgroundRepeat: 'no-repeat !important', textAlign: 'center'}} > 
             
             <h1 style={{fontSize: "50px", color: '#fff'}}>{heroItem[0] && heroItem[0].hero.title}</h1>
             <p style={{color: '#fff', fontWeight: '900'}}>{heroItem[0] && heroItem[0].hero.description}</p>
<button style={{background: heroItem[0].hero.btnBackgroundColor, width: 'fit-content', padding: "10px 20px", border: 0, margin: 0, boxShadow: '2px 3px 5px rgba(0,0,0,0.3)', borderRadius: '5px'}} className='bs'><Link to={heroItem[0].hero.buttonUrl} style={{color: '#fff', textDecoration: 'none'}}>{heroItem[0].hero.buttonName}</Link></button>
</div>
          
        )
        
        }
        
       
    </div>
  )
}

export default Hero
