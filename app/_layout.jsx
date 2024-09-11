import { View, Text, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import NetInfo from "@react-native-community/netinfo";

// import Home from '.'
import { AllData } from '../contextApi'
import { Slot, Stack, useNavigation, useRouter } from 'expo-router'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import auth from '../firebaseConfig'
import { StatusBar } from 'expo-status-bar'
import { useNetInfo, useNetInfoInstance } from '@react-native-community/netinfo'
import { useFonts } from 'expo-font';

const _layout = () => {
  const [user, setuser] = useState()
  const [applicationId, setApplicationId]= useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const navigation = useNavigation()
  const [isConnected, setIsConnected] = useState(true);

  const [fontLoader] =  useFonts({
    "boldFont" : require('../assets/fonts/BOLDE.ttf'),
    "commonFont" : require('../assets/fonts/Montserrat-VariableFont_wght.ttf')
  })

  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth, (user)=>{
      if (user) {
        setuser(user),
        setLoading(false)
      }
      else{
        setuser("")
        setLoading(false)
        // router.replace("/Login")
      }
    })

    const NetConnection = NetInfo.addEventListener( state=>{
      setIsConnected(state.isConnected)
    })
    return NetConnection()

  },[])

  // useEffect(()=>{

  //   // const backAction = () => {
  //   //   // Redirect to Home screen
  //   //   navigation.navigate('index');
  //   //   return true; // Prevent default behavior
  //   // };


  //  const backHandeler= BackHandler.addEventListener("hardwareBackPress", backAction)

  //  return  () => backHandeler.remove()
  // },[navigation])

  const CreateAccount = (email, password)=>{
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const Signin = (email, password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const SignOut = ()=>{
    return signOut(auth)
  }
  
  const contextData = {
    user,
    loading,
    CreateAccount,
    Signin,
    SignOut
  }

  if (!fontLoader) {
    return (<View><Text>Loading...</Text></View>)
  }
  return (
    <AllData.Provider value={{
      user,
      setuser,
      applicationId, 
      setApplicationId,
      loading,
      CreateAccount,
      Signin,
      SignOut}}>
        <Stack screenOptions={{headerShown: false}} initialRouteName='index'  >
        {!isConnected && (
        <Text style={styles.offlineText}>You are offline. Please check your internet connection.</Text>
      )}
          <Stack.Screen name='index' options={{headerShown:false}} />
        </Stack>
        <StatusBar backgroundColor='white'  style='dark' />
    </AllData.Provider>
  )
}

export default _layout