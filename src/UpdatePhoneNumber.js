import { TextInput, SafeAreaView, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

function UpdatePhoneNumber({ navigation }) {
  const [phone, onPhoneChange] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Text>Enter Phone Number</Text>
      <TextInput
        placeholder="+12345678912"
        onTextChange={onPhoneChange}
        value={phone}
      />
      <Button
        title="Save Phone Number"
        onPress={async () => {
          const user = await Auth.currentAuthenticatedUser();
          await Auth.updateUserAttributes(user, { phone_number: phone });
          navigation.navigate("VerifyPhoneNumber");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
});

export default UpdatePhoneNumber;
