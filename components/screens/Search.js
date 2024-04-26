import React,{useContext, useEffect,useState} from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, } from 'react-native'
import { ExplorerContext } from '../../context/context';
import fetch from '../../utils/fetch';

const Search = () => {
    const {city,setCity,setSearch,error} = useContext(ExplorerContext);
    
   
  return (

    <View className="bg-yellow-300 pb-6 " >
    <View className="items-center relative " >
      <TextInput
        className="  bg-white w-64 p-2 m-1 rounded-lg  text-xl "
        onChangeText={setCity}
        placeholder="Enter Place"
        value={city}/>
        {error && <View className="absolute mt-12 pt-16 " ><Text className="text-red-600 font-bold " >{error}</Text></View>}
      <TouchableOpacity className="bg-yellow-500 shadow-lg p-2 mt-2 rounded-lg " 
        onPress={()=>{setSearch(true);}}
      >
        <View>
            <Text className="text-xl font-bold" >Search</Text>
        </View>
      </TouchableOpacity>
    </View></View>
  )
}

export default Search;
