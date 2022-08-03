import * as React from "react"

interface ClockProps {
    offset?: number,
    size?: number,

    backgroundColor?: string,
    borderColor?: string,
    borderThickness?: number,

    padding?: number,

    hourHandColor?: string,
    hourHandRadius?: number,
    hourHandSize?: number,
    hourHandTailSize?: number,
    hourHandThickness?: number,

    hourMarkerColor?: string,
    hourMarkerSize?: number,
    hourMarkerThickness?: number,

    minuteHandColor?: string,
    minuteHandRadius?: number,
    minuteHandSize?: number,
    minuteHandTailSize?: number,
    minuteHandThickness?: number,

    minuteMarkerColor?: string,
    minuteMarkerSize?: number,
    minuteMarkerThickness?: number,

    secondHandColor?: string,
    secondHandRadius?: number,
    secondHandSize?: number,
    secondHandTailSize?: number,
    secondHandThickness?: number,
}

const clockDefaultProps: Required<ClockProps> = {
    offset: 0,
    size: 200,
    
    padding: 6,
    
    backgroundColor: "white",
    borderColor: "black",
    borderThickness: 4,
    
    hourHandColor: "black",
    hourHandRadius: 8,
    hourHandSize: 50,
    hourHandTailSize: 0,
    hourHandThickness: 7,

    hourMarkerColor: "black",
    hourMarkerSize: 8,
    hourMarkerThickness: 5,

    minuteHandColor: "gray",
    minuteHandRadius: 6,
    minuteHandSize: 70,
    minuteHandTailSize: 0,
    minuteHandThickness: 5,

    minuteMarkerColor: "gray",
    minuteMarkerSize: 6,
    minuteMarkerThickness: 3,

    secondHandColor: "red",
    secondHandRadius: 4,
    secondHandSize: 80,
    secondHandTailSize: 10,
    secondHandThickness: 2,
}

const createMinuteMarkersDrawer = (props: Required<ClockProps>) => {
    const {
        size,
        minuteMarkerColor,
        minuteMarkerSize,
        minuteMarkerThickness,
        padding,
    } = props
    const radius = size/2

    return (ctx: CanvasRenderingContext2D) => {
        for (let i = 0; i < 60; i++) {
            const angle = i*Math.PI/30

            if (i % 5 !== 0) {
                ctx.save()
                ctx.rotate(angle)

                ctx.strokeStyle = minuteMarkerColor
                ctx.lineWidth = minuteMarkerThickness

                ctx.beginPath()
                ctx.moveTo(0, padding - radius)
                ctx.lineTo(0, padding + minuteMarkerSize - radius)
                ctx.stroke()

                ctx.restore()
            }
        }
    }
}

const createHourMarkersDrawer = (props: Required<ClockProps>) => {
    const {
        size,
        hourMarkerColor,
        hourMarkerSize,
        hourMarkerThickness,
        padding,
    } = props
    const radius = size/2
    return (ctx: CanvasRenderingContext2D) => {
        for (let i = 0; i < 12; i++) {
            const angle = i*Math.PI/6

            ctx.save()
            ctx.rotate(angle)

            ctx.strokeStyle = hourMarkerColor
            ctx.lineWidth = hourMarkerThickness

            ctx.beginPath()
            ctx.moveTo(0, padding - radius)
            ctx.lineTo(0, padding + hourMarkerSize - radius)
            ctx.stroke()
            ctx.closePath()

            ctx.restore()
        }
    }
}

const createHourHandDrawer = (props: Required<ClockProps>) => {
    const {
        hourHandColor,
        hourHandSize,
        hourHandRadius,
        hourHandTailSize,
        hourHandThickness,
    } = props
    return (ctx: CanvasRenderingContext2D, date: Date) => {
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const hoursAngle = (hours + minutes/60)*Math.PI/6

        ctx.save()

        ctx.rotate(hoursAngle)

        ctx.strokeStyle = hourHandColor
        ctx.lineWidth = hourHandThickness

        ctx.beginPath()
        ctx.moveTo(0, hourHandTailSize)
        ctx.lineTo(0, -hourHandSize)
        ctx.stroke()

        ctx.restore()

        if (hourHandRadius > 0) {
            ctx.moveTo(0, 0)
            ctx.arc(0, 0, hourHandRadius, 0, 360)
            ctx.fillStyle = hourHandColor
            ctx.fill()
        }
    }
}

