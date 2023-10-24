import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  MESSAGES,
  addDoc,
  collection,
  firestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "./firebase/config";
import { convertFirebaseTimestamp } from "./helpers/Functions";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const q = query(
      collection(firestore, MESSAGES),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = [];

      querySnapshot.forEach((doc) => {
        //tempMessages.push(doc.data())
        const messageObject = {
          id: doc.id, // Document ID
          text: doc.data().text, // Document contents
          createdAt: convertFirebaseTimestamp(doc.data().createdAt), // Timestamp
        };
        tempMessages.push(messageObject);
      });
      setMessages(tempMessages);
    });
    return () => unsubscribe();
  }, []);

  const save = async () => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      createdAt: serverTimestamp(),
    }).catch((error) => console.log(error));
    setNewMessage("");
    console.log("New message saved");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.list}>
        {messages.map((message) => (
          <View style={styles.message} key={message.id}>
            <Text style={styles.messageInfo}>{message.createdAt}</Text>
            <Text>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Send message..."
        value={newMessage}
        onChangeText={(text) => setNewMessage(text)}
      />
      <Button onPress={save} title="Send" type={"button"} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    padding: 10,
    backgroundColor: "pink",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    width: "80%",
  },
  messageInfo: {
    fontSize: 12,
  },
  list: {
    width: "80%",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});
