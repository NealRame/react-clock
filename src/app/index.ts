import * as React from "react"
import {
    createRoot
} from "react-dom/client"

import ReactClock from "../lib/react-clock"

createRoot(document.getElementById("app") as HTMLElement)
    .render(React.createElement(ReactClock))
