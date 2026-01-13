// service/appwrite.ts

/**
 * Service to track movie search analytics using Appwrite.
 * This tracks how many times a specific movie/term has been searched 
 * to generate a "Trending" list.
 */
import { Client, Databases, ID, Query } from 'react-native-appwrite';

// --- Configuration Constants ---
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID as string;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID as string;
const APPWRITE_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string;
const APPWRITE_PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string;

// Initialize the Appwrite Client
const client = new Client()
    .setEndpoint(`${APPWRITE_ENDPOINT}`)
    .setProject(`${APPWRITE_PROJECT_ID}`);

const database = new Databases(client);

/**
 * Updates the database whenever a user performs a search.
 * It follows an "Upsert" logic: Update if exists, Insert if new.
 */
export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        // 1. Check if the search term already exists in the database
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', query)
        ]);

        // 2. If a record is found, increment its search count
        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];

            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1 // Increment popularity
                }
            );
        } 
        // 3. If no record exists, create a new document for this search term
        else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: query,
                movie_id: movie.id,
                title: movie.title,
                count: 1, // Start at 1
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            });
        }
    } catch (error) {
        console.error("Error updating search count: ", error);
        throw error;
    }
}

/**
 * Retrieves the top 5 most searched movies.
 * Used for the 'Trending Movies' section of the UI.
 */
export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),            // Fetch only the top 5
            Query.orderDesc('count'),  // Sort by highest count first
        ]);

        // Cast the Appwrite documents to our TrendingMovie interface
        return result.documents as unknown as TrendingMovie[];

    } catch (error) {
        console.log("Error fetching trending movies:", error);
        return undefined;
    }
};
