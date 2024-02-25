import Image from 'next/image'
import styles from './page.module.css'
import HomeContent from './Home/page'
import Profile from './Profile/page'

export default function Home() {
  return (
    <main className={styles.main}>
      <HomeContent></HomeContent>
    </main>
  )
}
