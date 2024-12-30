import logoTodoList from "../assets/logo.svg"
import styles from "./Header.module.css"
export function Header() {
  return(
    <div>
      <header className={styles.logo}>
        <img src={logoTodoList} alt="" />
      </header>
    </div>
  )
}