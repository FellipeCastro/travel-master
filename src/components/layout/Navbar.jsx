import { Link } from 'react-router-dom'

import styles from './Navbar.module.css'

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo}>
                Travel Master
            </Link>

            <ul className={styles.list}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/packages">Pacotes</Link></li>
                <li><Link to="/company">Empresa</Link></li>
                <li><Link to="/contact">Contato</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar
