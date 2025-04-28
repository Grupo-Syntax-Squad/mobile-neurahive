import React from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"

interface Props {
    data: any[]
    selectedItems: any[]
    setSelectedItems: React.Dispatch<React.SetStateAction<any[]>>
}

const MultiSelect = ({ data, selectedItems, setSelectedItems }: Props) => {
    const toggleSelection = (item: any) => {
        if (selectedItems.includes(item.id)) {
            setSelectedItems(selectedItems.filter((id) => id !== item.id))
        } else {
            setSelectedItems([...selectedItems, item.id])
        }
    }

    const renderItem = ({ item }: { item: any }) => {
        const isSelected = selectedItems.includes(item.id)
        return (
            <TouchableOpacity
                style={[styles.item, isSelected && styles.selectedItem]}
                onPress={() => toggleSelection(item)}
            >
                <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        marginVertical: 5,
        borderRadius: 5,
    },
    selectedItem: {
        backgroundColor: "#cce5ff",
    },
    itemText: {
        fontSize: 16,
    },
})

export default MultiSelect
