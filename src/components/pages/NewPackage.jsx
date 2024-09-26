import PackageForm from "../layout/package/PackageForm"
import styles from "./NewPackage.module.css"

function NewPackage() {
    return (
        <div className={styles.newpackage_container}>
            <h1>Criar Pacote</h1>
            <p>Crie seu pacote para depois adicionar serviços</p>

            <PackageForm btnText="Criar projeto" />
        </div>
    )
}

export default NewPackage
