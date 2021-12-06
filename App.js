import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Dropdown } from "react-native-material-dropdown-v2";

// Muhammad Azri Bin Zulkarnain 1814867
// EventSubmitted object to hold detail of event
export const EventSubmitted = (eventname, eventType, venue, date) => { return {eventManager: eventname, typeOfEvent: eventType, venueOfEvent: venue, dateOfEvent: date}}
// eventManager = eventname
// eventtype = typeofevent
// venueofevent = venue
// dateofevent = date

export const App = () => {
  const flatlistRef = useRef();
  const [date, setDate] = useState(new Date()); // initial state for Date and Time
  date.setHours(8); date.setMinutes(0); date.setSeconds(0); date.setMilliseconds(0); // initializing event start time to 8:00 AM 
  const [mode, setMode] = useState("date"); // initial DatePicker mode
  const [show, setShow] = useState(false); // hide DatePicker by default
  const [wordInput, setWordInput] = useState("");
  const [venue, setVenue] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventList, setEventList] = useState([]);

  //Nor Bedriah Binti Munadi 1719890
  //Declare the event data type for dropdown input in "Event" at the UI
  const eventTypeData = [
    { value: "Birthday Event" },
    { value: "Engagement Event" },
    { value: "Marriage Event" },
    { value: "Convocation Event" },
    { value: "Other" },
  ];

  //Declare the venue data type for dropdown input in "Venue" at the UI
  const venueData = [
    { value: "Mini Hall" },
    { value: "Orchid Hall" },
    { value: "Grand Hall" },
    { value: "Main Auditorium" },
  ];

  //Mohammad Mu'izzuddin bin Mohammad Ali 1918855
  useEffect(() => {
    getData();
  }, []);

  //get eventList from AsyncStorage
  const getData = async () => {
    try {
      const getEventList = await AsyncStorage.getItem('@Event_key')
      setEventList(getEventList != null ? JSON.parse(getEventList) : [])
      console.log(eventList);
    } catch(e) {
      console.log("Nothing to get")
    }

    console.log('Done.')

  }
  //store eventList into AsyncStorage
  const storeData = async (obj) => {
    try {
      const storeEventList = [...eventList, obj];
      console.log(storeEventList);
      // console.log(checkForDuplicates(storeEventList));
      if (!checkForDuplicates(storeEventList)){
        await AsyncStorage.setItem('@Event_key', JSON.stringify(storeEventList));
        setEventList(storeEventList);
      }
      // setList(setEventList != null ? JSON.parse(setEventList) : null)
    } catch (e) {
      // saving error
      console.log("Nothing to store")
    }
  }

  //retrieve eventList into AsyncStorage
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      setEventList([]);
    } catch(e) {
      console.log("Could not clear data")
    }
      console.log('Done.');
  }

  //main function to check duplication for dateOfEvent, venueOfEvent
  const checkForDuplicates = (array) => {
      console.log(array);
      if ((new Set(array.map(item => item.dateOfEvent)).size !== array.length)
        && (new Set(array.map(item => item.venueOfEvent)).size !== array.length)) {
          Alert.alert("The event is already booked!");
          return true;
      }
      Alert.alert ('Successfully booked!');
      return false;
  }

  // Muhammad Azri Bin Zulkarnain 1814867
  // DateTimePicker handler onChange
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log(currentDate.toDateString()); // console output for debugging
    console.log(date);                       // console output for debugging
    console.log(date.toLocaleTimeString());  // console output for debugging
    console.log(wordInput);                  // console output for debugging
  };

  // DateTimePicker mode setter
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  // show DateTimePicker date mode
  const showDatepicker = () => {
    showMode("date");
  };
  
  // Muhammad Izzuddin bin Suhaili  1818479
  const twoOptionAlertHandler = () => {
    
    Alert.alert(
      
      'Message',
      'Do you want to proceed ?',
      [
        { text: 'Yes',
         onPress : () => {
          newEvent();
          // Alert.alert ('Successfully booked')
          }
        },
        {
          text: 'No',
          onPress: () => Alert.alert ('Cancel'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
      
    );
  };

  const clearConfirm = () => {
    Alert.alert(
      
      'Clear event',
      'Are you sure you want to clear all event?',
      [
        { text: 'Yes',
         onPress : () => {
          clearAll();
          Alert.alert ('All events cleared!')
          }
        },
        {
          text: 'No',
          // onPress: () => Alert.alert ('Cancel'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
      
    );
  }
  
  const newEvent = () => {
    let obj = new EventSubmitted(wordInput, eventType, venue,
      moment(date).format("Do MMM YYYY h:mm A").concat(moment(date).add(9,'h').format(" - h:mm A")));
    storeData(obj);

    // console.log(eventList);
  };

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -285} //avoid moving any elements when using keyboard 
    style={styles.container}>
      
      {/* This part is the Heading text for the system to look nice and refer to "title" stylesheet to see all the details */}
      <Text style={styles.title}>Event Management System</Text>

      {/* The part below are all for text input and dropdown input for users to key in data before submit their information */}
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

      {/* Below is the button that function for users to pickup their desired date available for them to book event */}
      <Button
        style={styles.button}
        onPress={showDatepicker}
        title="Choose Date"
      />
      {/* condition to show DateTimePicker */}
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
      {/* Event submission button with confirmation prompt */}
      <Button
        style={styles.button}
        title="Submit Event"
        onPress= {twoOptionAlertHandler}
      />

      <Button
        style={styles.button}
        title="Clear Event"
        onPress= {clearConfirm}
      />
      {/* <Button
        style={styles.button}
        title="Get Data"
        onPress= {getData}
      /> */}
      <View style={styles.flatlist}>
        <FlatList
          ref={flatlistRef}
          data={eventList}
          renderItem={({item}) =>
          <Text>{item.eventManager} | {item.dateOfEvent} | {item.typeOfEvent} | {item.venueOfEvent}</Text>}
        />
      </View>
    </KeyboardAvoidingView>
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
  flatlist: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    padding: 20,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#e6c60d",
    borderWidth: 2,
  }
});
