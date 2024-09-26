import styles from "./PackageForm.module.css"

function PackageForm() {
    return (
        <form>
            <div>
                <input type="text" placeholder="Digite o nome do pacote" />
            </div>
            <div>
                <input type="number" placeholder="Digite o orçamento do pacote" />
            </div>
            <div>
                <select name="category_id">
                    <option disabled selected>Selecione a categoria</option>
                </select>
            </div>
            <div>
                <input type="submit" value="Criar pacote" />
            </div>
        </form>
    )
}

export default PackageForm
