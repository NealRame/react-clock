import * as React from "react"
import {
    createRoot
} from "react-dom/client"

import Clock from "../lib/react-nr-clock"

createRoot(document.getElementById("app") as HTMLElement)
    .render(React.createElement(Clock))
