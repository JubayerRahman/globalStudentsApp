import { View, Text, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// import Home from '.'
import { AllData } from '../contextApi'
import { Slot, Stack, useNavigation, useRouter } from 'expo-router'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, initializeAuth } from 'firebase/auth'
import auth from '../firebaseConfig'
import { StatusBar } from 'expo-status-bar'
import { useNetInfo, useNetInfoInstance } from '@react-native-community/netinfo'
import { useFonts } from 'expo-font';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Network from 'expo-network'

const _layout = () => {
  const [user, setuser] = useState()
  const [applicationId, setApplicationId]= useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const navigation = useNavigation()
  // const [isConnected, setIsConnected] = useState(true);
  const [status, setstatus] = useState()

  const queryClient = new QueryClient()


  const [fontLoader] =  useFonts({
    "boldFont" : require('../assets/fonts/BOLDE.ttf'),
    "commonFont" : require('../assets/fonts/Montserrat-VariableFont_wght.ttf')
  })

  const saveUsers = async (user)=>{
    try {
      const JsonValue = JSON.stringify(user)
      await AsyncStorage.setItem('@user', JsonValue)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const LodeUser = async ()=>{
    try {
      const  JsonViewer = await AsyncStorage.getItem('@user')
      return JsonViewer !=  null ? JSON.parse(JsonViewer) : null
    } catch (error) {
      console.log(error);
            
    }
  }

  useEffect( async()=>{
    const NetwoeksStatus = await Network.getNetworkStateAsync()
    setstatus(NetwoeksStatus)
    const unSubscribe = onAuthStateChanged(auth, async(user)=>{
      if (user) {
        await saveUsers(user.email)
        setuser(user.email),
        setLoading(false)
      }
      else{
        setuser("")
        await AsyncStorage.removeItem('@user'); 
        setLoading(false)
      }
    })
    return ()=> unSubscribe()

  },[Network])
  

  useEffect(()=>{
    const checkuser = async()=>{
      const savedUser =  await LodeUser()

      if (savedUser) {
        setuser(savedUser)
      }
    }
    checkuser()
  },[])

  console.log(user);
  

  

  const CreateAccount = (email, password)=>{
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const Signin = (email, password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const SignOut = async()=>{
    await AsyncStorage.removeItem('@user')
    setuser('')
    return signOut(auth)
  }

  // console.log(status);
  

  if (!fontLoader) {
    return (
    <View>
      <Text>Loading...</Text>
    </View>
  )
  }
  return (
    <QueryClientProvider client={queryClient}>
    <AllData.Provider value={{
      user,
      setuser,
      applicationId, 
      setApplicationId,
      loading,
      CreateAccount,
      Signin,
      SignOut,
      status,
      setstatus
      }}>
        
        <Stack screenOptions={{headerShown: false}} initialRouteName='index'  >
          <Stack.Screen name='index' options={{headerShown:false}} />
        </Stack>
        <StatusBar backgroundColor='white'  style='dark' />
    </AllData.Provider>
    </QueryClientProvider>
  )
}

export default _layout