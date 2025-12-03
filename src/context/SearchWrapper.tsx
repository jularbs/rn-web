"use client";
import { createContext, useContext, useState } from "react";

interface SearchContextProps {
    searchInput: string | null;
    setSearchInput: (input: string | null) => void;  // New optional prop
}

interface SearchWrapperProps {
    children: React.ReactNode;
}

const SearchContext = createContext<SearchContextProps>({
    searchInput: null,
    setSearchInput: () => { }
});

export function SearchWrapper({ children }: SearchWrapperProps) {
    const [searchInput, setSearchInput] = useState<string | null>(null);

    return (
        <SearchContext.Provider
            value={{
                searchInput,
                setSearchInput
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export function useSearchContext() {
    return useContext(SearchContext);
}