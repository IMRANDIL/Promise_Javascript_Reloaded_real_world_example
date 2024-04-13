// Define the timeLimit function
var timeLimit = function(fn, t) {
    return async function(...args) {
        const originalFnPromise = fn(...args);

        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject('Time Limit Exceeded');
            }, t);
        });

        return Promise.race([originalFnPromise, timeoutPromise]);
    };
};

// Define the asynchronous function to fetch data from a remote API
const fetchDataFromAPI = async (endpoint) => {
    // Simulate fetching data from the API (replace with actual fetch request)
    await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate delay of 500ms
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
};

// Usage example:
const timeLimitedFetch = timeLimit(fetchDataFromAPI, 1000); // Set time limit to 1000ms (1 second)

// Call the time-limited function to fetch data from the API
(async()=>{
    try {
        const data = await timeLimitedFetch('https://jsonplaceholder.typicode.com/posts');
        console.log('Data received:', data);
    } catch (error) {
        console.error('Error:', error);
    }
})()

