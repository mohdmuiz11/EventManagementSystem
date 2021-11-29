import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2';

export default class App extends Component {
  state = {
    wordInput: ' ',
    Venue: ' ',
    Date: ' ',
    Time: ' ',
  };

  render(){
  let data = [
    {value: 'Birthday Event',},
    {value: 'Engagement Event',},
    {value: 'Marriage Event',},
    {value: 'Convocation Event',}];

  let data1 = [
      {value: 'Mini Hall',},
      {value: 'Orchid Hall',},
      {value: 'Grand Hall',}];
  return (
    
    <View style={styles.container}>
      
      <Text style={styles.title}>Event Management System</Text>
      <Text style={styles.all}>Name</Text> 
      <TextInput style={styles.input} onChangeText={(wordInput) => this.setState({wordInput})}/>
      <Text style={styles.all}>Event</Text> 
      <Dropdown style={styles.inputdropdown} data={data}/>
      <Text style={styles.all}>Venue</Text> 
      <Dropdown style={styles.inputdropdown} data={data1}/>
      <Text style={styles.all}>Date</Text> 
      <TextInput style={styles.input} placeholder = "DD/MM/YYYY" placeholderTextColor = "grey" onChangeText={(Date) => this.setState({Date})}/>
      <Text style={styles.all}>Time</Text> 
      <TextInput style={styles.input} placeholder = "HH:mm" placeholderTextColor = "grey" onChangeText={(Time) => this.setState({Time})}/>
      <StatusBar style="auto" />
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    top : 35,
  },
  all: {
    fontSize: 20,
    left: 20,
    top: 60,
  },
  input: {
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: 'lightgrey',
    width: 200,
    left: 150,
    top: 35,
  },
  inputdropdown: {
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: 'lightgrey',
    width: 200,
    height: 30,
    left: 150,
    top: 35,
  }
});
