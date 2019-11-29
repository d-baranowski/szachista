import * as React from 'react'

interface HamburgerProps {
    open: Boolean
}

const hamburger: React.FunctionComponent<HamburgerProps> = ({open}) => (
    <>
        <style jsx>
            {`
            .svg-menu-toggle {
                pointer-events: all;
                cursor: pointer;
            }

            .svg-menu-toggle .bar {
                -webkit-transform: rotate(0) translateY(0) translateX(0);
                transform: rotate(0) translateY(0) translateX(0);
                opacity: 1;
                -webkit-transform-origin: 20px 10px;
                transform-origin: 20px 10px;
                -webkit-transition: -webkit-transform 0.4s ease-in-out, opacity 0.2s ease-in-out;
                transition: transform 0.4s ease-in-out, opacity 0.2s ease-in-out;
            }

            .svg-menu-toggle .bar:nth-of-type(1) {
                -webkit-transform-origin: 20px 10px;
                transform-origin: 20px 10px;
            }

            .svg-menu-toggle .bar:nth-of-type(3) {
                -webkit-transform-origin: 20px 20px;
                transform-origin: 20px 20px;
            }

            .open .svg-menu-toggle .bar:nth-of-type(1) {
                -webkit-transform: rotate(-45deg) translateY(0) translateX(0);
                transform: rotate(-45deg) translateY(0) translateX(0);
            }

            .open .svg-menu-toggle .bar:nth-of-type(2) {
                opacity: 0;
            }

            .open .svg-menu-toggle .bar:nth-of-type(3) {
                -webkit-transform: rotate(45deg) translateY(0em) translateX(0em);
                transform: rotate(45deg) translateY(0em) translateX(0em);
            }

            .inline-svg {
                display: block;
                margin: 0 auto;
            }

        `}
        </style>
        <svg className={"inline-svg " + (open ? "open" : "")} version="1.1" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 4 22.5 22.5" xmlSpace="preserve">
            <title>Mobile Menu</title>
            <g className="svg-menu-toggle">

                <path className="bar" d="M20.945,8.75c0,0.69-0.5,1.25-1.117,1.25H3.141c-0.617,0-1.118-0.56-1.118-1.25l0,0
						c0-0.69,0.5-1.25,1.118-1.25h16.688C20.445,7.5,20.945,8.06,20.945,8.75L20.945,8.75z">
                </path>
                <path className="bar"
                      d="M20.923,15c0,0.689-0.501,1.25-1.118,1.25H3.118C2.5,16.25,2,15.689,2,15l0,0c0-0.689,0.5-1.25,1.118-1.25 h16.687C20.422,13.75,20.923,14.311,20.923,15L20.923,15z">
                </path>
                <path className="bar" d="M20.969,21.25c0,0.689-0.5,1.25-1.117,1.25H3.164c-0.617,0-1.118-0.561-1.118-1.25l0,0
						c0-0.689,0.5-1.25,1.118-1.25h16.688C20.469,20,20.969,20.561,20.969,21.25L20.969,21.25z">
                </path>
                <rect width="320" height="220" fill="none">
                </rect>
            </g>
        </svg>
    </>
);

export default hamburger;
