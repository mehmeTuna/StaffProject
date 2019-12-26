import React from "react";

const Footer = () => {

    return (
        <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
                <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2019
                    <a href="https://www.templatewatch.com/" target="_blank" className="text-muted">templatewatch</a>. All rights reserved.</span>
                <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with
                    <i className="icon-heart"></i>
                </span>
            </div>
        </footer>
    );
}

export default Footer;