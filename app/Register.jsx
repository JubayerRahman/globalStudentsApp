import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import UseAxios from './Hooks/UseAxios'
import { useNavigation } from 'expo-router'
import { AllData } from '../contextApi'
// import { Icon } from 'react-native-vector-icons/Icon'

const Register = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true); 
  const Axios = UseAxios()
  const navigator = useNavigation()
  const {applicationId, setApplicationId} = useContext(AllData)

  useEffect(()=>{
    Axios("/registrations")
    .then(data=> {
      const reverseData = data.data.reverse()
      setData(reverseData)
  })
    setLoading(false)
  },[])

  console.log(data);
  

  const EditPageFunction = (id)=>{
    setApplicationId(id)
    navigator.navigate('EditScreen', {id})
  }

  if (loading) {
    return(
      <View style={styles.listItme}>
        <ActivityIndicator size="large" color="#828CFF" />
        <Text style={styles.text}>Loading....</Text>
      </View>
    )
  }
  
  return (
      <FlatList
      style={styles.main}
      data={data}
      keyExtractor={(item)=>item._id}
      renderItem={({item})=>(
        <View style={styles.listItme}>
          <Text style={styles.Smalltext}>Applied ID: {item._id}</Text>
          <Text style={styles.text}>{item.formData.firstName +" "+ item.formData.lastName}</Text>
          <Text style={styles.text}>Counsellor: {item.cpName === ""? "Not assigned": item.cpName}</Text>
          <Text style={styles.Smalltext}>Date Added: {item.time}</Text>
          <TouchableOpacity onPress={()=>EditPageFunction(item._id)}  style={styles.editButton}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
  )}
      ></FlatList>
  )
}

const styles = StyleSheet.create({
  main:{
    marginTop:40,
    marginBottom:5,
    backgroundColor:"#faf9f6"
  },
  listItme:{
    marginTop:10,
    width:"95%",
    borderColor: "#828CFF",
    borderWidth:3,
    borderRightWidth:6,
    borderBottomWidth:6,
    padding:10,
    marginLeft:"auto",
    marginRight:"auto",
    borderRadius:15,
    gap:10
  },
  text:{
    fontSize:25,
    // fontWeight:"bold",
    color:"gray",
    // fontFamily:"boldFont"
  },
  Smalltext:{
    fontSize:16,
    // fontWeight:"bold",
    color:"gray",
    // fontFamily:"boldFont"
  },
  editButton:{
    backgroundColor:"#828CFF",
    padding: 10,
    borderRadius: 10
  },
  buttonText:{
    color:"white",
    textAlign:"center",
    fontSize:30,
    fontFamily:"boldFont"
    // fontWeight:"bold"
  }
})

export default Register