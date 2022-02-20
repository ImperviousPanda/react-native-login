import { StyleSheet } from "react-native";
import * as React from "react";
import Login from "./src/Login";
import ForgotPassword from "./src/ForgotPassword";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Amplify from "aws-amplify";
import {
  REACT_APP_API_URL,
  REACT_APP_IDENTITY_POOL_ID,
  REACT_APP_REGION,
  REACT_APP_USER_POOL_CLIENT_ID,
  REACT_APP_USER_POOL_ID,
} from "@env";

const AMPLIFY_CONFIG = {
  Auth: {
    region: REACT_APP_REGION,
    userPoolId: REACT_APP_USER_POOL_ID,
    userPoolWebClientId: REACT_APP_USER_POOL_CLIENT_ID,
  },
  aws_appsync_graphqlEndpoint: REACT_APP_API_URL,
  // "aws_appsync_region": process.env.REACT_APP_AMPLIFY_REGION,
  // "aws_appsync_authenticationType": process.env.REACT_APP_AMPLIFY_APP_GRAPHQL_AUTHENTICATION_TYPE,
  // "aws_appsync_apiKey": process.env.REACT_APP_AMPLIFY_APP_GRAPHQL_API_KEY,
};

Amplify.configure(AMPLIFY_CONFIG);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Log in" }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ title: "Forgot Password" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
