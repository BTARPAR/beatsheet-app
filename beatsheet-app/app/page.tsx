import Image from 'next/image'
import styles from './page.module.css'
import Homepage from "@beatsheet-app/lib/Homepage";

export default function Home() {
  return (
    <main className={styles.main}>
      <Homepage></Homepage>
    </main>
  )
}
