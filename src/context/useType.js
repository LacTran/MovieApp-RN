import React, { useState, useEffect, useContext, createContext } from 'react';


const defaultContext = {
    type: ''
}
const TypeContext = createContext(defaultContext);

export function TypeContextProvider({ children }) {
    const [type, setType] = useState('popular')
    const [page, setPage] = useState(1);
    const [isOnSearch, setIsOnSearch] = useState(false)
    // const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     async function fetchGenresData() {
    //         setIsLoading(true);
    //         try {
    //             const { data } = await fetchGenres();
    //             setGenres(data.genres)
    //         } finally {
    //             setIsLoading(false)
    //         }
    //     }
    //     fetchGenresData()
    // }, [])

    return (
        <TypeContext.Provider value={{ type, setType, page, setPage, isOnSearch, setIsOnSearch }}>
            {children}
        </TypeContext.Provider>
    )
}

export function useType() {
    const config = useContext(TypeContext);
    return config;
}