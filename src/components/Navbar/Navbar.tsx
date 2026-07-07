import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";
import Button from "../Button/Button";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <header className={styles.navbar}>
            <span className={styles.name}>LearnIT</span>
            <nav className={styles.navMenu}>
                <NavLink className={styles.navLink} to={""}>About us</NavLink>
                <NavLink className={styles.navLink} to={""}>Services</NavLink>
                <NavLink className={styles.navLink} to={""}>Contact Us</NavLink>
            </nav>
            <div className={styles.navBtns}>
                <Button onClick={() => navigate("/login")} >Login</Button>
                <Button onClick={() => navigate("/register")} variant="secondary">Register</Button>
            </div>
        </header>
    )
}

export default Navbar