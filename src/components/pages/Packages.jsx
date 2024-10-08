import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import Message from "../layout/Message"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import PackageCard from "../package/PackageCard"
import Loading from "../layout/Loading"

import styles from "./Packages.module.css"

function Packages() {
    const [packs, setPacks] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [packMessage, setPackMessage] = useState("")

    const location = useLocation()
    let message = ""
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/packages", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(resp => resp.json())
            .then((data) => {
                setPacks(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.error(err))
        }, 500)
    }, [])

    const removeProject = (id) => {
        fetch(`http://localhost:5000/packages/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((resp) => resp.json())
        .then(() => {
            setPacks(packs.filter((pack) => pack.id !== id))
            setPackMessage("Pacote removido com sucesso!")
        })
        .catch((err) => console.error(err))
    }

    return (
        <div className={styles.project_container}>
            {message && <Message msg={message} type="success" />}
            {packMessage && <Message msg={packMessage} type="success" />}
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
                                handleRemove={removeProject}
                            />
                        )
                    })
                )}

                {!removeLoading && <Loading />}
                {removeLoading && packs.length === 0 && (
                    <p>Não há pacotes cadastrados</p>
                )}
            </Container>
        </div>
    )
}

export default Packages
