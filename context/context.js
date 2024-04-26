import { createContext, useState } from "react";

export const ExplorerContext = createContext(null);
export const ExplorerProvider = (props)=>{
    const [city,setCity] = useState("");
    const [userLocation,setUserLocation]=useState(false);
    const [cityNotFound,setCityNotFound] = useState(null);
    const [region,setRegion] = useState(null);
    const [coordinate,setCoordinate] = useState(null);
    const [error,setError] = useState(null);
    const [pending,setPending] = useState(false);
    const [search,setSearch] = useState(false);
    const [savedLocation,setSavedLocation] = useState([]);
    return (
        <ExplorerContext.Provider value={
            {   
                savedLocation,setSavedLocation,
                userLocation,setUserLocation,
                coordinate,setCoordinate,
                city,setCity,
                cityNotFound,setCityNotFound,
                region,setRegion,
                error,setError,
                pending,setPending,
                search,setSearch
            }} >
            {props.children}
        </ExplorerContext.Provider>
    )
} 