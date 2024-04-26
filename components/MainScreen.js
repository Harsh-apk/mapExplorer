import React, { useContext,useEffect, useState } from 'react'
import { SafeAreaView,ScrollView, View,StyleSheet,Text,Image, Touchable, TouchableOpacity } from 'react-native';
import TopBar from './screens/TopBar';
import Search from './screens/Search';
import MapView, { Marker } from 'react-native-maps';
import { ExplorerContext } from '../context/context';
import fetchData from '../utils/fetch';
import { fetchName } from '../utils/fetchName';

import * as Location from 'expo-location';


const MainScreen = () => {
    const [mapType,setMapType]=useState('standard');
    const [check,setCheck]=useState(false);
    const [MT,setMT]=useState('satellite');
    const {search,savedLocation,setSavedLocation,setSearch,city,setCityNotFound,region,setRegion,setError,setPending,setCoordinate,coordinate,userLocation,setUserLocation} = useContext(ExplorerContext);
    useEffect(()=>{
        if(search){
             console.log("yesss");
             fetchData(city,setCityNotFound,region,setRegion,setError,setPending,setCoordinate);
             setSearch(false);
        }

        if(check){
          fetchName(coordinate,savedLocation,setSavedLocation,setError,setPending);
          setCheck(false);
        }

        if(userLocation===false){
          (async () => {
      
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setError('Permission to access location was denied');
              setUserLocation(null);
              return;
            }
      
            let location = await Location.getCurrentPositionAsync({});
            setUserLocation(location);

            const coords = {"latitude":location.coords.latitude,"longitude":location.coords.longitude};
            setCoordinate(coords);
            const reg = {
              "latitude":location.coords.latitude,
              "longitude":location.coords.longitude,
              "latitudeDelta":0.1,
              "longitudeDelta":0.1,

            }
            setRegion(reg);
          })();
        }
        

    })

    const changeMapType=()=>{
      setMT(mapType);``
      if(mapType==='standard'){
        setMapType('satellite');
        
      }else{
        setMapType('standard');
      }
    }

  return (
    <View  >
      <TopBar/>
      <Search/>
      <MapView className="w-full h-96" region={region} mapType={mapType}  onRegionChangeComplete={(region)=>{
        setCoordinate(
          {
            latitude:region.latitude,
            longitude:region.longitude,
          }
        )
      }} >
      {coordinate && <Marker coordinate={coordinate} draggable tracksViewChanges={true}
      />}
      
       </MapView>
       <ScrollView  >
       <View className="items-center" >
       <View className="flex flex-row" >
       <TouchableOpacity onPress={changeMapType} className="" >
        <View className="items-center" ><View className="p-2 rounded-2xl m-2 bg-yellow-400" ><Text className="text-xl font-bold capitalize " >{MT}</Text></View></View>
      </TouchableOpacity><TouchableOpacity onPress={()=>{
        setCheck(true);
      }} className="" >
        <View className="items-center" ><View className="p-2 rounded-2xl m-2 bg-yellow-400" ><Text className="text-xl font-bold " >Save Location</Text></View></View>
      </TouchableOpacity>
      </View></View>
        <View className="items-center my-1 mx-3  " >{(savedLocation.length!==0) && 
        savedLocation.map((item)=>(
          <View key={item.id} className="mb-2 border-2 border-yellow-400 p-2 rounded-xl bg-slate-200" >
            <TouchableOpacity onPress={()=>{
              setRegion(
                {
                  latitude: item.latitude,
                longitude: item.longitude,
                latitudeDelta: 0.3,
                longitudeDelta: 0.3,
                }
              );
              setCoordinate(
                {
                  latitude: item.latitude,
                longitude: item.longitude,
                }
              )
            }} >
              <Text>{item["name"]}</Text>
            </TouchableOpacity>
          </View>
        ))
        
        }</View></ScrollView>
    </View>
  )
}

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//     },
//     map: {
//       width: '100%',
//       height: '64%',
//     },
//   });
export default MainScreen;
