import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import UseAxios from './Hooks/UseAxios'
import { styled } from 'nativewind'
import { AllData } from '../contextApi'
import { useQuery } from '@tanstack/react-query'
import * as Notifications from "expo-notifications";
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from "expo-background-fetch"

const AssignedStudents = () => {


  const Axios = UseAxios()

  const { counsellorName, setCounsellorName} = useContext(AllData)
  console.log(counsellorName);
  

  const {user} = useContext(AllData)
  console.log("Hi "+user);
  

  // const {data: AllDatas, error, isLoading} = useQuery({
  //   queryKey:["featchData"],
  //   queryFn: async ()=> {
  //     const responce = await  Axios.get(`/counsellors/${user}`)
  //     return responce.data.reverse();
  //   },
  // })

  const [AllDatas, setAllDatas] = useState([])
  const [newData, setNewData] = useState([])
  const [isLoading, setisLoading] = useState(false)


  useEffect(()=>{
   Axios.get(`/counsellors/${user}`)
   .then(res=> setAllDatas(res.data.reverse()))
   setInterval(() => {
    Axios.get(`/counsellors/${user}`)
    .then(res=> setNewData(res.data.reverse()))
  }, 30000);
  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert("Permission for notifications is not granted!!");
    }
  };
  
  requestPermissions();
},[])

if (newData.length > AllDatas.length) {
  const Function  = async ()=>{
    // const {Status} = await Notifications.getPermissionsAsync()
    // if (Status === "granted") {
      await  Notifications.scheduleNotificationAsync({
        content: {
          title:"New Student 🎉🎉",
          body: "You have a new student to guide",
          sound: true,
        },
        trigger: null,
      });
    // }
  }
  Function()
  setAllDatas(newData)
}
console.log(newData.length);


  if (isLoading) {
    return (
      <View style={Styles.loadingBox}>
        <ActivityIndicator size="large" color="#828CFF" />
        <Text style={StyleSheet.text}>Loading....</Text>
      </View>
    );
  }

  // if (error) {
  //   return <Text>An error has occurred: {error.message}</Text>;
  // }


  const sendMail=(email)=>{
    Linking.openURL(`mailto:${email}`)
  }
  const CallTo=(mobile)=>{
    Linking.openURL(`tel:${mobile}`)
  }

  // notification Function

  const sendNotificationFunc = async () => {
    const { status } = await Notifications.getPermissionsAsync();
  
    if (status !== 'granted') {
      alert("Permission for notifications is not granted!!");
      return;
    }
  
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Ohee Notification",
        body: "Notification Body",
        sound: true,
      },
      trigger: null,
    });
  };
  

    const sendNorification = ()=>{
        sendNotificationFunc()
        
      }

  // console.log(AllDatas);
  

  return (
    <View style={Styles.MainContainer}>
      {AllDatas.length>0?
      <View>
        <Text style={Styles.cName}> Hello, <Text>{counsellorName}</Text></Text>
        <Text style={Styles.headLine}> Your students: {AllDatas.length}</Text>
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
      <View style={Styles.errorView}>
        <Text style={Styles.headLine}> Hello, <Text>{counsellorName}</Text></Text>
        <TouchableOpacity style={user === "ohee@gmail.com" ? {display:"flex"}:{display:"none"}}  onPress={sendNorification}><Text>Send Notification</Text></TouchableOpacity>
        <Text style={Styles.headLine}>You Dont Have any Students at this moment</Text></View>}
    </View>
  )
}

const Styles = StyleSheet.create({
  MainContainer:{
    marginTop:30,
    backgroundColor:"#faf9f6"
  },
  cName:{
    fontSize: 30,
    marginTop: 50,
    // marginBottom: 10,
    // textAlign:"center",
    fontFamily:"boldFont"
  },
  headLine:{
    fontSize: 30,
    marginTop: 30,
    // marginBottom: 10,
    // textAlign:"center",
    fontFamily:"boldFont",
    borderBottomColor:"black",
    borderBottomWidth: 2,
    paddingBottom: 4,
  },
  main:{
    // marginTop:5,
    height:"80%"
    // marginBottom:5
  },
  loadingBox: {
    marginTop: '40%',
    width: '95%',
    borderColor: '#828CFF',
    borderWidth: 3,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 15,
    gap: 10,
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
    marginTop:"auto",
    marginBottom:"auto",
    padding: 25
  }
})

export default AssignedStudents