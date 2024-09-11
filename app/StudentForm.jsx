import {View, Text , StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Modal, Alert} from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { Picker } from '@react-native-picker/picker'
import UseAxios from './Hooks/UseAxios'

const StudentForm = () => {
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [number, setNumber] = useState("")
  const [email, setEmail] = useState("")
  const [qualification, setQualification] = useState("")
  const [selectedCountry, setselectedCountry] = useState("")
  const [course, setCourse] = useState("")
  const [university, setUniversity] = useState("")
  const [counsellor, setCounsellor] = useState("")
  const Axios = UseAxios()

  const time = new Date()

  // const day = time.getDate()
  // const month = time.getMonth()+1 
  // const year = time.getFullYear()
  // const currentime = time.toLocaleTimeString("en-BD",{
  //   hour:"numeric",
  //   minute:"2-digit",
  //   second:"2-digit",
  //   hour12: true,
  //   timeZone:"Asia/Dhaka"
  // })

  // const date = day+"/"+month+"/"+year

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
    


  // modal state
  const [modalView, setModalView] = useState(false)

  const submitFunc =()=>{
    if (firstname===""|| lastname===""|| number ===""|| email===""|| qualification===""|| selectedCountry===""|| course===""|| university==="") {
      setModalView(true)
    }
    else{
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
      

      Axios.post("/registrations",{formData: studentData,cpMail:counsellor, cpName:"" , time:formattedDate})
      .then(data=>{
        if (data) {
          Alert.alert("Students data has been stored")
          setFirstName("")
          setLastName("")
          setNumber("")
          setEmail("")
          setQualification("")
          setselectedCountry("")
          setCourse("")
          setUniversity("")
          const mailBody = {name: firstname + " " +lastname, to: email, mail :`Thank you for submitting a form \n Our counsellor will contact you soon. ` , subject:'Thank you for submitting a form.' }
            Axios.post('/sendMail', mailBody)
            .then(res=> console.log(res.status))
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
              <TextInput value={firstname} onChangeText={text=> setFirstName(text)}  style={styles.input}  placeholder='John' />
            </View>
            {/* students last name */}
            <View style={styles.inputDiv}>
              <Text style={styles.text}>Student Last Name</Text>  
              <TextInput value={lastname} onChangeText={text=> setLastName(text)}   style={styles.input}  placeholder='Doe' />
            </View>
            {/* Mobile Number */}
            <View style={styles.inputDiv}>
              <Text style={styles.text}>Mobile No:</Text>  
              <TextInput value={number} onChangeText={text=> setNumber(text)}   style={styles.input}  placeholder='+880---' keyboardType='number-pad' />
            </View>
            {/* Emalil Id */}
            <View style={styles.inputDiv}>
              <Text style={styles.text}>Email</Text>  
              <TextInput value={email} onChangeText={text=> setEmail(text)}   style={styles.input}  placeholder='Email' keyboardType='email-address' />
            </View>
            {/* Academic Qualification */}
            <View style={styles.inputDiv}>
              <Text style={styles.text}>Academic Qualification</Text>  
              <TextInput value={qualification} onChangeText={text=> setQualification(text)}   style={styles.input}  placeholder='Internediate' />
            </View>
            {/* Select Country */}
            <View style={styles.inputDiv}>
              <Text style={styles.text}>Select Country</Text> 
              <View style={styles.input}>
                <Picker 
                selectedValue={selectedCountry}
                onValueChange={(itemValue)=> setselectedCountry(itemValue)}
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
      justifyContent:"center"
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
      fontWeight: "500",
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
      marginBottom: 40,
      fontFamily:"boldFont"
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
      bottom: 0
  },
  inputDiv:{
    width:"100%",
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:10,
  },
  input:{
    borderWidth: 1,
    borderColor:"gray",
    borderRadius: 10,
    padding: 10,
    // fontFamily:"boldFont",
    fontSize: 20
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

export default StudentForm