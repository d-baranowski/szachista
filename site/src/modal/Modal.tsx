import React from 'react';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {Close} from "../icons";
import "./Modal.css";

type Props = {
    isVisible: boolean,
    onClose: () => void,
    children: any
}

const Modal: React.FunctionComponent<Props> = (props) => (
    <ReactCSSTransitionGroup
        transitionName="devtales-modal-transition"
        transitionEnterTimeout={250}
        transitionLeaveTimeout={150}>
        {props.isVisible && (
            <div>
                <div onClick={() => {
                    props.onClose();
                }} id="backdrop"/>

                <div className="devtales-modal">
                    <div
                        className="devtales-modal-close-button"
                        onClick={() => {
                            props.onClose();
                        }}
                    >
                        <Close/>
                    </div>
                    {props.children}
                </div>
            </div>
        )}
    </ReactCSSTransitionGroup>
);

export default Modal;