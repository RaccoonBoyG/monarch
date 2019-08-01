import React from "react";

export const Button = ({ name, classStyle, styles, click, disable }) => {
  return (
    <div className="col-md-3 p-0 animated fadeIn faster" disabled={disable}>
      <button className={`${classStyle} shadow`} style={styles} onClick={click}>
        {name}
      </button>
    </div>
  );
};

export const ButtonSettings = ({
  name,
  classStyle,
  classStyle2,
  styles,
  styles2,
  ariaDisabled,
  type,
  dataToggle,
  ariaPressed,
  click
}) => {
  return (
    <div className="d-flex flex-column col p-0 m-2 animated fadeIn faster">
      <button
        className={`${classStyle} shadow`}
        type={type}
        data-toggle={dataToggle}
        aria-pressed={ariaPressed}
        style={styles}
        onClick={click}
        aria-disabled={ariaDisabled}
        autoComplete="off"
      >
        <div className={classStyle2} style={styles2}></div>
      </button>
      <p className="d-flex">{name}</p>
    </div>
  );
};
