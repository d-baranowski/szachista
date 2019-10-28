import React from 'react';
import classNames from "classnames";
import styles from "./btn.css";

type Props = {
    onClick: () => void,
    label: string
    style?: any
}

let cx = classNames.bind(styles);

const SuccessBtn: React.FunctionComponent<Props> = (props) => (
    <div
        style={props.style}
        className={cx({
            btn: true,
            ['success-btn']: true
        })}
        onClick={() => {
            props.onClick()
        }}
    >
        {props.label}
    </div>
);

export default SuccessBtn;