import React, { useCallback, useEffect, useState } from 'react'
import { getUserByName } from '../../Services/user.services';
import { debounce } from 'lodash';

export const CSearch = () => {

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
        }, 2000),
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
    return (
        <>
            <div>
                <input type="text" value={query} onChange={handleQuery} />
                <ul>
                    {suggestions.map((suggestion) => (
                        <li key={suggestion._id}>{suggestion.name}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}
