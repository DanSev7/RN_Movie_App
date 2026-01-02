import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import { updateSearchCount } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

const search = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset
  } = useFetch(() => fetchMovies({
    query: searchQuery
  }), false) // false to disable auto fetch, in this case we don't want to auto fetch we just want the user to search for movies but on home screen we want auto fetch

  // 1. Effect for searching/fetching
useEffect(() => {
  const timeoutId = setTimeout(async () => {
    if (searchQuery.trim()) {
      await loadMovies();
    } else {
      reset();
    }
  }, 500);

  return () => clearTimeout(timeoutId);
}, [searchQuery]);

// 2. Effect for updating Appwrite (only when movies change)
useEffect(() => {
  const syncSearch = async () => {
    if (searchQuery.trim() && movies && movies.length > 0) {
      try {
        await updateSearchCount(searchQuery, movies[0]);
      } catch (err) {
        console.error("Appwrite sync failed", err);
      }
    }
  };

  syncSearch();
}, [movies]); // Runs whenever movies state is updated
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover' />

      <FlatList 
        data={movies} 
        renderItem={({ item }) => <MovieCard {...item} />} 
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16, 
          marginVertical: 16
        }}
        contentContainerStyle={{
          paddingBottom: 100
        }}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row  justify-center mt-20'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>

            <View className='my-5'> 
              <SearchBar 
                placeholder='Search movies ...' 
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className='my-3'
              />
            )}

            {error && (
              <Text className='text-red-500 text-center px-5 my-3'>
                Something went wrong!
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className='text-xl text-white font-bold'>
                Search Result for {' '}
                <Text className='text-accent'>{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500 font-bold'>
                {searchQuery.trim()? 'No movies found' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}

export default search