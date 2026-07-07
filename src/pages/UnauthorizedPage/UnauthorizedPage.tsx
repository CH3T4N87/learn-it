import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./UnauthorizedPage.module.scss";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.UnauthorizedPage}>
      <Button onClick={() => navigate("/")}>Back</Button>
    </div>
  )
}

export default UnauthorizedPage