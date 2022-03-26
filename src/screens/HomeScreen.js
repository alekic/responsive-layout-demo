import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatGrid } from 'react-native-super-grid';

import useResponsiveValue from '../useResponsiveValue';

const items = [
  { name: 'TURQUOISE', code: '#1abc9c' },
  { name: 'EMERALD', code: '#2ecc71' },
  { name: 'PETER RIVER', code: '#3498db' },
  { name: 'AMETHYST', code: '#9b59b6' },
  { name: 'WET ASPHALT', code: '#34495e' },
  { name: 'GREEN SEA', code: '#16a085' },
  { name: 'NEPHRITIS', code: '#27ae60' },
  { name: 'BELIZE HOLE', code: '#2980b9' },
  { name: 'WISTERIA', code: '#8e44ad' },
  { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
  { name: 'SUN FLOWER', code: '#f1c40f' },
  { name: 'CARROT', code: '#e67e22' },
  { name: 'ALIZARIN', code: '#e74c3c' },
  { name: 'CLOUDS', code: '#ecf0f1' },
  { name: 'CONCRETE', code: '#95a5a6' },
  { name: 'ORANGE', code: '#f39c12' },
  { name: 'PUMPKIN', code: '#d35400' },
  { name: 'POMEGRANATE', code: '#c0392b' },
  { name: 'SILVER', code: '#bdc3c7' },
  { name: 'ASBESTOS', code: '#7f8c8d' },
];

export default function HomeScreen() {

  const itemDimension = useResponsiveValue({
    md: 180,
    lg: 240,
    xl: 300,
    default: 150
  });

  const renderItem = ({ item }) => (
    <View style={[styles.item, {
      backgroundColor: item.code,
      height: itemDimension
    }]}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemCode}>{item.code}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      <FlatGrid
        data={items}
        itemDimension={itemDimension}
        keyExtractor={item => item.code}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 5,
    justifyContent: 'flex-end',
    padding: 10
  },
  itemCode: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  itemName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});
