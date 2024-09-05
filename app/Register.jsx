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
    Axios("/students")
    .then(data=> setData(data.data))
    setLoading(false)
  },[])

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
      style={styles.mani}
      data={data}
      keyExtractor={(item)=>item._id}
      renderItem={({item})=>(
        <View style={styles.listItme}>
          <Text style={styles.Smalltext}>Applied ID: {item._id}</Text>
          <Text style={styles.text}>{item.firstname +" "+ item.lastname}</Text>
          <Text style={styles.text}>Counsellor: {item.counsellor === ""? "Not assigned": item.counsellor}</Text>
          <Text style={styles.Smalltext}>Date Added: {item.date},{item.currentime}</Text>
          <TouchableOpacity onPress={()=>EditPageFunction(item._id)}  style={styles.editButton}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
  )}
      ></FlatList>
  )
}

const styles = StyleSheet.create({
  mani:{
    marginTop:40,
    // marginBottom:5
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
    fontSize:20,
    fontWeight:"bold",
    color:"gray"
  },
  Smalltext:{
    fontSize:16,
    fontWeight:"bold",
    color:"gray"
  },
  editButton:{
    backgroundColor:"#828CFF",
    padding: 10,
    borderRadius: 10
  },
  buttonText:{
    color:"white",
    textAlign:"center",
    fontSize:18,
    fontWeight:"bold"
  }
})

export default Register