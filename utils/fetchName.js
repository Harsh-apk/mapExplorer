export const fetchName = async(coordinate,savedLocation,setSavedLocation,setError,setPending)=>{
    const uri="https://geocode.maps.co/reverse?lat="+((coordinate.latitude).toString())+"&lon="+((coordinate.longitude).toString())+"&api_key=66267c52a96e4605200390rkj7ea47c";
    try{
        //console.log("nameFetch");
        
        setError(null);
        setPending(true);
        const res = await fetch(uri);
        if(!res.ok){
            throw new Error("Something went wrong");
        }
        const data = await res.json();
        if(data.error){
            
            throw new Error(data.error);
        }

        const save = {
            "name":data.display_name,
            "latitude":coordinate.latitude,
            "longitude":coordinate.longitude,
            "id":(savedLocation.length +1),
        }
        savedLocation.push(save);
        setSavedLocation(savedLocation);
        console.log(savedLocation);
    }catch(err){
        setError(err.message);
    }finally{
        setPending(false);
    }
}