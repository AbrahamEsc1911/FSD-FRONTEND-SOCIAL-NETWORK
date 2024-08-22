import React, { useCallback, useEffect, useState } from 'react'
import { getUserByName } from '../../Services/user.services';
import { debounce } from 'lodash';
import './CSearch.css'
import { useNavigate } from 'react-router-dom';

export const CSearch = () => {

    const passport = JSON.parse(localStorage.getItem("passport"));
    let token = null;
    let userTokenId = null
    if (passport) {
        token = passport.token;
        userTokenId = passport.tokenData.id
    }

    const navigate = useNavigate()

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const debouncedSearch = useCallback(
        debounce(async (value) => {
            if (value.length > 0) {
                const usersRetrieved = await getUserByName(value, token);
                setSuggestions(usersRetrieved.data);
                console.log(usersRetrieved);
            } else {
                setSuggestions([]);
            }
        }, 1000),
        [token]
    );

    useEffect(() => {

        debouncedSearch(query);

        return () => {
            debouncedSearch.cancel();
        };
    }, [query, debouncedSearch]);

    const handleQuery = (e) => {
        setQuery(e.target.value)
    }

    const userProfile = (userId) => {
        if (userId === userTokenId) {
            navigate(`../profile`)
        } else {
            navigate(`../user/${userId}`)
        }
    }

    return (
        <>
            <div className='block-content-search'>
                <div className='search-panel'>
                    <input type="text" value={query} onChange={handleQuery} id='search-input' placeholder='Search by Name' class="input-with-icon" />
                    <div className='list-response'>
                        {suggestions.map((suggestion) => (
                            <div className='space-list-elements' key={suggestion._id} onClick={() => userProfile(suggestion._id)}>{suggestion.name}</div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
