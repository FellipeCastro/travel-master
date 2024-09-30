import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import Loading from "../layout/Loading"
import Container from "../layout/Container"
import PackageForm from "../layout/package/PackageForm"
import Message from "../layout/Message"

import styles from "./Package.module.css"

function Packages() {
    const { id } = useParams()
    const [pack, setPack] = useState([])
    const [showPackForm, setShowPackForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

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

    const editPost = (pack) => {
        setMessage("")

        if (pack.budget < pack.cost) {
            setMessage("O orçamento não pode ser menor que o custo do pacote!")
            setType("error")
            return false
        }

        fetch(`http://localhost:5000/packages/${id}`, {
            method: "PATCH",
            header: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(pack)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setPack(data)
            setShowPackForm(false)
            setMessage("Pacote atualizado!")
            setType("success")
        })
        .catch((err) => console.error(err))
    }

    const togglePackForm = () => {
        setShowPackForm(!showPackForm)
    }

    const toggleServiceForm = () => {
        setShowServiceForm(!showServiceForm)
    }

    return (
        <>
            {pack.name ? (
                <div className={styles.pack_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
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
                                    <PackageForm 
                                        handleSubmit={editPost} 
                                        btnText="Concluir edição" 
                                        packageData={pack} 
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
                            </button>

                            <div className={styles.pack_info}>
                                {showServiceForm && <div>Formulário do serviço</div>}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            <p>Itens do pacote</p>
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default Packages
