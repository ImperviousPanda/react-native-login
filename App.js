import React from "react";
import * as Linking from "expo-linking";
import Amplify from "aws-amplify";
import Login from "./src/Login";
import Home from "./src/Home";
import VerifyPhoneNumber from "./src/VerifyPhoneNumber";
import UpdatePhoneNumber from "./src/UpdatePhoneNumber";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  API_URL,
  REGION,
  COGNITO_USER_POOL_ID,
  COGNITO_IDENTITY_POOL_ID,
  COGNITO_USER_POOL_WEB_CLIENT_ID,
  OAUTH_DOMAIN,
} from "@env";
import * as WebBrowser from "expo-web-browser";

async function urlOpener(url, redirectUrl) {
  if (redirectUrl.includes("/--/sign-out")) {
    return Promise.resolve(true);
  }
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl
  );

  if (type === "success" && Platform.OS === "ios") {
    WebBrowser.dismissBrowser();
    return Linking.openURL(newUrl);
  }
}

const Stack = createNativeStackNavigator();

const awsconfig = {
  Auth: {
    mandatorySignIn: true,
    region: REGION,
    userPoolId: COGNITO_USER_POOL_ID,
    identityPoolId: COGNITO_IDENTITY_POOL_ID,
    userPoolWebClientId: COGNITO_USER_POOL_WEB_CLIENT_ID,
  },
  oauth: {
    domain: OAUTH_DOMAIN,
    scope: ["phone", "email", "openid", "aws.cognito.signin.user.admin"],
    redirectSignIn: Linking.createURL("sign-in"),
    redirectSignOut: Linking.createURL("sign-out"),
    responseType: "code",
    urlOpener,
  },
  federationTarget: "COGNITO_USER_POOLS",
  aws_cognito_username_attributes: ["EMAIL"],
  API: {
    endpoints: [
      {
        name: "notes",
        endpoint: API_URL,
        region: "eu-west-1",
      },
    ],
  },
};

Amplify.configure(awsconfig);

function App() {
  // useEffect(async () => {
  //   const notes = await API.get("notes", "/notes");
  //   console.log("notes: ", notes);
  // });

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UpdatePhoneNumber" component={UpdatePhoneNumber} />
        <Stack.Screen name="VerifyPhoneNumber" component={VerifyPhoneNumber} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
