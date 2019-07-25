import React from "react";

const Button = ({ name, classStyle, styles, click }) => {
  return (
    <div className="col-md-3 p-0 animated fadeIn faster">
      <button className={classStyle} style={styles} onClick={click}>
        {name}
      </button>
    </div>
  );
};

export default Button;
