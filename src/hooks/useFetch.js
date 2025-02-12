async function useFetch(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return error
    }
}

export default useFetch
