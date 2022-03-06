import { TextInput, SafeAreaView, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";

function VerifyPhoneNumber({ navigation }) {
  const [code, onCodeChange] = useState("");

  return (
    <SafeAreaView>
      <Text>Verify Phone Number</Text>
      <TextInput
        onChangeText={onCodeChange}
        value={code}
        placeholder="Enter code"
      />
      <Button title="Verify Phone Number" onPress={async () => {}} />
      <Button title="Send another code" onPress={async () => {}} />
    </SafeAreaView>
  );
}

export default VerifyPhoneNumber;
