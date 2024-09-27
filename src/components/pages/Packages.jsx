import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import Message from "../layout/Message"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import PackageCard from "../layout/package/PackageCard"

import styles from "./Packages.module.css"

function Packages() {
    const [packs, setPacks] = useState([])

    const location = useLocation()
    let message = ""
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        fetch("http://localhost:5000/packages", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then((data) => {
            setPacks(data)
        })
        .catch((err) => console.error(err))
    }, [])

    return (
        <div className={styles.project_container}>
            {message && <Message msg={message} type="success" />}
            <div className={styles.title_container}>
                <h1>Meus pacotes</h1>
                <LinkButton to="/newpackage" text="Criar pacote" />
            </div>

            <Container customClass="start">
                {packs.length > 0 && (
                    packs.map((pack) => {
                        return (
                            <PackageCard 
                                id={pack.id}
                                name={pack.name}
                                budget={pack.budget}
                                category={pack.category ? pack.category.name : "Sem categoria"}
                                key={pack.id}
                            />
                        )
                    })
                )}
            </Container>
        </div>
    )
}

export default Packages
