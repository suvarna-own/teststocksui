import StockChart from "../StockChart"
import React from "react"
import StockChartLight from "../StockChartLight"
import StockDashboard from "./StockDashboard"
import CandleChart from "../CandleChart"
export default function Dashboard() {
    return (
        <>
            <h3>Dashboard Page</h3>
            <p>Chart</p>
             <CandleChart/>
            <StockDashboard></StockDashboard>
            <StockChart />
            <StockChartLight></StockChartLight>
           
            </>
            
    )
}