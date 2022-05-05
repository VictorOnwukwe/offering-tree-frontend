import react, { useCallback, FormEvent, useState, useEffect } from "react";
import { TEXTFIELD_TYPE } from "../../shared/enums";
import SimpleReactValidator from "simple-react-validator";
import Style from "./index.module.scss";

type ValidatorData = {
  for: string;
  rules: string;
  validator: SimpleReactValidator;
};
type TextfieldProps = {
  value: string | number;
  onInput: (value: string | number) => void;
  inputType?: TEXTFIELD_TYPE;
  validator?: ValidatorData;
  name?: string;
  infoText?: string;
  label?: string;
  width?: string | number;
  maxWidth?: string | number;
  padding?: string | number;
  className?: string;
  placeholder?: string;
};

const TextField = ({
  inputType = TEXTFIELD_TYPE.TEXT,
  value,
  onInput,
  validator,
  name,
  label,
  infoText,
  width = "100%",
  maxWidth = "100%",
  padding = "0.5em 1em",
  className,
  placeholder,
}: TextfieldProps) => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (validator) {
      validator.validator.message(validator.for, value, validator.rules);
    }
  }, []);

  const showMessage = useCallback(() => {
    if (validator) validator.validator.showMessageFor(validator.for);
  }, []);

  const handleInput = useCallback((e: FormEvent<HTMLInputElement>): void => {
    onInput(e.currentTarget.value);
  }, []);
  const handleBlur = useCallback(
    (e: FormEvent<HTMLInputElement>): void => {
      if (validator) {
        showMessage();
        setMessage(
          validator &&
            validator.validator.message(validator.for, value, validator.rules)
        );
      }
    },
    [value]
  );

  return (
    <div
      className={`${Style.TextField}${className ? " " + className : ""}`}
      style={{ width, maxWidth }}
    >
      {label ? <label htmlFor="textfield">{label}</label> : null}
      <input
        id="textfield"
        className={Style["TextField-input"]}
        name={name}
        style={{ padding }}
        placeholder={placeholder}
        type={inputType}
        value={value}
        onBlur={handleBlur}
        onInput={handleInput}
      />
      {validator && message ? (
        <div className={Style["TextField-error"]}>{message}</div>
      ) : infoText ? (
        <span className={Style["TextField-info"]}>{infoText}</span>
      ) : null}
    </div>
  );
};

export default TextField;
