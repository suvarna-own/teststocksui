import React from "react"
import { useState } from "react";
import AddFundsForm from "./Funds/AddFundsForm";
import WithDrawForm from "./Funds/WithDrawForm";


export default function Funds() {
    const [showFund, setShowFund] = useState(false);
    const [showWithDraw, setShowWithDraw] = useState(false);

    return (
        <>
            <div class="data-table">
                <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">
                    Total Balance
                </h3>
                <p className="mt-2 text-4xl font-extrabold text-gray-900">
                    ₹5,240.00
                </p>
                <div className="btn-wrap">
                    <button className="btn btn-primary mx-2" onClick={() => setShowFund(!showFund)}> {showFund ? "Hide" : "Show"} + Add funds</button>
                    <button className="btn btn-primary" onClick={() => setShowWithDraw(!showWithDraw)}>{showWithDraw ? "Hide" : "Show"} Withdraw</button></div>
                {showFund && <AddFundsForm />}
                {showWithDraw && <WithDrawForm />}
                <table class="table"><tbody><tr><td><div>Available margin</div></td> <td><h1 class="value">
                    ••••</h1></td></tr> <tr><td>Used margin</td> <td><h1>••••</h1></td></tr> <tr class="seperator"><td>Available cash</td> <td><h1>••••</h1></td></tr> <tr><td>Opening balance</td> <td>••••</td></tr> <tr><td>Payin</td> <td>••••</td></tr> <tr><td>Payout</td> <td>••••</td></tr> <tr><td>SPAN</td> <td>••••</td></tr> <tr><td>Delivery margin</td> <td>
                        ••••
                    </td></tr> <tr><td>Exposure</td> <td>
                        ••••
                    </td></tr> <tr class="seperator"><td>Options premium</td> <td>
                        ••••
                    </td></tr> <tr><td>Collateral (Liquid funds)</td> <td>
                        ••••
                    </td></tr> <tr><td>Collateral (Equity)</td> <td>
                        ••••
                    </td></tr> <tr><td>Total collateral</td> <td>
                        ••••
                    </td></tr></tbody></table></div>
        </>
    );
}