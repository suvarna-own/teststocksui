import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AddFundsForm() {

    const [id, setId] = useState(0);
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState("");

    const [Form, setForm] = useState({
        id: "",
        amount: ""
    });

    useEffect(() => {
        setAmount("");
        loadBalance();
    }, []);

    const loadBalance = async () => {
        const res = await axios.get("http://localhost:5000/balance");

        setId(res.data.id);
        setBalance(res.data.balance);
    };

    const submit = async (e) => {
    e.preventDefault();

    try {
        const res = await axios.post("http://localhost:5000/add-funds", {
            amount: Number(amount)
        });

        setBalance(res.data.balance);
        setAmount("");

        alert(res.data.message);

    } catch (err) {
        console.log(err);
        alert(err.response?.data?.message || "Failed to add funds");
    }
};

    return (
        
        <div className="flex  bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-blue-100 p-8 shadow-md border border-gray-100">
                <div className="w-full border border-gray-100 rounded-2xl px-4 py-4 bg-white shadow-md">
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Add Funds
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Securely add money to your wallet balance
                    </p>
                    <form onSubmit={submit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <table border="1" cellPadding="10">
                                    <thead>
                                        <tr>
                                            <th width="100">ID</th>
                                            <th>Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr key={id}>
                                            <td>{id}</td>
                                            <td>{balance}</td>
                                        </tr>

                                    </tbody>
                                </table>


                                <div className="border-b border-gray-900/10 pb-12">

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="col-span-full">
                                            <label htmlFor="add-funds" className="block text-sm/6 font-medium text-gray-900">Funds want to add</label>
                                            <div className="mt-2">
                                                <input className="form-control"
                                                    type="number"
                                                    placeholder="Enter Amount"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="btn btn-primary text-sm/6 font-semibold text-gray-900">Cancel</button>
                            <button type="submit" className="btn btn-primary rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
