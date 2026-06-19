import React from 'react'
function Basket() {
    return (
        <>
            {/* <table className="table-auto">
                <thead>
                    <tr>
                        <th>Song</th>
                        <th>Artist</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                        <td>Malcolm Lockyer</td>
                        <td>1961</td>
                    </tr>
                    <tr>
                        <td>Witchy Woman</td>
                        <td>The Eagles</td>
                        <td>1972</td>
                    </tr>
                    <tr>
                        <td>Shining Star</td>
                        <td>Earth, Wind, and Fire</td>
                        <td>1975</td>
                    </tr>
                </tbody>
            </table> */}
            <main className="w-full bg-blue-50">
                <div className="w-full  px-4 mx-auto py-24">

                    <div className="flex flex-col break-words w-full mb-6 shadow-lg rounded bg-white">
                        <header className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap justify-between items-center">
                                <h1 className="font-semibold text-2xl text-zinc-700 mr-2">
                                    Direct invitee
                                </h1>
                            </div>
                        </header>
                        <header className="block w-full px-4">
                            <div className="hidden lg:flex justify-between items-center text-center pb-2 px-1 gap-4 text-sm font-bold leading-6 rounded-lg border-b border-purple-600 text-slate-600">
                                <div className="w-full">Level</div>
                                <div className="w-full">Invite need more</div>
                                <div className="w-full">Min</div>
                                <div className="w-full">Max</div>
                                <div className="w-full">Claimable Amount</div>
                                <div className="w-full">Discount</div>
                                <div className="w-full">commission</div>
                            </div>
                        </header>
                        <div className="px-4 py-5">
                            <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-1 py-5 lg:py-2 border-b lg:border-0">
                                <div className="inline-flex w-full lg:justify-center">
                                    <span className="h-[80px] w-full max-w-[80px] lg:w-[80px] rounded-[16.2909px] transition-all bg-zinc-200 text-zinc-500 flex items-center justify-center">
                                        <iconify-icon icon="fluent-emoji-high-contrast:rat" width="40" height="40"></iconify-icon>
                                    </span>
                                    <div className="flex ml-4 lg:hidden text-zinc-500 bg-slate-100 h-[80px] w-full items-center justify-between lg:justify-center p-2 rounded">
                                        <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Invite need more:</h2>
                                        <p>20</p>
                                    </div>
                                </div>
                                <div className="hidden text-zinc-500 bg-slate-100 h-[80px] w-full lg:flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Invite need more</h2>
                                    <p>20</p>
                                </div>
                                <div className="w-full flex items-center gap-4 lg:hidden">
                                    <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                        <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Min</h2>
                                        <p>1 $</p>
                                    </div>
                                    <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                        <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Max</h2>
                                        <p>20 $</p>
                                    </div>
                                </div>
                                <div className="hidden text-zinc-500 bg-slate-100 h-[80px] w-full lg:flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Min</h2>
                                    <p>1 $</p>
                                </div>
                                <div className="hidden text-zinc-500 bg-slate-100 h-[80px] w-full lg:flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Max</h2>
                                    <p>20 $</p>
                                </div>
                                <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Claimable Amount</h2>
                                    <p>15 $</p>
                                </div>
                                <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Discount</h2>
                                    <div className="w-full text-right lg:text-center">
                                        <p>60%</p>
                                        <div className="relative w-full">
                                            <div className="overflow-hidden h-2 text-xs flex rounded bg-zinc-200">
                                                <div  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-zinc-500">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden">Commission</h2>
                                    <p>10 $</p>
                                </div>
                            </section>
                            <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-1 py-5 lg:py-2 border-b lg:border-0">

                                <div className="inline-flex w-full lg:justify-center">
                                    <span className="h-[80px] w-full max-w-[80px] lg:w-[80px] rounded-[16.2909px] transition-all bg-teal-200 text-teal-500 flex items-center justify-center">
                                        <iconify-icon icon="fluent-emoji-high-contrast:eagle" width="40" height="40"></iconify-icon>
                                    </span>
                                    <div className="flex ml-4 lg:hidden text-zinc-500 bg-slate-100 h-[80px] w-full items-center justify-between lg:justify-center p-2 rounded">
                                        <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Invite need more:</h2>
                                        <p>20</p>
                                    </div>
                                </div>
                                <div className="hidden text-zinc-500 bg-slate-100 h-[80px] w-full lg:flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Invite need more</h2>
                                    <p>20</p>
                                </div>
                                <div className="w-full flex items-center gap-4 lg:hidden">
                                    <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                        <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Min</h2>
                                        <p>1 $</p>
                                    </div>
                                    <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                        <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Max</h2>
                                        <p>20 $</p>
                                    </div>
                                </div>
                                <div className="hidden text-zinc-500 bg-slate-100 h-[80px] w-full lg:flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Min</h2>
                                    <p>1 $</p>
                                </div>
                                <div className="hidden text-zinc-500 bg-slate-100 h-[80px] w-full lg:flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Max</h2>
                                    <p>20 $</p>
                                </div>
                                <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Claimable Amount</h2>
                                    <p>15 $</p>
                                </div>
                                <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Discount</h2>
                                    <div className="w-full text-right lg:text-center">
                                        <p>60%</p>
                                        <div className="relative w-full">
                                            <div className="overflow-hidden h-2 text-xs flex rounded bg-teal-200">
                                                <div  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden">Commission</h2>
                                    <p>10 $</p>
                                </div>
                            </section>
                            <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-1 py-5 lg:py-2 border-b lg:border-0">

                                <div className="inline-flex w-full lg:justify-center">
                                    <span className="h-[80px] w-full max-w-[80px] lg:w-[80px] rounded-[16.2909px] transition-all bg-purple-200 text-purple-500 flex items-center justify-center">
                                        <iconify-icon icon="mdi:firefox" width="40" height="40"></iconify-icon>
                                    </span>
                                    <div className="flex ml-4 lg:hidden text-zinc-500 bg-slate-100 h-[80px] w-full items-center justify-between lg:justify-center p-2 rounded">
                                        <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Invite need more:</h2>
                                        <p>20</p>
                                    </div>
                                </div>
                                <div className="hidden text-zinc-500 bg-slate-100 h-[80px] w-full lg:flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Invite need more</h2>
                                    <p>20</p>
                                </div>
                                <div className="w-full flex items-center gap-4 lg:hidden">
                                    <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                        <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Min</h2>
                                        <p>1 $</p>
                                    </div>
                                    <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                        <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Max</h2>
                                        <p>20 $</p>
                                    </div>
                                </div>
                                <div className="hidden text-zinc-500 bg-slate-100 h-[80px] w-full lg:flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Min</h2>
                                    <p>1 $</p>
                                </div>
                                <div className="hidden text-zinc-500 bg-slate-100 h-[80px] w-full lg:flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Max</h2>
                                    <p>20 $</p>
                                </div>
                                <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Claimable Amount</h2>
                                    <p>15 $</p>
                                </div>
                                <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Discount</h2>
                                    <div className="w-full text-right lg:text-center">
                                        <p>60%</p>
                                        <div className="relative w-full">
                                            <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
                                                <div  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden">Commission</h2>
                                    <p>10 $</p>
                                </div>
                            </section>
                            <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-1 py-5 lg:py-2 border-b lg:border-0">

                                <div className="inline-flex w-full lg:justify-center">
                                    <span className="h-[80px] w-full max-w-[80px] lg:w-[80px] rounded-[16.2909px] transition-all bg-red-200 text-red-500 flex items-center justify-center">
                                        <iconify-icon icon="fluent-emoji-high-contrast:wolf" width="40" height="40"></iconify-icon>
                                    </span>
                                    <div className="flex ml-4 lg:hidden text-zinc-500 bg-slate-100 h-[80px] w-full items-center justify-between lg:justify-center p-2 rounded">
                                        <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Invite need more:</h2>
                                        <p>20</p>
                                    </div>
                                </div>
                                <div className="hidden text-zinc-500 bg-slate-100 h-[80px] w-full lg:flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Invite need more</h2>
                                    <p>20</p>
                                </div>
                                <div className="w-full flex items-center gap-4 lg:hidden">
                                    <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                        <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Min</h2>
                                        <p>1 $</p>
                                    </div>
                                    <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                        <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Max</h2>
                                        <p>20 $</p>
                                    </div>
                                </div>
                                <div className="hidden text-zinc-500 bg-slate-100 h-[80px] w-full lg:flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Min</h2>
                                    <p>1 $</p>
                                </div>
                                <div className="hidden text-zinc-500 bg-slate-100 h-[80px] w-full lg:flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Max</h2>
                                    <p>20 $</p>
                                </div>
                                <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Claimable Amount</h2>
                                    <p>15 $</p>
                                </div>
                                <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Discount</h2>
                                    <div className="w-full text-right lg:text-center">
                                        <p>60%</p>
                                        <div className="relative w-full">
                                            <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                                                <div  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden">Commission</h2>
                                    <p>10 $</p>
                                </div>
                            </section>
                            <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-1 py-5 lg:py-2 border-b lg:border-0">

                                <div className="inline-flex w-full lg:justify-center">
                                    <span className="h-[80px] w-full max-w-[80px] lg:w-[80px] rounded-[16.2909px] transition-all bg-orange-200 text-orange-500 flex items-center justify-center">
                                        <iconify-icon icon="ph:butterfly-fill" width="40" height="40"></iconify-icon>
                                    </span>
                                    <div className="flex ml-4 lg:hidden text-zinc-500 bg-slate-100 h-[80px] w-full items-center justify-between lg:justify-center p-2 rounded">
                                        <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Invite need more:</h2>
                                        <p>20</p>
                                    </div>
                                </div>
                                <div className="hidden text-zinc-500 bg-slate-100 h-[80px] w-full lg:flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Invite need more</h2>
                                    <p>20</p>
                                </div>
                                <div className="w-full flex items-center gap-4 lg:hidden">
                                    <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                        <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Min</h2>
                                        <p>1 $</p>
                                    </div>
                                    <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                        <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Max</h2>
                                        <p>20 $</p>
                                    </div>
                                </div>
                                <div className="hidden text-zinc-500 bg-slate-100 h-[80px] w-full lg:flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Min</h2>
                                    <p>1 $</p>
                                </div>
                                <div className="hidden text-zinc-500 bg-slate-100 h-[80px] w-full lg:flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Max</h2>
                                    <p>20 $</p>
                                </div>
                                <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Claimable Amount</h2>
                                    <p>15 $</p>
                                </div>
                                <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Discount</h2>
                                    <div className="w-full text-right lg:text-center">
                                        <p>60%</p>
                                        <div className="relative w-full">
                                            <div className="overflow-hidden h-2 text-xs flex rounded bg-orange-200">
                                                <div  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden">Commission</h2>
                                    <p>10 $</p>
                                </div>
                            </section>
                            <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-1 py-5 lg:py-2 border-b lg:border-0">
                                <div className="inline-flex w-full lg:justify-center">
                                    <span className="h-[80px] w-full max-w-[80px] lg:w-[80px] rounded-[16.2909px] transition-all bg-blue-200 text-blue-500 flex items-center justify-center">
                                        <iconify-icon icon="mdi:shark" width="40" height="40"></iconify-icon>
                                    </span>
                                    <div className="flex ml-4 lg:hidden text-zinc-500 bg-slate-100 h-[80px] w-full items-center justify-between lg:justify-center p-2 rounded">
                                        <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Invite need more:</h2>
                                        <p>20</p>
                                    </div>
                                </div>
                                <div className="hidden text-zinc-500 bg-slate-100 h-[80px] w-full lg:flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Invite need more</h2>
                                    <p>20</p>
                                </div>
                                <div className="w-full flex items-center gap-4 lg:hidden">
                                    <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                        <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Min</h2>
                                        <p>1 $</p>
                                    </div>
                                    <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                        <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Max</h2>
                                        <p>20 $</p>
                                    </div>
                                </div>
                                <div className="hidden text-zinc-500 bg-slate-100 h-[80px] w-full lg:flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Min</h2>
                                    <p>1 $</p>
                                </div>
                                <div className="hidden text-zinc-500 bg-slate-100 h-[80px] w-full lg:flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Max</h2>
                                    <p>20 $</p>
                                </div>
                                <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Claimable Amount</h2>
                                    <p>15 $</p>
                                </div>
                                <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden mr-2">Discount</h2>
                                    <div className="w-full text-right lg:text-center">
                                        <p>60%</p>
                                        <div className="relative w-full">
                                            <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                                                <div  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-zinc-500 bg-slate-100 h-[80px] w-full flex items-center justify-between lg:justify-center p-2 rounded">
                                    <h2 className="text-slate-600 font-bold text-sm lg:hidden">Commission</h2>
                                    <p>10 $</p>
                                </div>
                            </section>
                        </div>

                    </div>

                </div>
            </main>
        </>

    );
}

export default Basket
