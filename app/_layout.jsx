import { View, Text, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
// import Home from '.'
import { AllData } from '../contextApi'
import { Slot, Stack, useNavigation, useRouter } from 'expo-router'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import auth from '../firebaseConfig'

const _layout = () => {
  const [user, setuser] = useState()
  const [applicationId, setApplicationId]= useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const navigation = useNavigation()

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
    Signin,
    SignOut
  }
  return (
    <AllData.Provider value={{
      user,
      setuser,
      applicationId, 
      setApplicationId,
      loading,
      Signin,
      SignOut}}>
        <Stack screenOptions={{headerShown: false}} initialRouteName='index'  >
          <Stack.Screen name='index' options={{headerShown:false}} />
        </Stack>
    </AllData.Provider>
  )
}

export default _layout