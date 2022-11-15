import React from 'react'

export default function useTimeout(callback: any, delay: number) {
    const timeoutRef = React.useRef(0)
    const savedCallback = React.useRef(callback)

    React.useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    React.useEffect(() => {
        const tick = () => savedCallback.current()
        timeoutRef.current = window.setTimeout(tick, delay)
        return () => window.clearTimeout(timeoutRef.current)
    }, [delay])

    return timeoutRef
}
