import { Link } from "expo-router";
import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity, // responde a toques, diminuindo a opacidade do conteúdo
} from "react-native";
import { Pokemon } from "../services/api";

// cartaz do pokemon
export default function Poster({ item }: { item: Pokemon }) {
    return (
        // navegação p/ detalhes
        <Link href={`/details/${item.id}`} asChild>
            <TouchableOpacity style={styles.container}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        marginRight: 10,
        width: 120,
        alignItems: "center",
    },
    image: {
        width: 120,
        height: 170,
        borderRadius: 8,
        backgroundColor: "#333",
    },
    title: {
        color: "#fff",
        marginTop: 5,
        fontSize: 12,
        textTransform: "capitalize",
        fontWeight: "bold",
    },
});
