import {View, Text , StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Modal, Alert} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import UseAxios from './Hooks/UseAxios'
import { useRouter } from 'expo-router'
import { AllData } from '../contextApi'
// import React from 'react'

const EditScreen = () => {
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [number, setNumber] = useState("")
    const [email, setEmail] = useState("")
    const [qualification, setQualification] = useState("")
    const [selectedCountry, setSelectedCountry] = useState("")
    const [course, setCourse] = useState("")
    const [university, setUniversity] = useState("")
    const [counsellor, setCounsellor] = useState("")
    const [modalView, setModalView] = useState(false)
    const Axios = UseAxios()
    const [studentsData, setStudentData]= useState("")
    const {applicationId, setApplicationId} = useContext(AllData)


     const now = new Date();

      // Extract date components
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const year = now.getFullYear();
  
      // Extract time components
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
  
      // Format date and time
      const formattedDate = `${day}-${month}-${year}, ${hours}:${minutes}`;
  
      console.log(formattedDate);
    
    useEffect(()=>{
        console.log(`/registration/${applicationId}`)
        if (applicationId != "") {
            Axios(`/registration/${applicationId}`)
            
            .then(data=>setStudentData(data.data))
        }
    },[applicationId])

    useEffect(()=>{
        console.log(studentsData);
        if (studentsData) {
            
            setFirstName(studentsData[0].formData.firstName)
            setLastName(studentsData[0].formData.lastName)
            setNumber(studentsData[0].formData.mobileNo)
            setEmail(studentsData[0].formData.email)
            setQualification(studentsData[0].formData.academic)
            setSelectedCountry(studentsData[0].formData.country)
            setCourse(studentsData[0].formData.course)
            setUniversity(studentsData[0].formData.university)
        }
    },[studentsData])

    console.log(firstname, lastname);
    
    

    const submitFunc =()=>{
        if (firstname===""|| lastname===""|| number ===""|| email===""|| qualification===""|| selectedCountry===""|| course===""|| university==="") {
          setModalView(true)
        }
        else{
            const counsellorEmail = 
            (
                counsellor === "Nayeem Uddin" ?"nayeem@shabujglobal.in": 
                counsellor === "Riyaz Ahmed" ?"skriyazahmed200@gmail.com": 
                counsellor === "Nahid Ahmed" ?"nahidahmmed411@gmail.com":"" 

            )
            const studentData= {
              firstName:firstname, 
              lastName:lastname, 
              mobileNo:number, 
              email:email, 
              academic:qualification, 
              country:selectedCountry, 
              course:course, 
              university:university}
            console.log(studentData);
          console.log(studentData);
          
    
          const updateRegistration = { formData: studentData, counsellorName: counsellor, counsellorMail: counsellorEmail };
          Axios.patch(`/registrationPatchStatus/${applicationId}`,updateRegistration)
          .then(responce=>{
            if (responce) {
              Alert.alert("A mail has been sent to counsellor")
              setFirstName("")
              setLastName("")
              setNumber("")
              setEmail("")
              setQualification("")
              setSelectedCountry("")
              setCourse("")
              setUniversity("")

              const mailBody = {
                name: counsellor, to: counsellorEmail, mail: studentData,
                subject: 'You have a new meeting with a student.'
            }

              Axios.post('/sendMails', mailBody)
              .then(res => console.log(res))
            }
            else{
              Alert.alert("we are facing some issues, please try again later")
            }
          })
          .catch(error=> console.log(error)) 
          console.log(studentData);
        }
        
      }

  return (
    <View>
      <ScrollView>
    <View style={styles.mainDiv}>
        <View style={styles.container}>
            <View style={styles.nameContainer}>
                <Image source={require('../assets/Group-BLRd3Svh.png')} style={styles.image} alt='Ohee'  />
               <Text style={styles.title}>Shabuj Global Education</Text>
            </View>
            {/* students First name */}
            <View style={styles.inputDiv}>
              <Text style={styles.text}>Student First Name</Text>  
              <TextInput value={firstname} editable={false}  onChangeText={text=> setFirstName(text)}  style={styles.input}  placeholder='John' />
            </View>
            {/* students last name */}
            <View style={styles.inputDiv}>
              <Text style={styles.text}>Student Last Name</Text>  
              <TextInput value={lastname} editable={false}  onChangeText={text=> setLastName(text)}   style={styles.input}  placeholder='Doe' />
            </View>
            {/* Mobile Number */}
            <View style={styles.inputDiv}>
              <Text style={styles.text}>Mobile No:</Text>  
              <TextInput value={number} editable={false}  onChangeText={text=> setNumber(text)}   style={styles.input}  placeholder='+880---' keyboardType='number-pad' />
            </View>
            {/* Emalil Id */}
            <View style={styles.inputDiv}>
              <Text style={styles.text}>Email</Text>  
              <TextInput value={email} editable={false}  onChangeText={text=> setEmail(text)}   style={styles.input}  placeholder='Email' keyboardType='email-address' />
            </View>
            {/* Academic Qualification */}
            <View style={styles.inputDiv}>
              <Text style={styles.text}>Academic Qualification</Text>  
              <TextInput value={qualification} editable={false} onChangeText={text=> setQualification(text)}   style={styles.input}  placeholder='Internediate' />
            </View>
            {/* Select Country */}
            <View style={styles.inputDiv}>
              <Text style={styles.text}>Select Country</Text> 
              <View style={styles.input}>
                <Picker 
                selectedValue={selectedCountry}
                onValueChange={(itemValue)=> setSelectedCountry(itemValue)}
                >
                  <Picker.Item style={styles.input} label='United States' value='United States'/>
                  <Picker.Item style={styles.input} label='United Kingdom' value='United Kingdom'/>
                  <Picker.Item style={styles.input} label='Canada' value='Canada'/>
                  <Picker.Item style={styles.input} label='Australia' value='Australia'/>
                  <Picker.Item style={styles.input} label='New Zealand' value='New Zealand'/>
                  <Picker.Item style={styles.input} label='Germany' value='Germany'/>
                </Picker>
              </View> 
            </View>
            {/* In which course you're interested? */}
            <View style={styles.inputDiv}>
              <Text style={styles.text}>In which course you're interested?</Text>  
              <TextInput value={course} onChangeText={text=> setCourse(text)}   style={styles.input}  placeholder='CSE/English/Literature' />
            </View>
            {/* Interested University */}
            <View style={styles.inputDiv}>
              <Text style={styles.text}>Interested University</Text>  
              <TextInput value={university} onChangeText={text=> setUniversity(text)}   style={styles.input}  placeholder='Oxford/Angela Ruskin' />
            </View>
             {/* Select counsellor */}
             <View style={styles.inputDiv}>
              <Text style={styles.text}>Select counsellor</Text> 
              <View style={styles.input}>
                <Picker 
                selectedValue={counsellor}
                onValueChange={(itemValue)=> setCounsellor(itemValue)}
                >
                  <Picker.Item style={styles.input} label='Nayeem Uddin' value='Nayeem Uddin'/>
                  <Picker.Item style={styles.input} label='Riyaz Ahmed' value='Riyaz Ahmed'/>
                  <Picker.Item style={styles.input} label='Nahid Ahmmed' value='Nahid Ahmmed'/>
                </Picker>
              </View> 
            </View>
            <TouchableOpacity onPress={submitFunc}  style={styles.button}><Text  style={styles.registerButton}>Submit</Text></TouchableOpacity>
        </View>
    </View>
    <View>
      <Modal animationType='slide' transparent={true}  visible={modalView}  >
        <View style={styles.modalView}>
        <Text style={styles.cross} onPress={()=>setModalView(false)}>X</Text>
          <Text>Kindly fill all the fields</Text>
        </View>
      </Modal>
    </View>
    </ScrollView>
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
        alignItems:"center",
        // justifyContent:"center",
        textAlign:"center",
        borderRadius:5,
        padding: 20,
        backgroundColor:"white"
    },
    nameContainer:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:5,
        flexWrap:"wrap",
        letterSpacing: 2,
        marginTop:"10%"
    },
    title:{
        fontWeight: "600",
        fontSize: 25,
        // fontFamily:"boldFont"
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
        width:"100%",
        padding:5,
        borderRadius: 5 ,
        marginBottom: 10 ,
        marginTop:30 
    },
    logInbutton:{
        backgroundColor:"#16A34A",
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
        padding: 10,
        fontFamily:"boldFont"
    },
    text:{
        fontSize: 20,
        marginTop:15,
        marginBottom: 10,
        marginLeft:10,
        fontWeight: "600",
        fontFamily:"boldFont"
        // textAlign:"center"
    },
    cradit: {
        fontSize: 12,
        textAlign:"center",
        color:"gray",
        position:"absolute",
        bottom: 0,
        fontFamily:"boldFont"
    },
    inputDiv:{
      width:"100%",
      marginLeft:"auto",
      marginRight:"auto",
      marginTop:10
    },
    input:{
      borderWidth: 1,
      borderColor:"gray",
      borderRadius: 10,
      padding: 10,
      fontSize: 20,
      // fontFamily:"boldFont"
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

export default EditScreen