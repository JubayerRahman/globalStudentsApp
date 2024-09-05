import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import React, { useContext, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { AllData } from '../contextApi'

const Login = () => {

  const {user, setuser,  loading, Signin, SignOut} = useContext(AllData)
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
        setuser(result._tokenResponse.email)
        // setu
        setModalView(true),
        setModalText("You logged in successfully 👍")
        router.replace("/")
      })
      .catch(error=> console.log(error))
    }
    
  }
  const HideModal = ()=>{
    setModalView(false)
  }
  
  console.log(user);
  

  // importig all data & function from context

  return (
    <View style={styles.mainDiv}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Shabuj Global! 👋🏻</Text>
        <Text>Email*</Text>
        <TextInput 
        value={Email}
        onChangeText={text=> setEmail(text)}
        style={styles.input}  
        placeholder='Your Email' />
        <Text>Password*</Text>
        <TextInput 
        value={Password}
        onChangeText={text=> setPassword(text)}
        style={styles.input} 
        secureTextEntry={true}   
        placeholder='Password' />
        <TouchableOpacity onPress={()=>loginFunction()}  style={styles.logInbutton}  ><Text  href="./Login"  style={styles.registerButton}>Log In</Text></TouchableOpacity>
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
    paddingLeft:20,
    paddingRight:20,
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
  alignItems:"flex-start",
  justifyContent:"center",
  textAlign:"center",
  borderRadius:5,
  padding: 10,
  backgroundColor:"white"
},
title:{
  textAlign:"center",
  fontSize:30,
  fontWeight:"600",
  marginBottom: 20,
  width:"100%"
},
lable:{
  fontSize: 18,
  fontWeight:"bold",
  marginBottom: 20,
  fontWeight:"600",
  marginLeft: 20
},
input:{
  borderWidth: 1,
  padding: 5,
  borderRadius: 10,
  fontSize: 18,
  width: "90%",
  marginLeft:"auto",
  marginRight:"auto",
  marginBottom: 10
},
loginButton:{
  fontSize:20,
  fontWeight:600
},
logInbutton:{
  backgroundColor:"#16A34A",
  width:"90%",
  padding:5,
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
  textAlign: "right"
}
})

export default Login