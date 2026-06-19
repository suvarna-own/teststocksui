import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import React from 'react'


function Navbar() {
  return (
    <Nav variant='underline' defaultActiveKey='/dashboard'>
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
    </Nav>
  );
}

export default Navbar;