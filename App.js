import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Haptics from "expo-haptics";
import { Audio, playInSilentModeIos } from "expo-av";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Keyboard,
  Platform,
  StatusBar as StatusBarRN,
} from "react-native";
import {
  useFonts,
  InriaSans_300Light,
  InriaSans_300Light_Italic,
  InriaSans_400Regular,
  InriaSans_400Regular_Italic,
  InriaSans_700Bold,
  InriaSans_700Bold_Italic,
} from '@expo-google-fonts/inria-sans';

import flags from "./components/flags";
import Hints from "./components/hints/hints";

const countries = [
  {
    name: ["Kingdom of Norway", "Norway"],
    continent: ["Europe"],
    capital_city: "Oslo",
    languages: ["Norwegian", "Sami", "Kven", "Romani", "Scandoromani"],
    population: 5488984,
    area: 385207,
    currency: "Norwegian Krone (NOK)",
    bordering: ["Sweden", "Finland", "Russia"],
    flag: flags.norway,
  },
  {
    name: ["Scotland"],
    continent: ["Europe"],
    capital_city: "Edinburgh",
    languages: ["English", "Scots", "Scots Gaelic"],
    population: 5480000,
    area: 78772,
    currency: "Pound Sterling (GBP)",
    bordering: ["England"],
    flag: flags.scotland,
  },
  {
    name: ["Japan"],
    continent: ["Asia"],
    capital_city: "Tokyo",
    languages: ["Japanese"],
    population: 125416877,
    area: 377945,
    currency: "Japanese Yen (JPY)",
    bordering: [],
    flag: flags.japan,
  },
  {
    name: ["Italian Republic", "Republic of Italy", "Italy"],
    continent: ["Europe"],
    capital_city: "Rome",
    languages: ["Italian"],
    population: 58853284,
    area: 301338,
    currency: "Euro (EUR)",
    bordering: [
      "France",
      "Switzerland",
      "Austria",
      "Slovenia",
      "San Marino",
      "Holy See",
    ],
    flag: flags.italy,
  },
  {
    name: ["Commonwealth of Australia ", "Australia"],
    continent: ["Oceania"],
    capital_city: "Canberra",
    languages: ["English"],
    population: 26723700,
    area: 7692024,
    currency: "Australian Dollar (AUD)",
    bordering: [],
    flag: flags.australia,
  },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [formData, setFormData] = useState({ textInputValue: '' });

  // Custom Sound
  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('./assets/Correct.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    })
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Custom Font
  let [fontsLoaded] = useFonts({
    InriaSans_300Light,
    InriaSans_300Light_Italic,
    InriaSans_400Regular,
    InriaSans_400Regular_Italic,
    InriaSans_700Bold,
    InriaSans_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }

  function handleInputChange(text) {
    setFormData({ ...formData, textInputValue: text });
  }

  function handleGuess() {
    const currentCountryIndex = index;

    if (currentCountryIndex === null) {
      console.log('All countries guessed!');
      return;
    }

    const currentCountry = countries[currentCountryIndex];
    console.log(currentCountry.name);
    console.log(formData.textInputValue);

    const isCorrect = currentCountry.name.some(
      (name) => name.toLowerCase() === formData.textInputValue.toLowerCase()
    );

    if (isCorrect) {
      console.log('Correct!');
      handleCorrectAnswer();
      playSound();
      Haptics.impactAsync(
        Haptics.ImpactFeedbackStyle.Heavy
      )
    } else {
      console.log('Incorrect!');
    }
  }

  function handleCorrectAnswer() {
    setFormData({ textInputValue: '' }); // Clear the input
    setIndex((prevIndex) => (prevIndex + 1) % countries.length);
    Keyboard.dismiss();
  }

  const Flag = countries[index].flag;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progress_container}>
        <View style={styles.progress_percentage}>
          <View style={styles.progress_highlight} />
        </View>
      </View>
      <Text style={{ fontSize: 24, color: "white", fontFamily: 'InriaSans_400Regular', }}>WHAT COUNTRY IS THIS?</Text>
      <Flag style={{ margin: 50 }} width={300} height={180} />
      <TextInput value={formData.textInputValue} onChangeText={handleInputChange} onSubmitEditing={handleGuess} style={styles.input} />
      <Pressable 
        onPress={handleGuess}
        style={styles.q_button}
      >
        <Text style={{ color: "white", fontSize: 24, fontFamily: 'InriaSans_400Regular' }}>CHECK</Text>
      </Pressable>
      <Hints country={countries[index]}/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10454f",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBarRN.currentHeight : 0,
  },
  progress_container: {
    width: 250,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#818274",
    margin: 20,
  },
  progress_percentage: {
    width: "50%",
    height: 12,
    borderRadius: 6,
    backgroundColor: "#A3AB78",
  },
  progress_highlight: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "#c7d192",
    marginLeft: 6,
    marginRight: 6,
    marginTop: 2,
  },
  input: {
    height: 60,
    width: 300,
    backgroundColor: "#0E3A42",
    borderRadius: 8,
    margin: 20,
    fontFamily: 'InriaSans_400Regular',
    fontSize: 24,
    color: "white",
    paddingLeft: 20,
  },
  q_button: {
    backgroundColor: "#216370",
    borderRadius: 8,
    borderColor: "#1C545F",
    borderWidth: 4,
    color: "white",
    height: 60,
    width: 300,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
