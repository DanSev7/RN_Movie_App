// track the searches made by a user
import { Client, Databases, ID, Query } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID as string;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID as string;
const APPWRITE_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string;
const APPWRITE_PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string;
const APPWRITE_PROJECT_NAME = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME as string;


const client = new Client()
    .setEndpoint(`${APPWRITE_ENDPOINT}`)
    .setProject(`${APPWRITE_PROJECT_ID}`)

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    // if a document is found increment the searchCount field
    // if no document is found 
        // create a new document in Appwrite database -> 1 (initialize its count to 1)
try {
    
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('searchTerm', query)
    ]);
    
    console.log("Result : ", result);
    // check if a record of that search has already been stored
    if(result.documents.length > 0) {
        const existingMovie = result.documents[0];
        
        await database.updateDocument(
            DATABASE_ID,
            COLLECTION_ID,
            existingMovie.$id,
            {
                count: existingMovie.count + 1
            }
        )
    } else {
        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            searchTerm: query,
            movie_id: movie.id,
            title: movie.title, 
            count: 1,
            poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        })
    }
} catch (error) {
    console.error("Error updating search count: ", error);
    throw error;
}

}


export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.limit(5),
        Query.orderDesc('count'),
    ])
        
    return result.documents as unknown as TrendingMovie[];
        
    } catch (error) {
        console.log("Error fetching trending movies:", error)
        return undefined;
    }
};
