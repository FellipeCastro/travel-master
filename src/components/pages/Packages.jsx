import { useLocation } from "react-router-dom"

import Message from "../layout/Message"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"

import styles from "./Packages.module.css"

function Packages() {
    const location = useLocation()
    let message = ""
    if (location.state) {
        message = location.state.message
    }

    return (
        <div className={styles.project_container}>
            {message && <Message msg={message} type="success" />}
            <div className={styles.title_container}>
                <h1>Meus pacotes</h1>
                <LinkButton to="/newpackage" text="Criar pacote" />
            </div>

            <Container custtomClass="start">
                <p>Pacotes</p>
            </Container>
        </div>
    )
}

export default Packages
