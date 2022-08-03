import * as React from "react"

interface ClockProps {
    offset?: number,
    width?: number,
    height?: number,

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

const clockDefaultProps: ClockProps = {
    offset: 0,
    height: 200,
    width: 200,
    
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

const Clock = (props: ClockProps) => {
    const {
        offset,
        width,
        height,
        padding,

        backgroundColor,
        borderColor,
        borderThickness,
        
        hourHandColor,
        hourHandSize,
        hourHandRadius,
        hourHandTailSize,
        hourHandThickness,

        hourMarkerColor,
        hourMarkerSize,
        hourMarkerThickness,

        minuteHandColor,
        minuteHandRadius,
        minuteHandSize,
        minuteHandTailSize,
        minuteHandThickness,

        minuteMarkerColor,
        minuteMarkerSize,
        minuteMarkerThickness,
        
        secondHandColor,
        secondHandRadius,
        secondHandSize,
        secondHandTailSize,
        secondHandThickness,
    } = {
        ...clockDefaultProps,
        ...props
    } as Required<ClockProps>

    const [date, setDate] = React.useState(new Date())
    const canvas = React.useRef<HTMLCanvasElement>(null)

    const drawHrs = (ctx: CanvasRenderingContext2D, r: number) => {
        for (let i = 0; i < 12; i++) {
            const angle = i*Math.PI/6

            ctx.save()
            ctx.rotate(angle)

            ctx.strokeStyle = hourMarkerColor
            ctx.lineWidth = hourMarkerThickness

            ctx.beginPath()
            ctx.moveTo(0, -r + padding)
            ctx.lineTo(0, -r + padding + hourMarkerSize)
            ctx.stroke()
            ctx.closePath()

            ctx.restore()
        }

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

        ctx.moveTo(0, 0)
        ctx.arc(0, 0, hourHandRadius, 0, 360)
        ctx.fillStyle = hourHandColor
        ctx.fill()
    }

    const drawMin = (ctx: CanvasRenderingContext2D, r: number) => {
        for (let i = 0; i < 60; i++) {
            const angle = i*Math.PI/30

            if (i % 5 !== 0) {
                ctx.save()
                ctx.rotate(angle)
    
                ctx.strokeStyle = minuteMarkerColor
                ctx.lineWidth = minuteMarkerThickness
    
                ctx.beginPath()
                ctx.moveTo(0, -r + padding)
                ctx.lineTo(0, -r + padding + minuteMarkerSize)
                ctx.stroke()
    
                ctx.restore()
            }
        }

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

        ctx.moveTo(0, 0)
        ctx.arc(0, 0, minuteHandRadius, 0, 360)
        ctx.fillStyle = minuteHandColor
        ctx.fill()
    }

    const drawSec = (ctx: CanvasRenderingContext2D, r: number) => {
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

        ctx.moveTo(0, 0)
        ctx.arc(0, 0, secondHandRadius, 0, 360)
        ctx.fillStyle = secondHandColor
        ctx.fill()
    }

    const draw = () => {
        if (canvas.current != null) {
            const ctx = canvas.current.getContext("2d")!

            const centerX = width/2
            const centerY = height/2
            const radius = Math.min(centerX, centerY)

            ctx.clearRect(0, 0, width, height)

            ctx.save()

            ctx.translate(centerX, centerY)

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

            drawHrs(ctx, radius)
            drawMin(ctx, radius)
            drawSec(ctx, radius)

            ctx.restore()
        }
    }

    React.useEffect(() => {
        draw()
    }, [date])

    React.useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date(Date.now() + 3600000*offset))
        }, 1000)
        return () => clearInterval(interval)
    })

    return <canvas ref={ canvas } height={ height } width={ width }/>
}

export default Clock