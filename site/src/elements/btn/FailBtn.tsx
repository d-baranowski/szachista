import React from 'react';
import styles from "./btn.css";
import classNames from "classnames";

type Props = {
    onClick: () => void,
    label: string,
    style?: any
}

let cx = classNames.bind(styles);
const className = cx({
    btn: true,
    ['fail-btn']: true
});

const FailBtn: React.FunctionComponent<Props> = (props) => (
    <div
        style={props.style}
        className={className}
        onClick={() => {
            props.onClick()
        }}
    >
        {props.label}
    </div>
);

export default FailBtn;