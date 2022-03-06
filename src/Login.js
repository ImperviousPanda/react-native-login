import React, { useEffect } from "react";
import { Button, SafeAreaView } from "react-native";
import { Auth, Hub, API } from "aws-amplify";

function Login({ navigation }) {
  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(() => {
        navigation.navigate("Home");
      })
      .catch(() => console.log("Not signed in"));
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
    });
  });

  useEffect(async () => {
    getUser();

    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          navigation.navigate("Home");
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Sign in failure", data);
          break;
      }
    });
  }, []);

  return (
    <SafeAreaView>
      <Button
        title="Log in with Google"
        onPress={() => Auth.federatedSignIn()}
      />
    </SafeAreaView>
  );
}

export default Login;
