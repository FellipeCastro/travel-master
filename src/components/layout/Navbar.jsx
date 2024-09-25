import { Link } from 'react-router-dom'

import Container from './Container'

import styles from './Navbar.module.css'
import logo from '../../img/logo.png'

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                    <img src={logo} alt="Logo" />
                </Link>

                <ul className={styles.list}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/packages">Pacotes</Link></li>
                    <li><Link to="/company">Empresa</Link></li>
                    <li><Link to="/contact">Contato</Link></li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar
