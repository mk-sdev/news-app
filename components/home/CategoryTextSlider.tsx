import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors' // Ensure this path and import are correct

export default function CategoryTextSlider() {
  const [active, setActive] = useState(1)

  const categoryList = [
    { id: 1, name: 'Latest' },
    { id: 2, name: 'World' },
    { id: 3, name: 'Sport' },
    { id: 4, name: 'Finance' },
    { id: 5, name: 'Politics' },
    { id: 6, name: 'Culture' },
  ]

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categoryList}
        keyExtractor={item => item.id.toString()}
        // contentContainerStyle={{width: '100%'}}
        renderItem={({ item }) => (
          <Pressable onPress={() => setActive(item.id)}>
            <Text
              style={
                item.id === active ? styles.selectText : styles.unselectText
              }
            >
              {item.name}
            </Text>
          </Pressable>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  unselectText: {
    marginRight: 15,
    fontSize: 17,
    fontWeight: 'bold', // Example weight, you can change this as needed
    color: Colors.gray, // Use `color` to set the text color
  },
  selectText: {
    marginRight: 15,
    fontSize: 17,
    color: Colors.primary, // Use `color` to set the text color
    fontWeight: 'bold', // Example weight, you can change this as needed
  },
})
