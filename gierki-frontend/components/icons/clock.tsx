import React from 'react';

const clock = () => (
    <svg width="24" height="24"
         viewBox="0 0 24 24">
        <defs>
            <path id="a" d="M0 0h24v24H0V0z"/>
        </defs>
        <clipPath id="b">
            <use href="#a" overflow="visible"/>
        </clipPath>
        <path fill="#38EBAE" clipPath="url(#b)"
              d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
    </svg>
);

clock.propTypes = {};

export default clock;

