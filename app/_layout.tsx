import { useEffect, useMemo } from 'react'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import 'react-native-reanimated'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import {
  Text,
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Colors } from '@/constants/Colors'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  const theme = useMemo(
    () => (colorScheme === 'dark' ? DarkTheme : DefaultTheme),
    [colorScheme]
  )

  const headerLeft = () => (
    <View style={styles.headerLeftContainer}>
      <FontAwesome name="newspaper-o" size={24} color="black" />
      <Text style={styles.headerTitle}>Daily News</Text>
    </View>
  )

  const homeScreenOptions = {
    headerBackTitleVisible: false,
    headerTitle: '',
    headerTransparent: true,
    headerShadowVisible: false,
    headerSearchBarOptions: {
      placeholder: 'search',
      onChangeText: (event: NativeSyntheticEvent<TextInputChangeEventData>) =>
        console.log(event.nativeEvent.text),
    },
    headerLeft,
  }

  const articleScreenOptions = {
    headerBackTitleVisible: false,
    headerTitle: '',
    headerShadowVisible: false,
  }

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen name="(home)" options={homeScreenOptions} />
        <Stack.Screen name="Article" options={articleScreenOptions} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center' as const, // Specify `alignItems` as constant
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginLeft: 15, // Adding margin instead of `gap`
  },
})
