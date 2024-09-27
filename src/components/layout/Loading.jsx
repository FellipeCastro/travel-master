import { LuLoader2 } from "react-icons/lu"

import styles from "./Loading.module.css"

function Loading() {
    return (
        <div className={styles.loader_container}>
            <LuLoader2 className={styles.loader} />
        </div>
    )
}

export default Loading
