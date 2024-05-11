import React, { useState } from "react";
import styles from "./status-radio.module.css";

function StatusRadio({value,...rest}) {
  // const [isChecked, setIsChecked] = useState(value || false);

  // const handleCheckboxChange = () => {
  //   setIsChecked(!isChecked);
  // };
  return (
    <label>
      <input
        type="checkbox"
        className={styles.toggleCheckbox}
        checked={value}
        // onChange={handleCheckboxChange}
        {...rest}
      />
      <div className={`${styles.toggle} ${value ? styles.checked : ""}`}></div>
    </label>
  );
}

export default StatusRadio;
