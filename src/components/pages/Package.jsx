import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { parse, v4 as uuidv4 } from "uuid"

import Loading from "../layout/Loading"
import Container from "../layout/Container"
import PackageForm from "../package/PackageForm"
import ServiceForm from "../service/ServiceForm"
import ServiceCard from "../service/ServiceCard"
import Message from "../layout/Message"

import styles from "./Package.module.css"

function Packages() {
    const { id } = useParams()
    const [pack, setPack] = useState([])
    const [services, setServices] = useState([])
    const [showPackForm, setShowPackForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/packages/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((resp) => resp.json())
            .then((data) => {
                setPack(data)
                setServices(data.services)
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

    const createService = (pack) => {
        setMessage("")

        const lastService = pack.services[pack.services.length - 1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(pack.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(pack.budget)) {
            setMessage("Orçamento ultrapassado, verifique o valor do serviço")
            setType("error")
            pack.services.pop()
            return false
        }

        pack.cost = newCost

        fetch(`http://localhost:5000/packages/${pack.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pack)
        })
        .then((resp) => resp.json())
        .then(() => {
            setShowServiceForm(false)
        })
        .catch((err) => console.error(err))
    }

    const removeService = (id, cost) => {
        const serviceUpdate = pack.services.filter((service) => service.id !== id)
        const packUpdated = pack
        packUpdated.services = serviceUpdate
        packUpdated.cost = parseFloat(packUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/packages/${packUpdated.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pack)
        })
        .then((resp) => resp.json())
        .then(() => {
            setPack(packUpdated)
            setServices(serviceUpdate)
            setMessage("Serviço removido com sucesso!")
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
                                    <p><span>Total de orçamento: </span>R${pack.budget}</p>
                                    <p><span>Total utilizado: </span> R${pack.cost}</p>
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
                                {showServiceForm && (
                                    <ServiceForm 
                                        handleSubmit={createService}
                                        btnText="Adicionar serviço"
                                        packData={pack}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 ? (
                                services.map((service) => {
                                    return (
                                        <ServiceCard 
                                            id={service.id}
                                            name={service.name}
                                            cost={service.cost}
                                            description={service.description}
                                            key={service.id}
                                            handleRemove={removeService}
                                        />
                                    )
                                })
                            ) : (
                                <p>Não há serviços cadastrados</p>
                            )}
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
