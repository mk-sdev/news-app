import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { Entypo } from '@expo/vector-icons'
import { useColorScheme } from '@/hooks/useColorScheme'
import { FontAwesome } from '@expo/vector-icons'
import {Text, View} from 'react-native'
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

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(home)"
          options={{
            headerBackTitleVisible: false,
            headerTitle: '',
            headerTransparent: true,
            headerShadowVisible: false,
            headerSearchBarOptions: {
              placeholder: 'search',
              // width: '90%'
            },
            headerLeft: () => (
              <View style={{
                flexDirection: 'row', gap: 15, alignItems: 'center'
              }}>
              <FontAwesome name="newspaper-o" size={24} color="black" />
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: Colors.primary,
                  }}
                >
                  Daily News
                </Text>

              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Article"
          options={{
            headerBackTitleVisible: false,
            headerTitle: '',
            // headerTransparent: true,
            headerShadowVisible: false,
            headerSearchBarOptions: {
              placeholder: 'search',
            },
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  )
}
