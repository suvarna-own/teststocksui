import React from "react";

export default function WithDrawForm() {
    return (
        <div className="flex  bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-blue-100 p-8 shadow-md border border-gray-100">
                <div className="w-full border border-gray-100 rounded-2xl px-4 py-4 bg-white shadow-md"
                >
                    <p> WithDraw Form </p>
                    <input
                        className=" text-sm bg-white border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Username"
                        name="username"


                    />

                    <input
                        className=" text-sm bg-white border border-gray-300 rounded py-2 px-4 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Amount"
                        name="amount"


                    />
                    <div className="mt-6 flex items-center justify-end gap-x-6"> <button className="btn btn-primary mx-2">Submit</button></div>

                </div>
            </div ></div>
    )
}