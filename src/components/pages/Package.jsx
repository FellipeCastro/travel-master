import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import Loading from "../layout/Loading"
import Container from "../layout/Container"

import styles from "./Package.module.css"

function Packages() {
    const { id } = useParams()
    const [pack, setPack] = useState([])
    const [showPackForm, setShowPackForm] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/packages/${id}`, {
                method: "GET",
                header: {
                    "Content-Type": "application/json"
                }
            })
            .then((resp) => resp.json())
            .then((data) => {
                setPack(data)
            })
            .catch((err) => console.error(err))
        }, 500)
    }, [id])

    const togglePackForm = () => {
        setShowPackForm(!showPackForm)
    }

    return (
        <>
            {pack.name ? (
                <div className={styles.pack_details}>
                    <Container customClass="column">
                        <div className={styles.details_container}>
                            <h1>Pacote: {pack.name}</h1>
                            <button className={styles.btn} onClick={togglePackForm}>
                                {!showPackForm ? "Editar pacote" : "Fechar"}
                            </button>
                            {!showPackForm ? (
                                <div className={styles.pack_info}>
                                    <p><span>Categoria: </span> {pack.category.name}</p>
                                    <p><span>Total de orçamento: </span>{pack.budget}</p>
                                    <p><span>Total utilizado: </span> {pack.cost}</p>
                                </div>
                            ) : (
                                <div className={styles.pack_info}>
                                    <p>Detalhes do pacote</p>
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Packages
