import React from "react";

function Checkbox({ orderValue, setOrderFunction }) {
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        onClick={setOrderFunction}
      />
      <label
        className="form-check-label"
        htmlFor="flexSwitchCheckDefault"
        checked={orderValue ? true : false}
      >
        Reverse list order
      </label>
    </div>
  );
}

export default Checkbox;
