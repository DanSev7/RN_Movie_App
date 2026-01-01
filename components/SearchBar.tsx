import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface Props {
    placeholder: string;
    onPress?: () => void;
}
const SearchBar = ({placeholder, onPress}: Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rouded-full px-5 py-4'>
        <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#AB8BFF" />
        <TextInput 
            onPress={onPress}
            placeholder={placeholder} 
            value=''
            onChangeText={() => {}}
            placeholderTextColor="#A8B5DB"
            className='flex-1 text-white ml-2' 
        />
    </View>
  )
}

export default SearchBar 