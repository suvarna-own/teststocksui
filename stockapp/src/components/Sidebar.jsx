// AppSidebar.jsx

import React ,{ useState }from "react";
import {
  CSidebar,
  CSidebarNav,
  CNavItem
} from "@coreui/react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [unfoldable, setUnfoldable] = useState(true)
  return (
    <CSidebar className="border-end h-100" unfoldable={unfoldable}>
      <CSidebarNav>
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

      </CSidebarNav>
    </CSidebar>
  );
};

export default Sidebar;