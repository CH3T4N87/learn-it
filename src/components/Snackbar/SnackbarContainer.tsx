import { useSnackbarStore } from "./hooks/useSnackbarStore";
import styles from "./SnackbarContainer.module.scss";

const SnackbarContainer = () => {
    const snacks = useSnackbarStore();
  return (
    <div className={styles.SnackbarContainer}>
        {
            snacks.map(snack => <span key={snack.id} className={styles[snack.type]} >{snack.message}</span>)
        }
    </div>
  )
}

export default SnackbarContainer