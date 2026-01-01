// fetch Function would be fetchMovies or fetchzMovieDetails
// we pass it like useFetch(fetchMovies)

import { useEffect, useState } from "react"


const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(autoFetch);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => { 
        try {
            setLoading(true);
            setError(null);

            const result = await fetchFunction();

            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An error occured"))
        } finally { // always run this code after try/catch or it runs either when a try succeed or a catch finishes
            setLoading(false)
        }
    }

    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    }

    useEffect(() => {
        if(autoFetch)
            fetchData();
    }, []);

    return { data, loading, error, refetch: fetchData, reset };
}

export default useFetch;