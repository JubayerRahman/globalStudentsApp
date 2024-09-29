import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { AllData } from '../contextApi'

const Login = () => {

  const {user, setuser,  loading, Signin, SignOut, counsellorName, setCounsellorName, registerForPushNotifications} = useContext(AllData)
  const router= useRouter()
  console.log(Signin);
  
  const [modalView, setModalView] = useState(false)
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [ModalText, setModalText] = useState("")



  const loginFunction = ()=>{

    if (Email === "" || Password === "" ) {
      setModalView(true)
      setModalText("Please put all the login cradention Correctly.")
    }
    else{
      Signin(Email, Password)
      .then(result=>{
        // console.log(result._tokenResponse.email)
        console.log(result)
        setuser(result._tokenResponse.email)
        setCounsellorName(result._tokenResponse.displayName)
        Alert.alert("You loggedin successfully")
        // setu
        setModalView(true),
        setModalText("You logged in successfully 👍")
        router.replace("/")
      })
      .catch(error=> Alert.alert("Check your email and password again"))
    }
    
  }
  const HideModal = ()=>{
    setModalView(false)
  }
  
  console.log(user);
  if (user) {
    registerForPushNotifications(user)
  }
  

  // importig all data & function from context

  return (
    <View style={styles.mainDiv}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.title}>Shabuj Global! 👋🏻</Text>
        <Text style={styles.lable}>Email*</Text>
        <TextInput 
        value={Email}
        onChangeText={text=> setEmail(text)}
        style={styles.input}  
        placeholder='Your Email' />
        <Text style={styles.lable}>Password*</Text>
        <TextInput 
        value={Password}
        onChangeText={text=> setPassword(text)}
        style={styles.input} 
        secureTextEntry={true}   
        placeholder='Password' />
        <TouchableOpacity onPress={()=>loginFunction()}  style={styles.logInbutton}  ><Text  href="./Login"  style={styles.registerButton}>Log In</Text></TouchableOpacity>
        {/* <Text style={styles.CreateAccountText}>Don't have an account? <Link style={styles.CreateAccountLink} href="/CreateAccount" >Create Account</Link>  </Text> */}
      </View>
      <Modal animationType='slide' transparent={true}  visible={modalView}>
        <View style={styles.modalView}>
            <Text style={styles.cross} onPress={HideModal}>X</Text>
            <Text>{ModalText}</Text>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create ({
  mainDiv:{
    // paddingLeft:20,
    // paddingRight:20,
    backgroundColor:"#9DC0FA",
    height:"100%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#faf9f6"
},
container:{
  display:"flex",
  width:"100%",
  height:"100%",
  flexDirection:"column",
  alignItems:"flex-start",
  justifyContent:"center",
  textAlign:"center",
  borderRadius:5,
  padding: 10,
  backgroundColor:"white"
},
title:{
  textAlign:"center",
  fontSize:25,
  fontWeight:"600",
  marginBottom: 20,
  width:"100%",
  // fontFamily:"boldFont"
},
lable:{
  fontSize: 18,
  fontFamily:"boldFont",
  fontWeight:"bold",
  marginBottom: 20,
  fontWeight:"600",
  marginLeft: 20
},
input:{
  borderWidth: 1,
  padding: 10,
  borderRadius: 10,
  fontSize: 18,
  // fontFamily:"boldFont",
  width: "90%",
  marginLeft:"auto",
  marginRight:"auto",
  marginBottom: 10
},
loginButton:{
  fontSize:30,
  fontWeight:600,
  padding: 20,
  fontFamily:"boldFont"
},
logInbutton:{
  backgroundColor:"#16A34A",
  width:"90%",
  padding:10,
  borderRadius: 5 ,
  marginBottom: 10 ,
  marginLeft:"auto",
  marginRight:"auto",
},
registerButton:{
  fontSize:30,
  fontWeight:"600",
  textAlign:"center",
  color:"white",
  fontFamily:"boldFont"
},
CreateAccountText:{
  textAlign:"center",
  marginTop:10,
  width:"100%",
  fontSize: 20,
  fontFamily:"boldFont"
},
CreateAccountLink:{
  color:"#0000FF",
  // fontWeight:"bold",
  fontFamily:"boldFont"
},
modalView:{
  backgroundColor:"white",
  height:"50%",
  marginTop:"25%",
  marginBottom:"25%",
  borderRadius:20,
  padding: 20,
  width:"90%",
  marginLeft:"auto",
  marginRight:"auto",
  borderWidth: 1,
  borderColor:"gray"
},
cross:{
  color:"red",
  fontSize:30,
  width:"full",
  textAlign: "right",
  fontFamily:"boldFont"
}
})

export default Login