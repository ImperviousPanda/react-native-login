import React from "react";
import { StyleSheet, Text, TextInput, SafeAreaView } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Button from "./input/Button";
import Link from "./input/Link";
import { Auth } from "aws-amplify";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is required"),
  password: yup.string().required(),
});

export default Login = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          console.log(values);
          const response = await Auth.signIn(values.email, values.password);
          console.log(response);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <Text>Log in to Lama</Text>
            <TextInput
              name="email"
              placeholder="Email Address"
              style={styles.textInput}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={{ fontSize: 10, color: "red" }}>{errors.email}</Text>
            )}
            <TextInput
              name="password"
              placeholder="Password"
              style={styles.textInput}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {errors.password && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.password}
              </Text>
            )}
            <Button title="Submit" onPress={handleSubmit} disabled={!isValid} />
            <Link
              title="Forgot your password?"
              onPress={() => navigation.navigate("ForgotPassword")}
            />
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp("100%"),
    alignItems: "center",
    padding: 10,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    height: 40,
    width: wp("80%"),
    padding: 5,
    margin: 10,
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    backgroundColor: "white",
  },
  button: {},
});
