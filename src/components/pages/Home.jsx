import styles from "./Home.module.css"
import TripBro from "../../img/trip-bro.svg"
import LinkButton from "../layout/LinkButton"

function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Travel Master</span></h1>
            <p>Começe a gerenciar seu pacotes de viagens</p>
            <LinkButton to="/newpackage" text="Criar pacote" />

            <img src={TripBro} alt="Homem viajando" />
        </section>
    )
}

export default Home
