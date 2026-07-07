import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function WithDrawForm() {
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
        debugger;
        try {
            const res = await axios.post("http://localhost:5000/withdraw-funds", {
                amount: Number(amount)
            });

            setBalance(res.data.balance);
            setAmount("");

            alert(res.data.message);

        } catch (err) {
            console.log(err);
            alert(err.response?.data?.message || "Failed to withdraw-funds");
        }
    };

    return (
        <div className="flex  bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-blue-100 p-8 shadow-md border border-gray-100">
                <div className="w-full border border-gray-100 rounded-2xl px-4 py-4 bg-white shadow-md"
                >
                    <p> WithDraw Form </p>
                    <form onSubmit={submit}>
                        <table border="1" cellPadding="10" className="mb-4">
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

                        <div className="col-span-full">
                            <label htmlFor="add-funds" className="block text-sm/6 font-medium text-gray-900">Funds want to withdraw</label>
                            <div className="mt-2">
                                <input className="form-control"
                                    type="number"
                                    placeholder="Enter Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6"> <button type="submit" className="btn btn-primary mx-2">Submit</button></div>
                    </form>
                </div>
            </div ></div>
    )
}