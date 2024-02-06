import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome6 } from '@expo/vector-icons';
import { logout } from '../redux/userSlice';

const Profile = () => {

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

 
  const handleLogout = () => {
    dispatch(logout());

  };

  return (
    <View style={styles.container}>
      <View style={{marginLeft:35}}>
      <FontAwesome6 name="user-pen" size={110} color="#0C6968" />
      </View>
      <Text style={styles.text}>Profile</Text>
      {user ? (
        <Text style={styles.emailText}>Email: {user.email}</Text>
      ) : (
        <Text style={styles.emailText}>User not logged in</Text>
      )}
      {user && (
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10, 
  },
  emailText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#0C6968',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
