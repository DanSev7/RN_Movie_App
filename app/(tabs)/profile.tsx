import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const profile = () => {
  return (
    <View className='bg-primary flex-1 px-10'>
      <View className='flex flex-1 flex-col gap-5 justify-center items-center'>
        <Image 
          source={icons.person}
          className='size-10'
          tintColor="#fff"
        />
        <Text className='text-gray-500 text-base'>Profile</Text>
      </View>
    </View>
  )
}

export default profile