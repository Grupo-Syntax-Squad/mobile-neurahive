import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Legend = () => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={[styles.colorBox, { backgroundColor: '#16ae03' }]} />
        <Text style={styles.text}>Usuários Ativos</Text>
      </View>

      <View style={styles.item}>
        <View style={[styles.colorBox, { backgroundColor: '#ae1a03' }]} />
        <Text style={styles.text}>Usuários Inativos</Text>
      </View>
    </View>
  );
};

export default Legend;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
});
