import styles from "./PackageCard.module.css"

// import { BsPencil, BsFillTrashFill } from "react-icons/bs"

function PackageCard({ id, name, budget, category, handleRemove }) {
    return (
        <div className={styles.project_card} key={id}>
            <h4>{name}</h4>

            <p><span>Orçamento:</span> R${budget}</p>
            <p><span></span> {category}</p>

            <div>
                <p>Editar</p>
                <p>Remover</p>
            </div>
        </div>
    )
}

export default PackageCard
