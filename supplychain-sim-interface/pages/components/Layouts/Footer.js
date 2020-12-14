import React from 'react'
import styles from '../../../styles/Home.module.css'

export default function Footer() {
  return (
    <footer className={ styles.footer }>
      Made with 💙 by{ ' ' }
      <a
        href="https://giesgroups.illinois.edu/disruptionlab/affiliated-staff/"
        target="_blank"
        rel="no credit where credit is due"
      >
        <img
          src="/uni-wordmark-full-color.svg"
          alt="no credit where credit is due"
          className={ styles.logo }
        />
      </a>
    </footer>
  )
}