const createMinuteHandDrawer = (props: Required<ClockProps>) => {
    const {
        minuteHandColor,
        minuteHandRadius,
        minuteHandSize,
        minuteHandTailSize,
        minuteHandThickness,
    } = props
    return (ctx: CanvasRenderingContext2D, date: Date) => {
        const minutes = date.getMinutes()
        const minutesAngle = minutes*Math.PI/30

        ctx.save()
        ctx.rotate(minutesAngle)

        ctx.strokeStyle = minuteHandColor
        ctx.lineWidth = minuteHandThickness

        ctx.beginPath()
        ctx.moveTo(0, minuteHandTailSize)
        ctx.lineTo(0, -minuteHandSize)
        ctx.stroke()

        ctx.restore()

        if (minuteHandRadius > 0) {
            ctx.moveTo(0, 0)
            ctx.arc(0, 0, minuteHandRadius, 0, 360)
            ctx.fillStyle = minuteHandColor
            ctx.fill()
        }
    }
}

const createSecondHandDrawer = (props: Required<ClockProps>) => {
    const {
        secondHandColor,
        secondHandRadius,
        secondHandSize,
        secondHandTailSize,
        secondHandThickness,
    } = props
    return (ctx: CanvasRenderingContext2D, date: Date) => {
        const seconds = date.getSeconds()
        const secondsAngle = seconds*Math.PI/30

        ctx.moveTo(0, 0)

        ctx.save()

        ctx.rotate(secondsAngle)

        ctx.lineWidth = secondHandThickness
        ctx.strokeStyle = secondHandColor

        ctx.beginPath()
        ctx.moveTo(0, secondHandTailSize)
        ctx.lineTo(0, -secondHandSize)
        ctx.closePath()
        ctx.stroke()

        ctx.restore()

        if (secondHandRadius > 0) {
            ctx.moveTo(0, 0)
            ctx.arc(0, 0, secondHandRadius, 0, 360)
            ctx.fillStyle = secondHandColor
            ctx.fill()
        }
    }
}

const createClockDrawer = (props: Required<ClockProps>) => {
    const {
        size,
        backgroundColor,
        borderColor,
        borderThickness,
    } = {
        ...clockDefaultProps,
        ...props
    } as Required<ClockProps>
    const radius = size/2

    const drawHourMarkers = createHourMarkersDrawer(props)
    const drawHourHand = createHourHandDrawer(props)
    const drawMinuteMarkers = createMinuteMarkersDrawer(props)
    const drawMinuteHand = createMinuteHandDrawer(props)
    const drawSecondHand = createSecondHandDrawer(props)

    return (ctx: CanvasRenderingContext2D, date: Date) => {
        ctx.clearRect(0, 0, size, size)

        ctx.save()

        ctx.translate(radius, radius)

        ctx.beginPath()
        ctx.arc(0, 0, radius, 0, 360)
        ctx.fillStyle = borderColor
        ctx.fill()
        ctx.closePath()

        ctx.beginPath()
        ctx.arc(0, 0, radius - borderThickness, 0, 360)
        ctx.fillStyle = backgroundColor
        ctx.fill()
        ctx.closePath()

        drawHourMarkers(ctx)
        drawMinuteMarkers(ctx)

        drawHourHand(ctx, date)
        drawMinuteHand(ctx, date)
        drawSecondHand(ctx, date)

        ctx.restore()
    }
}

const Clock = (props: ClockProps) => {
    const canvas = React.useRef<HTMLCanvasElement>(null)
    const config = {
        ...clockDefaultProps,
        ...props
    }

    const drawClock = createClockDrawer(config)
    const update = () => {
        const date = new Date(Date.now() + 3600000*config.offset)
        if (canvas.current != null) {
            const ctx = canvas.current.getContext("2d")!
            drawClock(ctx, date)
        }
    }

    React.useEffect(() => {
        const interval = setInterval(update, 1000)
        update()
        return () => clearInterval(interval)
    })

    return <canvas ref={ canvas } height={ config.size } width={ config.size }/>
}

export default Clock