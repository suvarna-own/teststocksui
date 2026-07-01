import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import React from 'react'
import { useTheme } from "../context/ThemeContext";


function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className='flex justify-between'>
     <div><Nav variant='underline' defaultActiveKey='/dashboard'>
        {/* <Nav.Item>
        <Nav.Link as={NavLink} to='/overview' eventKey='link-1'>Overview</Nav.Link>
      </Nav.Item> */}

        <Nav.Item>
          <Nav.Link as={NavLink} to='company' eventKey='link-2'>Company</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to='watchlist' eventKey='link-1'>WatchList</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to='buy' eventKey='link-7'>Buy</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={NavLink} to='holdings' eventKey='link-3'>Holdings</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to='positions' eventKey='link-4'>Positions</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to='bids' eventKey='link-5'>Bids</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to='funds' eventKey='link-6'>Funds</Nav.Link>
        </Nav.Item>
      </Nav></div> 
     <div><button onClick={toggleTheme} className='mt-2'>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button></div> </div>
  );
}

export default Navbar;