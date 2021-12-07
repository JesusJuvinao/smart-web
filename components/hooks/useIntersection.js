import { useEffect } from 'react'
const defaultObserverOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
}
export default function useIntersectionObserver ({ el, onEnter, active = true, options = defaultObserverOptions }) {
    useEffect(() => {
        let observer
        const refEl = el.current
        if (IntersectionObserver && active && refEl) {
            observer = new IntersectionObserver(entries => {
                entries.forEach(entry => entry.isIntersecting && onEnter())
            }, options)
            observer?.observe(refEl)
        }
        return () => {
            observer?.unobserve(refEl)
        }
    }, [el, onEnter, active, options])
}

/**
 *   style={{
              borderWidth: `${
                20 + (observed?.intersectionRatio || 0).toFixed(2) * 20
              }px`,
              borderColor: `hsl(${
                (observed?.intersectionRatio || 0).toFixed(2) * 120
              }, 100%, 66%)`
            }}
 */
