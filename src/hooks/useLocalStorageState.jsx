import { useState, useEffect } from "react"

export function useLocalStorageState(name, initialState) {
    const [state, setData] = useState(initialState)

    const setState = (initialState) => {
        setData(initialState)
        localStorage.setItem(name, JSON.stringify(initialState))
    }

    useEffect(() => {
        let fromLS = localStorage.getItem(name)
        if (fromLS) {
            setData(JSON.parse(fromLS))
        }
    }, [])

    return [ state, setState ]
}
