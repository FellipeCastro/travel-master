import { BsFillTrashFill } from "react-icons/bs"
import styles from "../package/PackageCard.module.css"

function ServiceCard({ id, name, cost, description, hanldeRemove }) {
    const remove = (e) => {}

    return (
        <div className={styles.pack_card}>
            <h4>{name}</h4>
            <p><span>Custo total: </span>R${cost}</p>
            <p>{description}</p>
            <div className={styles.pack_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard
