import { useLocation } from "react-router-dom"

import Message from "../layout/Message"

function Packages() {
    const location = useLocation()
    let message = ""
    if (location.state) {
        message = location.state.message
    }

    return (
        <div>
            {message && <Message msg={message} type="success" />}
            <h1>Meus pacotes</h1>
        </div>
    )
}

export default Packages
