import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'

const MovieCard = ({id, poster_path, title, vote_average, release_date} : Movie) => {
    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className='w-[30%]'>
                <Image 
                    source={{uri: poster_path ?
                         `https://image.tmdb.org/t/p/w500${poster_path}`:
                         'https://placeholder.com/600x400/1a1a1a/ffffff.png'}} 
                    className='w-full h-[200px] rounded-lg' //or use h-52
                    resizeMode='cover'
                />
                <Text className='text-white mt-2 font-bold' numberOfLines={1}>{title}</Text>
                <View className='flex-row items-center justify-start gap-x-1'>
                    <Image source={icons.star} className='size-4' />
                    <Text className='text-white text-xs font-bold uppcase'>{Math.round(vote_average)}</Text>
                </View>

                <View className='flex-row items-center justify-between'>
                    <Text className='text-white text-xs uppercase'>{release_date?.split('-')[0]}</Text>
                    {/* <Text className='text-xs font-medium text-light-300 upprcase'>Movie</Text> */}
                </View>
            </TouchableOpacity>
        </Link>  
    
    )
}

export default MovieCard