import { Text, SafeAreaView, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useIsFocused } from "@react-navigation/native";

function Home({ navigation }) {
  const [user, setUser] = useState(null);
  const isFocused = useIsFocused();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
    });
  });

  useEffect(async () => {
    try {
      const session = await Auth.currentAuthenticatedUser();
      setUser(session.username);
    } catch (err) {
      navigation.navigate("Login");
    }
  }, [isFocused]);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Home Here </Text>
      {user && <Text>{user}</Text>}
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
    </SafeAreaView>
  );
}

export default Home;
