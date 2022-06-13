import React from "react";

import styles from "./Grid.module.scss";

export function Grid({ size }) {
  return (
    <div
      className={styles.Grid}
      style={{
        "--grid-size": `${size}px`,
      }}
    />
  );
}
