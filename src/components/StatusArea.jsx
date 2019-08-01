import React from "react";

const StatusArea = ({ status, statusOutput }) => {
  return (
    <div className="d-flex flex-column" style={{ wordWrap: "break-word" }}>
      <h2>{status}</h2>
      {statusOutput}
    </div>
  );
};

export default StatusArea;
