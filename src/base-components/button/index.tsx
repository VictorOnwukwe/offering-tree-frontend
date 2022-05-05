import { MouseEvent, ReactNode, useCallback } from "react";
import Style from "./index.module.scss";
import { BUTTON_TYPE } from "../../shared/enums";

type ButtonProps = {
  children: ReactNode;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
  padding?: string | number;
  backgroundColor?: string;
  className?: string;
  loading?: boolean;
  buttonType?: BUTTON_TYPE;
};

const Button = ({
  children,
  onClick,
  padding = "0.8em 1.2em",
  backgroundColor,
  className,
  loading,
  buttonType = BUTTON_TYPE.BUTTON,
}: ButtonProps) => {
  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
  }, []);

  return (
    <button
      className={`${Style.Button}${className ? " " + className : ""}${
        loading ? " " + Style.loading : ""
      }`}
      style={{ padding, backgroundColor }}
      type={buttonType}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
