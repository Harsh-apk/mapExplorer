

const fetchData = async(city,setCityNotFound,region,setRegion,setError,setPending,setCoordinate) => {
    
    var uri = "https://geocode.maps.co/search?q="+city+"&api_key=66267c52a96e4605200390rkj7ea47c";
    
    try{
        setError(null);
        setPending(true);
        const data = await fetch(uri);
        if(!data.ok){
            throw new Error("something went wrong");
        }
        const res = await data.json();
        if(res.length===0){
            setCityNotFound(true);
            setError("City Not Found")
            return;
        }else{
            const latDelta = ((res[0]).boundingbox)[1]-((res[0]).boundingbox)[0];
            const longDelta = latDelta*1.5;
            const regionData = {
                latitude: parseFloat((res[0]).lat),
                longitude: parseFloat((res[0]).lon),
                latitudeDelta: latDelta,
                longitudeDelta: longDelta,
            }
            setRegion(regionData);
            const coordinates = {
                latitude: parseFloat((res[0]).lat),
                longitude: parseFloat((res[0]).lon),
            }
            setCoordinate(coordinates);
        }
    }catch(err){
        setError(err.message);
    }finally{
        setPending(false);
    }
 
}

export default fetchData
