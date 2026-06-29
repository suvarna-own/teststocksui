import React from "react";

export default function WithDrawForm(){
    return(
      <div className="border rounded border-gray  py-4 px-4 w-1/2 mt-4" 
      >
      <p> WithDraw Form </p>
      <input
                    className=" text-sm bg-white border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Username"
                    name="username"
                    
                    
                />

                <input
                    className=" text-sm bg-white border border-gray-300 rounded py-2 px-4 mb-2 mx-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount"
                    name="amount"
                 
                                    
                />

                <button className="btn btn-primary">Submit</button>
      </div>

    )
}