import { View, Text , StyleSheet, TouchableOpacity, Image} from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AllData } from '../contextApi'
import { Link, useNavigation, useRouter } from 'expo-router'
import { signOut } from 'firebase/auth';
import * as Notification from "expo-notifications"
import axios from 'axios';

const Index = () => {

    const {user, SignOut, status} = useContext(AllData)
    const router = useNavigation()

    const logountFunctin = ()=>{
        SignOut()
        .then(result=> console.log(result))
        .catch(error => console.error("Error signing out:", error));
    }
    const RegisterRoute = ()=>{
        if (user) {
            router.navigate("Register")
        } else {
            router.navigate("Login")            
        }
    }
    const StudentsRounts = ()=>{
        if (user) {
            router.navigate("AssignedStudents")
        } else {
            router.navigate("Login")            
        }
    }

    

    console.log(status);

    // Notification Function

    async function registerForPushNotifications(user){

        const {status} = await  Notification.getPermissionsAsync()

        if (status !== "granted") {
            alert("Notification is not granted")
            return
        }
        const token = (await Notification.getExpoPushTokenAsync()).data

        await axios.post('http://192.168.174.180:3000/saveToken',{
            user,
            expoToken: token
        })
    }

    useEffect(()=>{
        registerForPushNotifications(user)
    },[])
    
    

  return (
    <View style={styles.mainDiv}>
        <View style={styles.container}>
            {
                status ?
                <Text></Text>
                :
                <Text style={styles.statusText}>You are not connected to the internet</Text>
            }
            <View style={styles.upperSection}>
            <View style={styles.nameContainer}>
                <Image source={require('../assets/Group-BLRd3Svh.png')} style={styles.image} alt='Ohee'  />
               <Text style={styles.title}>Shabuj Global Education</Text>
            </View>
            <Text style={styles.text}  >Empowering Your Global Education Journey</Text>
               <Text style={styles.info}>At Shabuj Global Education, we guide you through every step of your academic journey. Whether you're registering for a course or filling out your student form, we're here to support you.</Text>
             </View>

        {/* <Text>{user}</Text> */}
        <View style={styles.routes}>
        <TouchableOpacity style={styles.button} onPress={StudentsRounts} >
            <Text style={styles.registerButton}>My Students</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button} onPress={RegisterRoute} >
            <Text style={styles.registerButton}>registrations</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.button}><Link href="./StudentForm" style={styles.registerButton}>Student Form</Link></TouchableOpacity> */}
        <TouchableOpacity style={user ? {display:"none"} :styles.logInbutton} ><Link href="./Login"  style={styles.registerButton}>Log In</Link></TouchableOpacity>
        <TouchableOpacity style={user? styles.logOutbutton: {display:"none"}} onPress={logountFunctin}><Text  style={styles.registerButton}>Log Out</Text></TouchableOpacity>
        </View>
        <Text style={styles.linkP}>Visit our official website <Link style={styles.linkTxt}  href="https://www.shabujglobal.com/" target='_blank'>Shabuj Global Education</Link> </Text>
        <Text style={styles.cradit}>© 2024 Shabuj Global Education. All rights reserved.</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create ({
    mainDiv:{
        // paddingLeft:10,
        // paddingRight:10,
        backgroundColor:"#9DC0FA",
        height:"100%",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#faf9f6",
        position:"relative"
    },
    upperSection:{
        position:"absolute",
        top:"10%"
    },
    statusText:{
        fontFamily:"boldFont",
        position:'absolute',
        top:40,
        fontSize:20,
        backgroundColor:"black",
        width:"100%",
        color:"white",
        textAlign:"center",
        padding:10,
        borderRadius:20,
        opacity:0.9
    },
    container:{
        display:"flex",
        width:"100%",
        height:"100%",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-evenly",
        textAlign:"center",
        // borderRadius:5,
        padding: 10,
        backgroundColor:"white"
    },
    nameContainer:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:5,
        flexWrap:"wrap",
        marginTop:"10%",
        letterSpacing: 2
        // marginBottom: 100
    },
    routes:{
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        flexWrap:"wrap",
        gap:3
    },
    title:{
        fontWeight: "700",
        fontSize: 25,
        // fontFamily:"boldFont",
        // fontFamily:"commonFont"
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
      },
      info:{
        fontSize: 14,
        textAlign:"center",
        color:"gray",
        marginBottom: 40,
        // fontFamily:"commonFont"
        // fontFamily:"boldFont"
      },
    button:{
        backgroundColor:"#292764",
        width:"49%",
        padding:5,
        borderRadius: 5 ,
        // marginBottom: 10 ,
        height: 150,
        justifyContent:"center"
    },
    logInbutton:{
        backgroundColor:"#16A34A",
        width:"49%",
        padding:5,
        borderRadius: 5 ,
        // marginBottom: 10 ,
        height: 150,
        justifyContent:"center"
    },
    logOutbutton:{
        backgroundColor:"red",
        width:"49%",
        padding:5,
        borderRadius: 5 ,
        // marginBottom: 10 ,
        height: 150 ,
        justifyContent:"center"
    },
    registerButton:{
        fontSize:30,
        fontWeight:"600",
        textAlign:"center",
        color:"white",
        fontFamily:"boldFont",
        width:"100%",
        height:"100%",
        display:"flex",
        flexDirection:"column",
        paddingTop:"35%",
        paddingBottom:"35%",
        alignItems:"center",
        justifyContent:"center"
    },
    text:{
        fontSize: 18,
        marginTop:15,
        marginBottom: 15,
        fontWeight: "500",
        textAlign:"center",
        // fontFamily:"boldFont"
        // fontFamily:"commonFont"
    },
    linkTxt: {
        fontSize: 18,
        textAlign:"center",
        color:"#292764",
    },
    linkP: {
        fontSize: 18,
        textAlign:"center",
        color:"gray",
        position:"absolute",
        bottom: 20,
        fontFamily:"boldFont"
    },
    cradit: {
        fontSize: 16,
        textAlign:"center",
        color:"gray",
        position:"absolute",
        bottom: 0,
        fontFamily:"boldFont"
    }
})

export default Index