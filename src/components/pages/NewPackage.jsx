import { useNavigate } from 'react-router-dom'
import PackageForm from "../package/PackageForm"
import styles from "./NewPackage.module.css"

function NewPackage() {
    const navigate = useNavigate()

    const createPost = (pack) => {
        pack.cost = 0
        pack.services = []

        fetch("http://localhost:5000/packages", {
            method: "POST",
            headers: {
                "Content-Type": "appllication/json"
            },
            body: JSON.stringify(pack)
        })
        .then((resp) => resp.json())
        .then(() => {
            navigate("/packages", { state: { message: "Pacote criado com sucesso!" } })
        })
        .catch((err) => console.error(err))
    }

    return (
        <div className={styles.newpackage_container}>
            <h1>Criar Pacote</h1>
            <p>Crie seu pacote para depois adicionar serviços</p>

            <PackageForm handleSubmit={createPost} btnText="Criar pacote" />
        </div>
    )
}

export default NewPackage
