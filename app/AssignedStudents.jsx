import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import UseAxios from './Hooks/UseAxios'
import { styled } from 'nativewind'
import { AllData } from '../contextApi'

const AssignedStudents = () => {

  const [AllDatas, setAllData] = useState([])
  const [FilteredData, setFilteredData] = useState([])
  const Axios = UseAxios()

  const {user} = useContext(AllData)

  useEffect(()=>{

    // Axios(`/counsellors/${user}`)
    Axios(`/counsellors/skriyazahmed200@gmail.com`)
    .then(res=>{ 
      const reverseData = res.data.reverse()
      setAllData(reverseData)})
  },[])


  const sendMail=(email)=>{
    Linking.openURL(`mailto:${email}`)
  }
  const CallTo=(mobile)=>{
    Linking.openURL(`tel:${mobile}`)
  }

  console.log(AllDatas);
  

  return (
    <View style={Styles.MainContainer}>
      {AllDatas.length>0?
      <View><Text style={Styles.headLine}> Your students:</Text>
      <FlatList
      style={Styles.main}
      data={AllDatas}
      keyExtractor={(item)=>item._id}
      renderItem={({item})=>(
        <View style={Styles.listItme}>
          <Text style={Styles.Smalltext}>Applied ID: {item._id}</Text>
          <Text style={Styles.text}>{item.formData.firstName +" "+ item.formData.lastName}</Text>
          <Text style={Styles.text}>Qualification: {item.formData.academic}</Text>
          <Text style={Styles.text}>Interested Course: {item.formData.course}</Text>
          <Text style={Styles.text}>Interested University: {item.formData.university}</Text>
          <Text style={Styles.text}>Interested Country: {item.formData.country}</Text>
          <Text style={Styles.Smalltext}>Registered: {item.time}</Text>
          <View style={Styles.buttonSet}>
            <TouchableOpacity style={Styles.MailButton} onPress={()=> sendMail(item.formData.email)}>
                <Text style={Styles.ButtonText}  >Send mail</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.CallButton} onPress={()=>CallTo(item.formData.mobileNo)} >
                <Text style={Styles.ButtonText}  >Call</Text>
            </TouchableOpacity>
          </View>
        </View>
  )}
      ></FlatList>
      </View> :
      <View style={Styles.errorView}><Text style={Styles.headLine}>You Dont Have any Students at this moment</Text></View>}
    </View>
  )
}

const Styles = StyleSheet.create({
  MainContainer:{
    marginTop:30,
    backgroundColor:"#faf9f6"
  },
  headLine:{
    fontSize: 30,
    marginTop: 50,
    marginBottom: 10,
    textAlign:"center",
    fontFamily:"boldFont"
  },
  main:{
    // marginTop:5,
    height:"88%"
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
    // fontWeight:"bold",
    color:"gray",
    // fontFamily:"boldFont"
  },
  Smalltext:{
    fontSize:16,
    fontWeight:"bold",
    color:"gray",
    fontFamily:"boldFont"
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
    fontWeight:"bold",
    fontFamily:"boldFont"
  },
  buttonSet:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop: 10
  },
  MailButton:{
    backgroundColor:"#292764",
    width:"67%",
    alignItems:"center",
    padding: 10,
    borderRadius: 10
  },
  CallButton:{
    backgroundColor:"#292764",
    width:"30%",
    alignItems:"center",
    padding: 10,
    borderRadius: 10
  },
  ButtonText:{
    fontSize: 25,
    color: "white",
    padding:10,
    fontFamily:"boldFont"
  },
  errorView:{
    height:  "100%",
    // backgroundColor:"black",
    marginTop:"auto",
    marginBottom:"auto",
    justifyContent:"center",
    padding: 25
  }
})

export default AssignedStudents