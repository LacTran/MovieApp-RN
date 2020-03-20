import React, { useState, useEffect, useContext, createContext } from 'react';
import { fetchConfiguration } from '../services/services';


const defaultContext = {
    images: {
        base_url: "",
        secure_base_url: "",
        backdrop_sizes: [],
        logo_sizes: [],
        poster_sizes: [],
        profile_sizes: [],
        still_sizes: []
    },
    change_keys: []
}
const ConfigContext = createContext(defaultContext);

export function ConfigContextProvider({ children }) {
    const [baseURL, setBaseURL] = useState("");
    const [size, setSize] = useState("")
    const [backDropSize, setBackDropSize] = useState("")
    const [profileSize, setProfileSize] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchAPIConfig() {
            setIsLoading(true);
            try {
                const { data } = await fetchConfiguration();
                setBaseURL(data.images.base_url)
                setSize(data.images.poster_sizes.filter(item => item === 'w500')[0])
                setBackDropSize(data.images.backdrop_sizes.filter(item => item === 'original')[0])
                setProfileSize(data.images.profile_sizes.filter(item => item === 'h632')[0])
            } finally {
                setIsLoading(false)
            }
        }
        fetchAPIConfig()
    }, [])

    return (
        !isLoading &&
        <ConfigContext.Provider value={{ baseURL, size, backDropSize, profileSize }}>
            {children}
        </ConfigContext.Provider>
    )
}

export function useConfig() {
    const config = useContext(ConfigContext);
    return config
}