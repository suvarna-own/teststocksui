import React from 'react'
export default function Contact() {
    return (
        <>
            <section className="contact-sections border rounded border-gray px-4 py-4 mt-4">
                <div className="row between">
                    <div className="three columns center-on-mobile">
                        <div className="support-box">
                            <h4>Support portal</h4>
                            <p className="text-14">Have a query?</p>
                            <a className="button" href="https://support.zerodha.com">Create a ticket</a>
                        </div>
                    </div>
                    <div className="three columns center-on-mobile">
                        <h5>New account opening</h5>
                        <p className="text-grey">Monday – Friday<br />8:30 AM - 5:00 PM</p>
                        <p className="text-grey">Saturday<br />9:00 AM - 2:00 PM</p>
                        <p className="bottom-5 contact-phone-link">
                            <span className="icon-phone"></span>
                            080 4719 2020
                        </p>
                        <p className="contact-phone-link">
                            <span className="icon-phone"></span>
                            080 7117 5337
                        </p>
                    </div>
                    <div className="three columns center-on-mobile">
                        <h5>Support</h5>
                        <p className="text-grey">Monday – Friday<br />8:30 AM - 5:00 PM</p>
                        <p className="bottom-5 contact-phone-link">
                            <span className="icon-phone"></span>
                            <a href="tel:08047181888">080 4718 1888</a>
                        </p>
                        <p className="bottom-5 contact-phone-link">
                            <span className="icon-phone"></span>
                            <a href="tel:08047181999">080 4718 1999</a>
                        </p>
                        <p className="contact-phone-link">
                            <span className="icon-phone"></span>
                            <a href="tel:08047181999">080 4588 8887</a>
                        </p>
                    </div>
                    <div className="three columns center-on-mobile">
                        <h5>Call &amp; trade</h5>
                        <p className="text-grey">Monday – Friday<br />9:00 AM - 11:30 PM</p>
                        <p className="bottom-5 contact-phone-link">
                            <span className="icon-phone"></span>
                            080 4718 1888
                        </p>
                        <p>
                            <span className="icon-phone"></span>
                            080 4040 2020
                            080 6620 2020
                        </p>
                    </div>
                </div>
                <br />
                <p className="text-14 text-grey">Ticket support is available every day, including weekends. Phone support is available Monday–Saturday, with timings as listed above.</p>
                <div>
                    <span className="text-14 text-grey">* Existing clients calling from an unregistered number need a support code to reach our support desk. <a href="https://console.zerodha.com/profile/">Know your Support Code</a>.</span>
                </div>
                <p className="contact-queries">
                    <span className="text-grey label">* Calls to Indian resident Zerodha customers will only be made from our official numbers: 1600313743 &amp; 1600313754.
                        Please note that customers cannot call back this number. If you need assistance, please contact our support or sales team using the numbers listed above.</span>
                </p>
                <p className="contact-queries">
                    <span className="text-grey label">* For NRI &amp; non-individual account opening, please call 080 4680 5727 (Monday - Friday, 9:00 AM - 5:00 PM)</span>
                </p>
                <p className="contact-queries">
                    <span className="text-grey label">* To block an account in an emergency, please call 080 4680 1166 (Monday - Friday, 8:30 AM - 5:00 PM)</span>
                    —
                    <a href="mailto:stoptrade@zerodha.com">stoptrade@zerodha.com</a>
                </p>
                <p className="contact-queries">
                    <span className="text-grey label">* For media &amp; press enquiries</span>
                    —
                    <a href="mailto:press@zerodha.com">press@zerodha.com</a>
                </p>
                <ul className="list-items text-12">
                    <li>
                        <a target="_blank" href="https://docs.google.com/spreadsheets/d/1Se5OL_nRnRCoNETB2CYDACh1SbJ3x_YH/edit?usp=drive_link&amp;ouid=103000998403358031306&amp;rtpof=true&amp;sd=true">Basic br/anch details</a>
                    </li>
                    <li>
                        <a target="_blank" href="https://docs.google.com/spreadsheets/d/1GLsRHBE0WFe_Ea-wILYePuBl_lORzcZjmMTqV8j0ns4/edit#gid=0">Details of authorised personnel</a>
                    </li>
                </ul>
            </section>
        </>
    )
}