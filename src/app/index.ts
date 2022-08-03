import * as React from "react"
import {
    createRoot
} from "react-dom/client"

import App from "./app"

createRoot(document.getElementById("app") as HTMLElement)
    .render(React.createElement(App))
