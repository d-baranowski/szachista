import React from 'react';

const inject = { __html: `
<style>
.highlight {
    box-sizing: border-box;
    border: 2px solid cornflowerblue;
}

.floating-modal {
    transition: left 100ms ease-in-out;
    left: 0;
    position: absolute;
    width: 80px;
    height: 280px;
    background-color: rgba(255,255,255, 0.95);
    z-index: 10;
    box-shadow: 0 4px 6px 0 hsla(0,0%,0%,0.2);

    border-radius: 0 2px 2px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.floating-modal * {
    margin: 5px;
    height: 50px;
}

.floating-modal.moveOff {
    left: -100px
}

.figure-hightlight {
  fill: #fff
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.figure.figure-white svg {
  filter: invert(1);
  stroke: white;
  stroke-width: 25px;
}

.board-element {
  /*background-size: cover;
  background-blend-mode: saturation;
  background-image: linear-gradient(rgb(125, 0, 0), rgb(125, 0, 0)), url("/wood.svg");*/
  background-color: #F8CFA4;
}

.row:nth-child(2n) .board-element:nth-child(2n) {
  /*background-image: linear-gradient(rgb(125, 0, 0), rgb(125, 0, 0)), url("/wood.svg");*/
  background-color: #F8CFA4;
}

.board-element:nth-child(2n) {
  background-color: #C78D53;
  /*background-image: linear-gradient(rgb(0, 0, 0), rgb(0, 0, 0)), url("/wood.svg");*/

}

.row:nth-child(2n) .board-element {
  background-color: #C78D53;
  /*background-image: linear-gradient(rgb(0, 0, 0), rgb(0, 0, 0)), url("/wood.svg");*/

}
</style>
`};

const Style = () => (
    <div dangerouslySetInnerHTML={inject}/>
);

Style.propTypes = {};

export default Style;