import React, { useState, Component } from "react";
import {
  View,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,Alert
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-material-dropdown-v2";

export const EventSubmitted = (eventname, eventType, venue, date) => { return {eventManager: eventname, typeOfEvent: eventType, venueOfEvent: venue, dateOfEvent: date}}
  //let {eventManager, typeOfEvent, venueOfEvent, dateOfEvent} = props;
//      const eventManager = eventname;
//      const typeOfEvent = ;
//      const venueOfEvent = venueOfEvent;
//      const dateOfEvent = dateOfEvent;
// }

export const App = () => {
  const [date, setDate] = useState(new Date());
  date.setHours(8); date.setMinutes(0); date.setSeconds(0); date.setMilliseconds(0);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [wordInput, setWordInput] = useState("");
  const [venue, setVenue] = useState("");
  const [eventType, setEventType] = useState("");
  const eventList = [];

  const eventTypeData = [
    { value: "Birthday Event" },
    { value: "Engagement Event" },
    { value: "Marriage Event" },
    { value: "Convocation Event" },
    { value: "Other" },
  ];

  const venueData = [
    { value: "Mini Hall" },
    { value: "Orchid Hall" },
    { value: "Grand Hall" },
  ];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log(currentDate.toDateString());
    console.log(date);
    console.log(date.toLocaleTimeString());
    console.log(wordInput);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const newEvent = () => {
    eventList.push(new EventSubmitted(wordInput, eventType, venue, date));
    console.log(eventList);
  };

  const twoOptionAlertHandler = () => {
    
    Alert.alert(
      
      'Message',
      'Do you want to proceed ?',
      [
        { text: 'Yes',
         onPress : () => Alert.alert ('Successfully booked') },
        {
          text: 'No',
          onPress: () => Alert.alert ('Cancel'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
      
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Management System</Text>
      <View style={styles.rowcontainer}>
        <Text style={styles.formlabel}>Name</Text>
        <TextInput
          style={styles.form}
          onChangeText={(wordInput) => setWordInput(wordInput)}
        />
      </View>
      <View style={styles.rowcontainer}>
        <Text style={styles.formlabel}>Event</Text>
        <Dropdown style={styles.dropdowninput} data={eventTypeData} value={eventType} onChangeText={(eventType) => setEventType(eventType)} />
      </View>
      <View style={styles.rowcontainer}>
        <Text style={styles.formlabel}>Venue</Text>
        <Dropdown style={styles.dropdowninput} data={venueData} value={venue} onChangeText={(venue) => setVenue(venue)} />
      </View>

      <Button
        style={styles.button}
        onPress={showDatepicker}
        title="Choose Date"
      />
      {/* <Text style={styles.outputdatetime}>{date.toDateString()}</Text> */}
      {/* <Button
        style={styles.button}
        onPress={showTimepicker}
        title="Choose Time"
      /> */}
      {/* <Text style={styles.outputdatetime}>{date.toTimeString()}</Text> */}
      {show && (
       
       <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}
      <Button
        style={styles.button}
        title="Submit Event"
        onPress= {twoOptionAlertHandler,newEvent}
      />
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    margin: 35,
  },
  rowcontainer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 25,
    marginTop: 35,
    marginBottom: 25,
  },
  formlabel: {
    fontSize: 20,
  },
  form: {
    fontWeight: "bold",
    fontSize: 15,
    backgroundColor: "lightgrey",
    width: 200,
    maxHeight: 30,
    padding: 5,
  },
  dropdowninput: {
    fontWeight: "bold",
    fontSize: 15,
    backgroundColor: "lightgrey",
    width: 200,
    height: 30,
  },
  button: {
    flexDirection: "row",
    height: 10,
    justifyContent: "center",
    alignContent: "space-between",
    margin: 20,
  },
});
