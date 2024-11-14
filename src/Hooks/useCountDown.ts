import { useEffect, useState } from 'react'

export default function useCountDown({
    Min,
    Sec,
}: {
    Min: number
    Sec: number
}) {
    const [minutes, setMinutes] = useState<number>(Min)
    const [seconds, setSeconds] = useState<number>(Sec)

    useEffect(() => {
        const countdown = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1)
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(countdown)
                } else {
                    setMinutes(minutes - 1)
                    setSeconds(59)
                }
            }
        }, 1000)
        return () => clearInterval(countdown)
    }, [minutes, seconds])

    return {
        minutes,
        seconds,
    }
}
