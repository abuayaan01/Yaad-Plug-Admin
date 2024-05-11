import React from "react";
import styles from "./page-loader.module.css";

function PageLoader() {
  return (
    <div className="flex-1 flex justify-center items-center h-[80vh]">
      <div className={styles.threebody}>
        <div className={styles.threebodydot}></div>
        <div className={styles.threebodydot}></div>
        <div className={styles.threebodydot}></div>
      </div>
    </div>
  );
}

export default PageLoader;
