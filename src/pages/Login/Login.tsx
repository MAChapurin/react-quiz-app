import { Form } from "@/components/Form";
import { Logo } from "@/components/UI";

import styles from './login.module.css'

export function Login() {
  return (
    <div className={styles.form}>
      <Logo className={styles.logo} />
      <Form />
    </div>
  )
}
