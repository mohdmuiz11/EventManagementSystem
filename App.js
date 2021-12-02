import React, { useState, Component } from "react";
import {
  View,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-material-dropdown-v2";

export const App = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [wordInput, setWordInput] = useState("");

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
    console.log(currentDate.toTimeString());
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
        <Dropdown style={styles.dropdowninput} data={eventTypeData} />
      </View>
      <View style={styles.rowcontainer}>
        <Text style={styles.formlabel}>Venue</Text>
        <Dropdown style={styles.dropdowninput} data={venueData} />
      </View>

      <Button
        style={styles.button}
        onPress={showDatepicker}
        title="Choose Date"
      />
      <Button
        style={styles.button}
        onPress={showTimepicker}
        title="Choose Time"
      />
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
    flex: 1,
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
