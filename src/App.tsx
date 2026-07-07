import { RouterProvider } from "react-router-dom"
import styles from "./App.module.scss"
import SnackbarContainer from "./components/Snackbar/SnackbarContainer"
import { router } from "./router/router"
const App = () => {

  return (
    <div className={styles.app}>
      <SnackbarContainer />
      <RouterProvider router={router} />
    </div>
  )
}

export default App