import { Colors } from '@/constants/Colors'; // Ensure this path and import are correct
import { Category } from '@/utils/types'
import React, { useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'

export default function CategoryTextSlider({
  selectCategory,
}: {
  selectCategory: (c: Category) => void
}) {
  const [active, setActive] = useState(1)

  const categoryList: Array<{ id: number; name: Category }> = [
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
        contentContainerStyle={{
          paddingLeft: 20,
          paddingBottom: 10,
        }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              setActive(item.id)
              selectCategory(item.name)
            }}
          >
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
    fontWeight: 'bold', 
    color: Colors.gray, 
  },
  selectText: {
    marginRight: 15,
    fontSize: 17,
    color: Colors.primary, 
    fontWeight: 'bold', 
  },
})
