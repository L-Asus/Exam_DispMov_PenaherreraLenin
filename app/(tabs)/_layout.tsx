import { SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Platform,Text,View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false)

  useEffect(()=>{
    const prepare =async() =>{
      await SplashScreen.preventAutoHideAsync()
      await new Promise(resolve => setTimeout(resolve,5000))
      setIsReady(true)
      await SplashScreen.hideAsync()
    }
    prepare()
  },[])

  if(!isReady){
    return(
      <View className='flex-1 justify-center items-center bg-slate-50'>
        <Text className='text-black text-3xl font-bold mb-2 text-center'>
          Universidad Central del Ecuador
        </Text>
        <Image source={require("../../assets/images/elecciones2025.jpg")}/>
        <ActivityIndicator size={"large"} color={"#636AE8"}/>
      </View>
    )
  }

  return (
      <Tabs
      screenOptions={{
        tabBarActiveTintColor:"blue",
        tabBarInactiveTintColor:"gray",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'About',
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="person" color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="wechat" color={color} />,
        }}
      />
      <Tabs.Screen
        name="data"
        options={{
          title: 'Resultados',
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="pie-chart" color={color} />,
        }}
      />
    </Tabs>
  );
}
