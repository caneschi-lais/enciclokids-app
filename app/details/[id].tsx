import { LinearGradient } from "expo-linear-gradient"; // transition
import { Stack, useLocalSearchParams } from "expo-router"; //parametro na url
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator, // loading
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: string[];
    stats: { name: string; value: number }[];
    image: string;
}

export default function DetailsScreen() {
    const { id } = useLocalSearchParams();
    const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
    const [loading, setLoading] = useState(true);

    {/* buscar pokemon */}
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPokemon({
                    id: data.id,
                    name: data.name,
                    height: data.height / 10,
                    weight: data.weight / 10,
                    types: data.types.map((t: any) => t.type.name),
                    stats: data.stats.map((s: any) => ({
                        name: s.stat.name,
                        value: s.base_stat,
                    })),
                    image:
                        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
                });
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, [id]);

    {/* carregando se n tem pokemon */}
    if (loading || !pokemon) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#E50914" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* navbar */}
            <Stack.Screen
                options={{
                    title: pokemon.name.toUpperCase(),
                    headerTintColor: "#fff",
                    headerStyle: { backgroundColor: "rgb(6, 35, 53)" },
                }}
            />

            {/* pokemon fundo */}
            <ImageBackground
                source={{ uri: pokemon.image }}
                style={styles.headerImage}
                blurRadius={5}
            >
                <LinearGradient
                    colors={["transparent", "rgb(6, 35, 53)"]}
                    style={styles.gradient}
                />
            </ImageBackground>

            {/* pokemon frente */}
            <View style={styles.content}>
                <Image
                    source={{ uri: pokemon.image }}
                    style={styles.mainImage}
                    resizeMode="contain"
                />

                <Text style={styles.title}>{pokemon.name}</Text>

                {/* tipos */}
                <View style={styles.tags}>
                    {pokemon.types.map((type) => (
                        <View key={type} style={styles.tag}>
                            <Text style={styles.tagText}>{type}</Text>
                        </View>
                    ))}
                </View>

                {/* caracteristicas */}
                <View style={styles.statsContainer}>
                    <Text style={styles.statText}>
                        Altura: {pokemon.height}m
                    </Text>
                    <Text style={styles.statText}>
                        Peso: {pokemon.weight}kg
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#051C2C" },
    loadingContainer: {
        flex: 1,
        backgroundColor: "#051C2C",
        justifyContent: "center",
        alignItems: "center",
    },
    headerImage: {
        width: "100%",
        height: 300,
        opacity: 0.5,
        position: "absolute",
    },
    gradient: { flex: 1 },
    content: { alignItems: "center", marginTop: 100 },
    mainImage: { width: 250, height: 250, zIndex: 1 },
    title: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "bold",
        textTransform: "capitalize",
        marginTop: 10,
    },
    tags: { flexDirection: "row", marginTop: 10 },
    tag: {
        backgroundColor: "#0D4A6E",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    tagText: { color: "#fff", textTransform: "capitalize" },
    statsContainer: { flexDirection: "row", marginTop: 20, gap: 20 },
    statText: { color: "#aaa", fontSize: 16 },
});
