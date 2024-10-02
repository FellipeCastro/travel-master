import styles from "./Home.module.css"
import HomeImg from "../../img/home-img.svg"
import LinkButton from "../layout/LinkButton"

function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Travel Master</span></h1>
            <p>Começe a gerenciar seu pacotes de viagens agora mesmo!</p>
            <LinkButton to="/newpackage" text="Criar pacote" />

            <img src={HomeImg} alt="Homem viajando" />
        </section>
    )
}

export default Home
