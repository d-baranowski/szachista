import React, {ChangeEvent} from 'react';
import "./Field.css";

type Props = {
    placeholder: string
    required: boolean,
    label: string,
    value: any,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    extra?: any
}

const Field: React.FunctionComponent<Props> = (props) => (
    <div className="field">
        <label className="field a-field a-field_a2 page__field">
            <input
                onChange={props.onChange}
                className="field__input a-field__input"
                placeholder={props.placeholder}
                required={props.required}
                value={props.value}
                {...props.extra}
            />
            <span className="a-field__label-wrap">
        <span className="a-field__label">{props.label}</span>
      </span>
        </label>
    </div>
);

export default Field;