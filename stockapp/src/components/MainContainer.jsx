import React from 'react'
// import Dashboard from './Dashboard'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import TableData from './TableData'
import Navbar from './Navbar'
import MyOffCanvas from './MyOffCanvas'
import CompanyTableData from './CompanyTableData'
import SymbolData from './SymbolData'
import Sidebar from './SideBar'

export default function MainContainer() {
  return (
    <div className='mainWrapper flex'>
       
       <Sidebar />
      <div className="flex-1 px-7 font-semibold text-2xl maincontainer">
       
        <Header />
        <Navbar />
        {/* <div className="show-canvas text-right">{['top'].map((placement, idx) => (
          <MyOffCanvas key={idx} placement={placement} name={placement} />
        ))}</div> */}
        <Outlet />
        {/* <TableData />
        <CompanyTableData />
        <SymbolData /> */}
        {/* <Dashboard /> */}
      </div></div>
  )
}
