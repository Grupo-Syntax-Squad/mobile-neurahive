import React, { useState } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from "react-native"
import CustomInput from "./CustomInput"

interface Props {
    data: any[]
    selectedItems: any[]
    setSelectedItems: React.Dispatch<React.SetStateAction<any[]>>
    placeholder: string
}

const MultiSelect = ({ data, selectedItems, setSelectedItems, placeholder }: Props) => {
    const [filter, setFilter] = useState("")

    const filteredData = data
        .filter(item => !selectedItems.includes(item.id))
        .filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))

    const toggleSelection = (item: any) => {
        if (selectedItems.includes(item.id)) {
            setSelectedItems(selectedItems.filter(id => id !== item.id))
        } else {
            setSelectedItems([...selectedItems, item.id])
        }
    }

    return (
        <View style={styles.container}>
            <CustomInput
                placeholder={placeholder}
                value={filter}
                onChangeText={setFilter}
            />

            <View style={styles.optionsWrapper}>
                <ScrollView
                    style={styles.scroll}
                    nestedScrollEnabled
                    keyboardShouldPersistTaps="handled"
                >
                    {filteredData.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.option}
                            onPress={() => toggleSelection(item)}
                        >
                            <Text style={styles.optionText}>{item.name} ({item.theme})</Text>
                        </TouchableOpacity>
                    ))}
                    {filteredData.length === 0 && (
                        <Text style={styles.noOptionsText}>Nenhuma opção encontrada</Text>
                    )}
                </ScrollView>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.selectedContainer}
            >
                {selectedItems.map(id => {
                    const item = data.find(i => i.id === id)
                    if (!item) return null
                    return (
                        <View key={item.id} style={styles.chip}>
                            <Text style={styles.chipText}>{item.name}</Text>
                            <TouchableOpacity
                                onPress={() => toggleSelection(item)}
                                style={styles.chipRemove}
                            >
                                <Text style={styles.chipRemoveText}>X</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    optionsWrapper: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#fff",
        maxHeight: 200,
        overflow: "hidden",
    },
    scroll: {
        paddingVertical: 5
    },
    option: {
        padding: 10,
    },
    optionText: {
        fontSize: 16,
    },
    noOptionsText: {
        fontStyle: "italic",
        padding: 10,
        color: "#aaa",
    },
    selectedContainer: {
        marginTop: 10,
    },
    chip: {
        backgroundColor: "#FF9500",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        marginRight: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    chipText: {
        color: "#fff",
        fontSize: 14,
        marginRight: 5,
    },
    chipRemove: {
        padding: 2,
    },
    chipRemoveText: {
        color: "#fff",
        fontWeight: "bold",
    },
})

export default MultiSelect
