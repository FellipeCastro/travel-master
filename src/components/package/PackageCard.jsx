import { Link } from "react-router-dom"
import { BsPencil, BsFillTrashFill } from "react-icons/bs"
import styles from "./PackageCard.module.css"

function PackageCard({ id, name, budget, category, handleRemove }) {
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={styles.pack_card} key={id}>
            <h4>{name}</h4>

            <p><span>Orçamento:</span> R${budget}</p>
            <p className={styles.category_text}><span className={styles[category.toLowerCase()]}></span> {category}</p>

            <div className={styles.pack_card_actions}>
                <Link to={`/package/${id}`}>
                    <BsPencil /> Editar
                </Link>
                
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    )
}

export default PackageCard
