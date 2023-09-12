import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";

export default function Hints({ country }) {
    const [hintIndex, setHintIndex] = useState(0);
    const [hintText, setHintText] = useState('');

    function getHintMessage() {  
    
        // Capital City Hint
        const capitalHint = `The capital city of this country is ${country.capital_city}.`;
    
        // Continent Hint
        const continent = country.continent;
        let continentHint = `This country is located in `;
    
        if (continent.length === 1) {
          continentHint += `${continent[0]}.`;
        } else {
          continentHint += `${continent[0]} & ${continent[1]}.`;
        }
    
        // Poulation Hint
        const populationHint = `The number of inhabitants in this country is approximately ${country.population.toLocaleString()}.`;
    
        // Area Hint
        const areaHint = `This country covers an area of approximately ${country.area.toLocaleString()} km².`;
    
        // Language Hint
        const languages = country.languages;
    
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
        const currencyHint = `The currency used here is ${country.currency}.`;
    
        // Border Hint
        const borders = country.bordering;
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
    
        const hints = [
          continentHint,
          capitalHint,
          languageHint,
          borderHint,
          populationHint,
          areaHint,
          currencyHint,
        ];
    
        setHintText(hints[hintIndex % hints.length])
        setHintIndex(hintIndex + 1 % hints.length);
      }

      return (
        <View>
            <Pressable onPress={getHintMessage} style={styles.q_button}>
                <Text style={{ color: "white", fontSize: 24, fontFamily: 'Inria Sans' }}>HINT</Text>
            </Pressable>
            <Text style={{ color: "white", fontSize: 24, fontFamily: 'Inria Sans', textAlign: 'center', marginLeft: 30, marginRight: 30 }}>{hintText}</Text>
        </View>
      )
}

const styles = StyleSheet.create({
  q_button: {
    backgroundColor: "#216370",
    borderRadius: 8,
    borderColor: "#1C545F",
    borderWidth: 4,
    color: "white",
    height: 60,
    width: 300,
    margin: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
