"use client"
import React from 'react'
import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";

function Search({placeholder,value,onChange}) {
  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Search