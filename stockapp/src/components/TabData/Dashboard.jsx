import StockChart from "../StockChart"
import React from "react"
import StockChartLight from "../StockChartLight"
import StockDashboard from "./StockDashboard"
import CandleChart from "../CandleChart"
import DbTest from "../DbTest"
export default function Dashboard() {
    return (
        <>
            <h2 className="bg-red-300 w-100 py-2 px-2 border-2xl rounded">Dashboard Page</h2>
            
            <h3>Market Overview</h3>
            <StockChart />

            
            <DbTest></DbTest>
            <CandleChart/>
            <StockDashboard></StockDashboard>
            
            <StockChartLight></StockChartLight>
           
            </>
            
    )
}