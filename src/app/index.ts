import * as React from "react"
import {
    createRoot
} from "react-dom/client"

import Clock from "../lib/react-clock"

createRoot(document.getElementById("app") as HTMLElement)
    .render(React.createElement(Clock))
