import Card from "@/components/Card";
import Footer from '@/components/Footer';
import React, { useEffect, useState } from "react";
import {
  FlatList, // renderiza listsa longa scrollavel
  ScrollView, // container scrollavel quando passa da tela
  StatusBar, // aparencia e comportamento do status do cel
  StyleSheet, // css
  Text,
  View, // bloco basico estilizavel p/ interface
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context"; // conteudo caber na tela
import Poster from "../components/Poster";
import { getPokemons, Pokemon } from "../services/api";

export default function HomeScreen() {
  const [heroPokemon, setHeroPokemon] = useState<Pokemon | null>(null); // pokemon principal
  const [list1, setList1] = useState<Pokemon[]>([]);
  const [list2, setList2] = useState<Pokemon[]>([]);

  {/* carregar dados */}
  useEffect(() => {
    async function loadData() {
      try {
        const heroData = await getPokemons(1, 24); // pokemon 25 (pikachu)
        if (heroData.length > 0) setHeroPokemon(heroData[0]);

        const data1 = await getPokemons(20, 0); // pokemons 1 ao 20
        setList1(data1);

        const data2 = await getPokemons(20, 20); // pokemons 20 ao 40
        setList2(data2);
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
  }, []);

  {/* renderiza título e lista de pokemon */}
  const renderSection = (title: string, data: Pokemon[]) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Poster item={item} />}
        keyExtractor={(item) =>
          item.id}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </View>
  );

  return (
    <SafeAreaProvider style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#051C2C" />
      <ScrollView style={styles.scroll}>
        <Card item={heroPokemon} />

        {/* carrega pokemons e titulo de cada secao */}
        {renderSection("Populares na PokeFlix", list1)}
        {renderSection("Minha Lista", list2)}
        {renderSection("Assista Novamente", list1)}

        <View style={{ height: 50 }} />

        <Footer />
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#051C2C",
  },
  scroll: {
    flex: 1,
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 10,
  },
});
