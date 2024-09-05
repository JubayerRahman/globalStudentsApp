import { View, Text , StyleSheet, TouchableOpacity, Image} from 'react-native'
import React, { useContext } from 'react'
import { AllData } from '../contextApi'
import { Link, useNavigation, useRouter } from 'expo-router'
import { signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAHHVotZUexziDZLYyj4nwnjk3rRXGXDcc",
    authDomain: "branchloginapp.firebaseapp.com",
    projectId: "branchloginapp",
    storageBucket: "branchloginapp.appspot.com",
    messagingSenderId: "158718819283",
    appId: "1:158718819283:web:5c0763fdee935727f88d26"
  };

const Index = () => {

    const {user, SignOut} = useContext(AllData)
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
    

  return (
    <View style={styles.mainDiv}>
        <View style={styles.container}>
            <View style={styles.nameContainer}>
                <Image source={require('../assets/Group-BLRd3Svh.png')} style={styles.image} alt='Ohee'  />
               <Text style={styles.title}>Shabuj Global Education</Text>
            </View>
            <Text style={styles.text}  >Empowering Your Global Education Journey</Text>
               <Text style={styles.info}>At Shabuj Global Education, we guide you through every step of your academic journey. Whether you're registering for a course or filling out your student form, we're here to support you.</Text>

        {/* <Text>{user}</Text> */}
        <TouchableOpacity style={styles.button} onPress={RegisterRoute} ><Text style={styles.registerButton}>Register</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Link href="./StudentForm" style={styles.registerButton}>Student Form</Link></TouchableOpacity>
        <TouchableOpacity style={user ? {display:"none"} :styles.logInbutton} ><Link href="./Login"  style={styles.registerButton}>Log In</Link></TouchableOpacity>
        <TouchableOpacity style={user? styles.logOutbutton: {display:"none"}} onPress={logountFunctin}><Text  style={styles.registerButton}>Log Out</Text></TouchableOpacity>
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
        justifyContent:"center"
    },
    container:{
        display:"flex",
        width:"100%",
        height:"100%",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        textAlign:"center",
        borderRadius:5,
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
    title:{
        fontWeight: "700",
        fontSize: 25,
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
        marginBottom: 40
      },
    button:{
        backgroundColor:"#2563EB",
        width:"80%",
        padding:5,
        borderRadius: 5 ,
        marginBottom: 10  
    },
    logInbutton:{
        backgroundColor:"#16A34A",
        width:"80%",
        padding:5,
        borderRadius: 5 ,
        marginBottom: 10  
    },
    logOutbutton:{
        backgroundColor:"red",
        width:"80%",
        padding:5,
        borderRadius: 5 ,
        marginBottom: 10  
    },
    registerButton:{
        fontSize:30,
        fontWeight:"600",
        textAlign:"center",
        color:"white",
    },
    text:{
        fontSize: 16,
        marginTop:15,
        marginBottom: 15,
        fontWeight: "600",
        textAlign:"center"
    },
    cradit: {
        fontSize: 12,
        textAlign:"center",
        color:"gray",
        position:"absolute",
        bottom: 0
    }
})

export default Index