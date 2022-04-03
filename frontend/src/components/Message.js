import React from "react";

function Message({ type, text }) {
  return (
    <div className={`alert alert-dismissible alert-${type}`}>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
      ></button>
      {text}.
    </div>
  );
}

export default Message;
