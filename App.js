import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import flags from "./components/flags";

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
  const [hintIndex, setHintIndex] = useState(0);
  const [hintText, setHintText] = useState('');

  // Custom Font
  const [fontsLoaded] = useFonts({
    'Inria Sans': require('./assets/fonts/Inria Sans.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

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
    } else {
      console.log('Incorrect!');
    }
  }

  function handleCorrectAnswer() {
    setFormData({ textInputValue: '' }); // Clear the input
    setHintText('');
    setIndex((prevIndex) => (prevIndex + 1) % countries.length);
    setHintIndex(0);
  }

  function handleHint() {
    const currentCountry = countries[index];


    // Capital City Hint
    const capitalHint = `The capital city of this country is ${currentCountry.capital_city}.`;

    // Continent Hint
    const continent = currentCountry.continent;
    let continentHint = `This country is located in `;

    if (continent.length === 1) {
      continentHint += `${continent[0]}.`;
    } else {
      continentHint += `${continent[0]} & ${continent[1]}.`;
    }

    // Poulation Hint
    const populationHint = `The number of inhabitants in this country is approximately ${currentCountry.population.toLocaleString()}.`;

    // Area Hint
    const areaHint = `This country covers an area of approximately ${currentCountry.area.toLocaleString()} km².`;

    // Language Hint
    const languages = currentCountry.languages;
    console.log(languages)
    let languageHint = `This country's official `;

    if (languages.length === 1) {
      languageHint += `language is ${languages[0]}.`;
    } else if (languages.length === 2) {
      languageHint += `languages are ${languages[0]} & ${languages[1]}.`;
    } else {
      const allLanguages = [...languages];
      const lastLanguage = allLanguages.pop();
      languageHint += `languages are ${allLanguages.join(", ")} & ${lastLanguage}.`;
    }
    

    // Currency Hint
    const currencyHint = `The currency used here is ${currentCountry.currency}.`;

    // Border Hint
    const borders = currentCountry.bordering;
    let borderHint = `This country shares `;

    if (borders.length === 0) {
      borderHint += `no borders.`;
    } else if (borders.length === 1) {
      borderHint += `a border with ${borders[0]}.`;
    } else if (borders.length === 2) {
      borderHint += `a border with & ${borders[0]} & ${borders[1]}.`;
    } else {
      const allBorders = [...borders];
      const lastBorder = allBorders.pop();
      borderHint += `a border with ${allBorders.join(", ")} & ${lastBorder}.`;
    }

    // Randomly select a hint message
    const hintMessages = [
      continentHint,
      capitalHint,
      languageHint,
      borderHint,
      populationHint,
      areaHint,
      currencyHint,
    ];

    setHintText(hintMessages[hintIndex]);
    setHintIndex((prevIndex) => (prevIndex + 1) % hintMessages.length);
  }

  const Flag = countries[index].flag;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progress_container}>
        <View style={styles.progress_percentage}>
          <View style={styles.progress_highlight} />
        </View>
      </View>
      <Text style={{ fontSize: 24, color: "white", fontFamily: 'Inria Sans', }}>WHAT COUNTRY IS THIS?</Text>
      <Flag style={{ margin: 50 }} width={300} height={180} />
      <TextInput value={formData.textInputValue} onChangeText={handleInputChange} style={styles.input} />
      <Pressable onPress={handleGuess} style={styles.q_button}>
        <Text style={{ color: "white", fontSize: 24, fontFamily: 'Inria Sans' }}>CHECK</Text>
      </Pressable>
      <Pressable onPress={handleHint} style={styles.q_button}>
        <Text style={{ color: "white", fontSize: 24, fontFamily: 'Inria Sans' }}>HINT</Text>
      </Pressable>
      <Text style={{ color: "white", fontSize: 24, fontFamily: 'Inria Sans', textAlign: 'center', marginLeft: 30, marginRight: 30 }}>{hintText}</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#10454f",
    alignItems: "center",
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
    fontFamily: 'Inria Sans',
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
