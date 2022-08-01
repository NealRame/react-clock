import * as React from "react"

interface ClockProps {
    offset?: number,
    width?: number,
    height?: number,
    padding?: number,
}

const clockDefaultProps: ClockProps = {
    offset: 0,
    height: 200,
    width: 200,
    padding: 6,
}

const Clock = (props: ClockProps) => {
    const { offset, width, height, padding } = {
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

            ctx.strokeStyle = "black"
            ctx.lineWidth = 3

            ctx.beginPath()
            ctx.moveTo(0, -r + padding)
            ctx.lineTo(0, -r + padding + 10)
            ctx.stroke()
            ctx.closePath()

            const text = `${i === 0 ? 12 : i}`
            const measure = ctx.measureText(`${text}`)

            const textWidth = measure.width
            const textHeight = measure.fontBoundingBoxAscent - measure.fontBoundingBoxDescent

            ctx.restore()
        }

        const hours = date.getHours()
        const minutes = date.getMinutes()
        const hoursAngle = (hours + minutes/60)*Math.PI/6

        ctx.save()

        ctx.rotate(hoursAngle)
        ctx.translate(0, 6)

        ctx.strokeStyle = "black"
        ctx.lineWidth = 3

        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -r/2)
        ctx.stroke()

        ctx.restore()
    }

    const drawMin = (ctx: CanvasRenderingContext2D, r: number) => {
        for (let i = 0; i < 60; i++) {
            const angle = i*Math.PI/30

            if (i % 5 !== 0) {
                ctx.save()
                ctx.rotate(angle)
    
                ctx.strokeStyle = "gray"
                ctx.lineWidth = 2
    
                ctx.beginPath()
                ctx.moveTo(0, -r + padding)
                ctx.lineTo(0, -r + padding + 8)
                ctx.stroke()
    
                ctx.restore()
            }
        }

        const minutes = date.getMinutes()
        const minutesAngle = minutes*Math.PI/30

        ctx.save()
        ctx.rotate(minutesAngle)
        ctx.translate(0, 6)

        ctx.strokeStyle = "black"
        ctx.lineWidth = 3

        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -3*r/4)
        ctx.stroke()

        ctx.restore()
    }

    const drawSec = (ctx: CanvasRenderingContext2D, r: number) => {
        const seconds = date.getSeconds()
        const secondsAngle = seconds*Math.PI/30

        ctx.save()
        ctx.rotate(secondsAngle)
        ctx.translate(0, 6)

        ctx.lineWidth = 1
        ctx.beginPath()

        ctx.moveTo(0, 0)
        ctx.lineTo(0, -r)

        ctx.strokeStyle = "red"
        ctx.stroke()

        ctx.restore()
    }

    const draw = () => {
        if (canvas.current != null) {
            const ctx = canvas.current.getContext("2d")!

            const centerX = width/2
            const centerY = height/2
            const radius = Math.min(centerX, centerY)

            ctx.clearRect(0, 0, width, height)

            ctx.beginPath()
            ctx.arc(centerX, centerY, radius, 0, 360)
            ctx.fillStyle = "black"
            ctx.fill()
            ctx.closePath()

            ctx.beginPath()
            ctx.arc(centerX, centerY, radius - 2, 0, 360)
            ctx.fillStyle = "white"
            ctx.fill()
            ctx.closePath()

            ctx.save()
            ctx.translate(centerX, centerY)

            drawSec(ctx, radius)
            drawMin(ctx, radius)
            drawHrs(ctx, radius)

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