import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AddFundsForm() {

    const [price, setPrice] = useState([]);


    const [form, setForm] = useState({
        username: "",
        price: ""
    });

    useEffect(() => {
        loadPrice();
    }, []);

    const loadPrice = async () => {
        const res = await axios.get("http://localhost:5000/fund");
        setPrice(res.data);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const submit = async (e) => {

        e.preventDefault();

        await axios.post(
            "http://localhost:5000/fund",
            form
        );

        setForm({
            price: ""

        });

        loadPrice();
    };
    return (
        <div classNameName="flex min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div classNameName="w-full max-w-md space-y-8 rounded-2xl bg-blue-100 p-8 shadow-md border border-gray-100">
                <div className="w-1/2 border border-gray-100 rounded-2xl px-4 py-4 my-4">
                    <h2 classNameName="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Add Funds
                    </h2>
                    <p classNameName="mt-2 text-center text-sm text-gray-600">
                        Securely add money to your wallet balance
                    </p>
                    <form onSubmit={submit}>

                        <div className="space-y-12">

                            <div className="border-b border-gray-900/10 pb-12">
                                <table border="1" cellPadding="10">

                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {price.map((p) => (

                                            <tr key={p.id}>

                                                <td>{p.id}</td>
                                                <td>{p.name}</td>
                                                <td>{p.price}</td>
                                               

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>
                                {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                   <div className="sm:col-span-4">
                                        <label for="username" className="block text-sm/6 font-medium text-gray-900">Username</label>
                                        <div className="mt-2">
                                            <div className="flex items-center rounded-md bg-blue-100 pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">Suvarna</div>
                                                <input id="username" type="text" name="username" placeholder="Suvarna" className="block min-w-0 grow bg-blue-100 py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="border-b border-gray-900/10 pb-12">

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        {/* <div className="sm:col-span-3">
                                            <label for="first-name" className="block text-sm/6 font-medium text-gray-900">First name</label>
                                            <div className="mt-2">
                                                <input id="first-name" type="text" name="first-name" autocomplete="given-name" className="block w-full rounded-md bg-blue-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label for="last-name" className="block text-sm/6 font-medium text-gray-900">Last name</label>
                                            <div className="mt-2">
                                                <input id="last-name" type="text" name="last-name" autocomplete="family-name" className="block w-full rounded-md bg-blue-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label for="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                                            <div className="mt-2">
                                                <input id="email" type="email" name="email" autocomplete="email" className="block w-full rounded-md bg-blue-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label for="country" className="block text-sm/6 font-medium text-gray-900">Country</label>
                                            <div className="mt-2 grid grid-cols-1">
                                                <select id="country" name="country" autocomplete="country-name" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-blue-100 py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                                    <option>United States</option>
                                                    <option>Canada</option>
                                                    <option>Mexico</option>
                                                </select>
                                                <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
                                                    <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label for="street-address" className="block text-sm/6 font-medium text-gray-900">Street address</label>
                                            <div className="mt-2">
                                                <input id="street-address" type="text" name="street-address" autocomplete="street-address" className="block w-full rounded-md bg-blue-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label for="city" className="block text-sm/6 font-medium text-gray-900">City</label>
                                            <div className="mt-2">
                                                <input id="city" type="text" name="city" autocomplete="address-level2" className="block w-full rounded-md bg-blue-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label for="region" className="block text-sm/6 font-medium text-gray-900">State / Province</label>
                                            <div className="mt-2">
                                                <input id="region" type="text" name="region" autocomplete="address-level1" className="block w-full rounded-md bg-blue-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label for="postal-code" className="block text-sm/6 font-medium text-gray-900">ZIP / Postal code</label>
                                            <div className="mt-2">
                                                <input id="postal-code" type="text" name="postal-code" autocomplete="postal-code" className="block w-full rounded-md bg-blue-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                            </div>
                                        </div> */}
                                        <div className="col-span-full">
                                            <label for="add-funds" className="block text-sm/6 font-medium text-gray-900">Funds want to add</label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="username"
                                                    placeholder="username"
                                                    value={form.username}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mt-2">
                                                <input
                                                    type="number"
                                                    name="price"
                                                    placeholder="Price"
                                                    value={form.price}
                                                    onChange={handleChange}
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
