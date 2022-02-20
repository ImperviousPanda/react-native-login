import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Button,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is required"),
  password: yup.string().required(),
});

export default ForgotPassword = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>TEST</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp("90%"),
    alignItems: "center",
    padding: 10,
    elevation: 10,
  },
  textInput: {
    height: 40,
    width: wp("80%"),
    backgroundColor: "white",
    padding: 5,
    margin: 10,
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
});
