# React Clock

An analog clock for your [_React_](https://reactjs.org) application.

## Installation

```sh
> npm install @neal-rame/react-clock
```

## Usage

```jsx
import * as React from "react"

import Clock from "@neal-rame/react-clock"

const app = () => {
    const [date, setDate] = React.useState(new Date())

    React.useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date())
        }, 1000)
        return () => clearInterval(interval)
    })

    return <Clock date={ date } />
}
```

## Customization

### size

### backgroundColor

### borderColor

### borderThickness

### padding

### hourHandColor

### hourHandRadius

### hourHandSize

### hourHandTailSize

### hourHandThickness

### hourMarkerColor

### hourMarkerSize

### hourMarkerThickness

### minuteHandColor

### minuteHandRadius

### minuteHandSize

### minuteHandTailSize

### minuteHandThickness

### minuteMarkerColor

### minuteMarkerSize

### minuteMarkerThickness

### secondHandColor

### secondHandRadius

### secondHandSize

### secondHandTailSize

### secondHandThickness