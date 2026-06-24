// AppSidebar.jsx

import React, { useState } from "react";
import Logo from '../images/logo.png'
import {
  CSidebar,
  CSidebarNav,
  CNavItem
} from "@coreui/react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [unfoldable, setUnfoldable] = useState(true)
  return (
    <CSidebar className="border-end h-dvh">
      <CSidebarNav className="h-dvh">
        <CNavItem>
          <NavLink
            to="/dashboard"
            className="nav-link"
          >
            <img 
             src={Logo} alt="logo"
             className="w-50 h-50 items-center"/>
          </NavLink>
        </CNavItem>
        <CNavItem>
          <NavLink
            to="/dashboard"
            className="nav-link"
          >
            Dashboard
          </NavLink>
        </CNavItem>

        <CNavItem>
          <NavLink
            to="/dashboard/watchlist"
            className="nav-link"
          >
            Watchlist
          </NavLink>
        </CNavItem>

        <CNavItem>
          <NavLink
            to="/dashboard/basket"
            className="nav-link"
          >
            Basket
          </NavLink>
        </CNavItem>
        <CNavItem>
          <NavLink
            to="/dashboard/about"
            className="nav-link"
          >
            About Us
          </NavLink>
        </CNavItem>
        <CNavItem>
          <NavLink
            to="/dashboard/contact"
            className="nav-link"
          >
            Contact
          </NavLink>
        </CNavItem>

      </CSidebarNav>
    </CSidebar>
  );
};

export default Sidebar;