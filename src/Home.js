import { Text, SafeAreaView, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Auth, API } from "aws-amplify";

function Home({ navigation }) {
  const [user, setUser] = useState({});

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
    });
  });

  const phoneIsVerified = (attributes) => {
    for (const attribute of attributes) {
      if (attribute.Name === "phone_number_verified") {
        console.log("attribute ", attribute);
        return attribute.Value === "true";
      }
    }

    return false;
  };
  const phoneSet = (attributes) => {
    for (const attribute of attributes) {
      if (attribute.Name === "phone_number") {
        console.log("attribute ", attribute);
        return attribute.Name !== null && attribute.Name !== "";
      }
    }

    return false;
  };

  useEffect(async () => {
    try {
      const session = await Auth.currentAuthenticatedUser();
      session.getUserAttributes((err, attributes) => {
        if (err) {
          console.log("error is ", err);
        }

        if (!phoneSet(attributes)) {
          navigation.navigate("UpdatePhoneNumber");
        } else if (!phoneIsVerified(attributes)) {
          navigation.navigate("VerifyPhoneNumber");
        }
        setUser("test");
      });
    } catch (err) {
      navigation.navigate("Login");
    }
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Home Here </Text>
      {user && <Text>{JSON.stringify(user)}</Text>}
      {user && (
        <Button
          title="Sign Out"
          onPress={async () => {
            await Auth.signOut();
            setUser(null);
            navigation.navigate("Login");
          }}
        />
      )}
      {user && (
        <Button
          title="Get User"
          onPress={async () => {
            Auth.set;
            const user = await API.get("notes", "/users");
            console.log(user);
          }}
        />
      )}
      {user && (
        <Button
          title="Set Phone Number"
          onPress={async () => {
            const user = await Auth.currentAuthenticatedUser();
            console.log("user is ", JSON.stringify(user, null, 2));
            const response = await Auth.updateUserAttributes(user, {
              phone_number: "+31642709622",
            });
            console.log(response);
          }}
        />
      )}
      {user && (
        <Button
          title="Start Verify phone number"
          onPress={async () => {
            const user = await Auth.currentAuthenticatedUser();

            await Auth.verifyUserAttribute(user, "phone_number");
          }}
        />
      )}
      {user && (
        <Button
          title="Verify phone number"
          onPress={async () => {
            const user = await Auth.currentAuthenticatedUser();

            await Auth.verifyUserAttributeSubmit(
              user,
              "phone_number",
              "191439"
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

export default Home;
