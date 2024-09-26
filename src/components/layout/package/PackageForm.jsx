import { useState, useEffect } from "react"

import Input from "../../form/Input"
import Select from "../../form/Select"
import SubmitButton from "../../form/SubmitButton"
import styles from "./PackageForm.module.css"

function PackageForm({ btnText }) {
    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                "Contemt-Type": "apllication/json"
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.error(err))
    }, [])

    return (
        <form className={styles.form}>
            <Input 
                type="text"
                text="Nome do pacote"
                name="name"
                placeholder="Insira o nome do pacote"
            />

            <Input 
                type="number"
                text="Orçamento do pacote"
                name="budget"
                placeholder="Insira o orçamento total do pacote"
            />

            <Select 
                name="category_id"
                text="Selecione a categoria"
                options={categories}
            />

            <SubmitButton 
                text={btnText}
            />
        </form>
    )
}

export default PackageForm
