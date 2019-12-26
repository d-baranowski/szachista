import React from 'react';

const knight = (props) => (
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 2000 2000"
         xmlSpace="preserve">
        <path
            d="M1478.7 1793.2c38.7-29 48.4-120.9 14.5-154.8-33.9-33.9-203.1-208-164.4-222.5 38.7-19.3 33.9-62.9 9.7-77.4-15-9-24.2 0-53.2-4.8-5.7-7.3-34.6-57.5-56.6-95.9 58.1-5.9 187-51.2 201.7-69.1-66-261.3-392.4-523.2-392.4-523.2s42-66.3 88.9-31.4c61.4 45.7 162.2 0 162.2 0l130.8 77.2 10.5-35.3 86.6-36.3-8.2-115.4-188.7-194.8-46.8-84.3-115.1-48.4L1027.5 23s-36.6 62.8-96.7 153.9C842.7 213.4 668.2 329 618 394.5c-34.5 301-23.9 600.7-130.9 737 24.8 22.7 186.6 65 273.4 79.3-11.5 28.6-38 112.9-45.9 122.9-29 4.8-38.2-4.1-53.2 4.8-24.2 14.5-29 58 9.7 77.4 38.7 14.5-130.6 188.6-164.5 222.5-33.9 33.9-24.2 125.8 14.5 154.8-38.7 38.7-43.5 33.9-43.5 48.4v67.7c43.5 33.9 265.9 67.7 415.9 67.7h212.8c150 0 372.4-33.9 416-67.7v-67.7c0-14.5-4.9-9.7-43.6-48.4"/>
        <path className="figure-hightlight"
              d="M529 1829.3c8.8 4.1 18 7.2 27.4 9.4 9.3 2.6 18.8 4.4 28.3 6.3 19 3.6 38.2 6.5 57.4 8.9 38.4 5.1 77 8.7 115.6 11.9 38.6 2.9 77.3 5.5 116 7.2 38.7 1.8 77.4 3.3 116.1 3.7 77.4 1.4 154.9.3 232.1-4.4 38.6-2.5 77.2-5.7 115.5-11 38.4-5.1 76.5-12 114-22.3-36.2 14.3-74.2 23.9-112.5 31.6-38.3 7.5-77 12.8-115.9 16.6-38.8 4-77.8 6.2-116.7 7.8-39 1.2-78 1.4-116.9 1-77.9-1.5-155.8-6.2-233.2-15.2-38.7-4.4-77.3-10.1-115.6-17.5-19.1-3.8-38.2-7.9-57.1-13-18.6-5.5-37.7-11-54.5-21M529 1661.1c8.8 4.1 18 7.2 27.4 9.4 9.3 2.6 18.8 4.4 28.3 6.3 19 3.6 38.2 6.5 57.4 8.9 38.4 5.1 77 8.7 115.6 11.9 38.6 2.9 77.3 5.5 116 7.2 38.7 1.8 77.4 3.3 116.1 3.7 77.4 1.4 154.9.3 232.1-4.4 38.6-2.5 77.2-5.7 115.5-11 38.4-5.1 76.5-12 114-22.3-36.2 14.3-74.2 23.9-112.5 31.6-38.3 7.5-77 12.8-115.9 16.6-38.8 4-77.8 6.2-116.7 7.8-39 1.2-78 1.4-116.9.9-77.9-1.5-155.8-6.2-233.2-15.2-38.7-4.4-77.3-10.1-115.6-17.5-19.1-3.8-38.2-7.9-57.1-13-18.6-5.3-37.7-10.9-54.5-20.9M650.7 1360.6c6.7 3 13.7 5.2 20.9 6.8 7.1 1.8 14.3 3.1 21.5 4.5 14.4 2.5 28.9 4.6 43.5 6.3 29.1 3.6 58.3 6.1 87.5 8.3 29.2 2 58.5 3.9 87.7 5 29.3 1.3 58.5 2.4 87.8 2.7 58.5 1.1 117.1.3 175.5-2.9 29.2-1.7 58.4-3.9 87.4-7.6 29.1-3.5 57.9-8.5 86.5-15.8-27.2 11.4-56 18.9-85 25.1-29 6-58.3 10.2-87.7 13.3-29.4 3.3-58.9 4.9-88.5 6.3-29.5 1-59.1 1.2-88.6.9-59-1.2-118.1-4.8-176.7-12-29.3-3.5-58.5-8.1-87.5-13.9-14.5-3.1-28.9-6.3-43.2-10.4-14.1-4.4-28.5-8.8-41.1-16.6M569.2 1124.6c21-56.5 39.2-113.9 54.3-171.9 7.2-29.1 14.3-58.2 20.1-87.6 5.7-29.4 11.3-58.8 15.4-88.5 2.2-14.8 4.2-29.6 5.9-44.5 1.9-14.8 3.5-29.7 5-44.6 2.9-29.8 4.8-59.6 6.1-89.5 1.4-29.9 1.9-59.8 1.4-89.7-.6-29.8-1.4-60-4.5-89.2l-.5-4.9 3.5-3.1c23.6-20.8 47.7-40.4 72.4-59.6 24.6-19.2 49.8-37.7 75.7-55.1 25.9-17.5 52.5-34 80.3-48.4 13.9-7.2 28.1-13.7 42.8-19.3 14.6-5.5 29.8-9.8 45.3-11.3-15.3 2.8-29.8 8.5-43.8 14.9-14.1 6.4-27.6 14-40.8 21.9-26.5 15.9-51.9 33.7-76.7 52.1-24.8 18.5-49 37.9-72.8 57.6-23.7 19.8-47.2 40.2-69.9 60.9l2.9-8c7.3 60.9 7.7 121.4 5.6 182.1-2.7 60.6-8.7 121-19.1 180.7-10 59.8-24.2 118.8-42 176.6-18 57.8-40.1 114.2-66.6 168.4"/>
        {props.crossOut && <line x1="0" y1="0" x2="2000" y2="2000" style={{stroke: "red", strokeWidth: 100}}/>}
    </svg>
);

knight.propTypes = {};

export default knight;

