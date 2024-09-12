import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import UseAxios from './Hooks/UseAxios'; 
import { useQuery } from '@tanstack/react-query';

const Register = () => {
  const Axios = UseAxios();

  const { data, error, isLoading } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await Axios.get("/registrations");
      return response.data.reverse();
    },
  });

  if (isLoading) {
    return (
      <View style={styles.listItem}>
        <ActivityIndicator size="large" color="#828CFF" />
        <Text style={styles.text}>Loading....</Text>
      </View>
    );
  }

  if (error) {
    return <Text>An error has occurred: {error.message}</Text>;
  }

  return (
    <FlatList
      style={styles.main}
      data={data}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.SmallText}>Applied ID: {item._id}</Text>
          <Text style={styles.text}>
            {item.formData.firstName + ' ' + item.formData.lastName}
          </Text>
          <Text style={styles.text}>
            Counsellor: {item.cpName === '' ? 'Not assigned' : item.cpName}
          </Text>
          <Text style={styles.SmallText}>Date Added: {item.time}</Text>
          <TouchableOpacity onPress={() => EditPageFunction(item._id)} style={styles.editButton}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: 40,
    marginBottom: 5,
    backgroundColor: '#faf9f6',
  },
  listItem: {
    marginTop: 10,
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
  text: {
    fontSize: 25,
    color: 'gray',
  },
  SmallText: {
    fontSize: 16,
    color: 'gray',
  },
  editButton: {
    backgroundColor: '#828CFF',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'boldFont',
  },
});

export default Register;
