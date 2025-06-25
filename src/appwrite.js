import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // ✅ Make sure this is correct
    .setProject(PROJECT_ID);

const database = new Databases(client);

// ✅ Function to update search count
export const updateSearchCount = async (searchText, movie) => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal("searchText", searchText)]
        );

        if (result.documents.length > 0) {
            const doc = result.documents[0];

            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                doc.$id,
                {
                    count: doc.count + 1,
                }
            );
        } else {
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    searchText,
                    count: 1,
                    movie_id: movie.id,
                    poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                }
            );
        }
    } catch (error) {
        console.error("Error updating search count:", error);
    }
};

// ✅ Function to get top 5 trending movies
export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.orderDesc("count"),
                Query.limit(5),
            ]
        );

        return result.documents;

    } catch (error) {
        console.error("Error getting trending movies:", error);
        return []; // Important fallback
    }
};
