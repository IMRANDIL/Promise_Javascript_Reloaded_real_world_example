// Import necessary modules
const axios = require('axios');

// Define the TimeLimitedCache class
class TimeLimitedCache {
    constructor() {
        this.cache = new Map();  // Using Map to store cached data
    }

    // Method to set data in the cache
    set(key, value, duration) {
        let found = this.cache.has(key);
        if (found) clearTimeout(this.cache.get(key).ref);  // Clear previous timeout
        this.cache.set(key, {
            value,
            ref: setTimeout(() => this.cache.delete(key), duration)
        });
        return found;
    }

    // Method to get data from the cache
    get(key) {
        return this.cache.has(key) ? this.cache.get(key).value : null;
    }

    // Method to get count of cached items
    count() {
        return this.cache.size;
    }
}

// Create a singleton instance of the cache
const cache = new TimeLimitedCache();

// Function to fetch data from an API
async function fetchDataFromAPI(url) {
    try {
        const response = await axios.get(url);
        const data = response?.data
        return data;
    } catch (error) {
        console.error('Error fetching data from API:', error);
        throw error;
    }
}

// Function to use the cache and fetch data from API if necessary
async function getCachedDataOrFetch(apiUrl, cacheKey, cacheDuration) {
    let cachedData = cache.get(cacheKey);
    if (cachedData) {
        console.log('Data found in cache.');
        return cachedData;
    } else {
        console.log('Fetching data from API...');
        const data = await fetchDataFromAPI(apiUrl);
        cache.set(cacheKey, data, cacheDuration);
        return data;
    }
}

// Usage example
exports.fetchData = async () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
    
    // Generate a unique cache key based on the API URL and any additional parameters
    const cacheKey = `${apiUrl}_GET`; // Example: `${apiUrl}_${method}`

    const cacheDuration = 60000; // Cache data for 1 minute (60000 milliseconds)

    try {
        // Get data from cache or fetch from API if not cached
        const data = await getCachedDataOrFetch(apiUrl, cacheKey, cacheDuration);
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
