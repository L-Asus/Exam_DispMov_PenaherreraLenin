import {Text,Image,Linking,TouchableOpacity,View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 items-center justify-center p-6'>
      <View className='items-center'>
        <Image
        source={require("../../assets/images/avatar.png")}
        className='w-24 h-24'/>
        <Text className='text-2xl font-bold mt-2'>@L-Asus</Text>
      </View>

      <View className='p-4 flex flex-col items-center'>
        <Text className='text-xl font-bold text-center m-2'>REDES SOCIALES</Text>
        <View className='flex flex-row items-center gap-4 mt-8'>
          <Ionicons name="logo-github" size={24} color={"black"}/>
          <Text className='text-xl font-bold text-blue-700 underline' 
          onPress={() => Linking.openURL('https://github.com/L-Asus')}>GitHub</Text>
        </View>
        {/* <View className='flex flex-row items-center gap-4 mt-8'>
          <MaterialCommunityIcons name="linkedin" size={24} color={'blue'}/>
          <Text className='text-xl font-bold text-blue-700 underline'
          onPress={()=> Linking.openURL("https://www.linkedin.com/in/carlos-steeven-o%C3%B1a-cantu%C3%B1a-632804352/")}>
            Linkedin
          </Text>
        </View> */}
      </View>
    </View>
    </SafeAreaView>
  );
}