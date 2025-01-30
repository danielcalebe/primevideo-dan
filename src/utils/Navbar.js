
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

export const useNavbarJs  = () => {

  

    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const [isVisibleSearchBar, setIsVisibleSearchBar] = useState(false);

    const toggleVisibilitySearchBar = () => {
        setIsVisibleSearchBar(!isVisibleSearchBar);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };



    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Impede o recarregamento da página
        if (query.trim()) {
            // Navega para a página de pesquisa com o parâmetro da consulta
            navigate(`/search?query=${query}`);
        }
    };

    return{

        isScrolled, setIsScrolled,
        navigate,
        isVisibleSearchBar, setIsVisibleSearchBar,
        toggleVisibilitySearchBar,
        handleSearch,
        query, setQuery,
        loading, setLoading,
        results, setResults,
        handleSearchChange,
        handleSearchSubmit,

    };
};