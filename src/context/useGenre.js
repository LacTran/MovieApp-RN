import React, { useState, useEffect, useContext, createContext } from 'react';
import { fetchGenres } from '../services/services';


const defaultContext = {
    genres: [
        {
            id: null,
            name: ''
        }
    ]
}
const GenresContext = createContext(defaultContext);

export function GenresContextProvider({ children }) {
    const [genres, setGenres] = useState([])
    const [genre, setGenre] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchGenresData() {
            setIsLoading(true);
            try {
                const { data } = await fetchGenres();
                setGenres(data.genres)
            } finally {
                setIsLoading(false)
            }
        }
        fetchGenresData()
    }, [])

    return (
        !isLoading &&
        <GenresContext.Provider value={{ genres, genre, setGenre }}>
            {children}
        </GenresContext.Provider>
    )
}

export function useGenres() {
    const config = useContext(GenresContext);
    return config;
}