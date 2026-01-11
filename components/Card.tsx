import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Pokemon } from "../services/api";

// destaque do pokemon
export default function Card({ item }: { item: Pokemon | null }) {
    if (!item) return null;

    return (
        // destaque do pokemon
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="contain"
            >
                <LinearGradient
                    colors={["transparent", "#000"]}
                    style={styles.gradient}
                >
                    <Text style={styles.featuredTitle}>Top 1</Text>
                    <Text style={styles.name}>{item.name}</Text>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 400,
        marginBottom: 20,
        backgroundColor: "#051C2C",
    },
    image: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
    },
    gradient: {
        height: "50%",
        justifyContent: "flex-end",
        padding: 20,
    },
    featuredTitle: {
        color: "#0D4A6E",
        fontWeight: "bold",
        letterSpacing: 2,
        fontSize: 14,
        marginBottom: 5,
    },
    name: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "bold",
        textTransform: "capitalize",
    },
});
