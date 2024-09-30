import { useState, useEffect } from "react"

import Input from "../form/Input"
import Select from "../form/Select"
import SubmitButton from "../form/SubmitButton"
import styles from "./PackageForm.module.css"

function PackageForm({ handleSubmit, btnText, packageData }) {
    const [categories, setCategories] = useState([])
    const [pack, setPack] = useState(packageData || {})

    
    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                "Content-Type": "appllication/json"
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.error(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()   
        handleSubmit(pack)
    }

    const handleChange = (e) => {
        setPack({ ...pack, [e.target.name]: e.target.value })
    }

    const handleCategory = (e) => {
        setPack({ ...pack, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        } })
    }

    return (
        <form onSubmit={submit} className={styles.form} autoComplete="off">
            <Input 
                type="text"
                text="Nome do pacote"
                name="name"
                placeholder="Insira o nome do pacote"
                handleOnChange={handleChange}
                value={pack.name ? pack.name : ""}
            />

            <Input 
                type="number"
                text="Orçamento do pacote"
                name="budget"
                placeholder="Insira o orçamento total do pacote"
                handleOnChange={handleChange}
                value={pack.budget ? pack.budget : ""}
            />

            <Select 
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={pack.category ? pack.category.id : ""}
            />

            <SubmitButton 
                text={btnText}
            />
        </form>
    )
}

export default PackageForm
