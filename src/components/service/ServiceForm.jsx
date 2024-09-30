import { useState } from "react"

import Input from "../form/Input"
import SubmitButton from "../form/SubmitButton"

import styles from "../package/PackageForm.module.css"

function ServiceForm({ handleSubmit, btnText, packData }) {
    const [service, setService] = useState({})
    
    const submit = (e) => {
        e.preventDefault()
        packData.services.push(service)
        handleSubmit(packData)
    }

    const handleChange = (e) => {
        setService({ ...service, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={submit} className={styles.form} autoComplete="off">
            <Input 
                type="text"
                text="Nome do serviço"
                name="name"
                placeholder="Insira o nome do serviço"
                handleOnChange={handleChange}
            />

            <Input 
                type="number"
                text="Custo do serviço"
                name="cost"
                placeholder="Insira o custo total do serviço"
                handleOnChange={handleChange}
            />

            <Input 
                type="text"
                text="Descrição do serviço"
                name="description"
                placeholder="Descreva do serviço"
                handleOnChange={handleChange}
            />

            <SubmitButton text={btnText} />
        </form>
    )
}

export default ServiceForm
