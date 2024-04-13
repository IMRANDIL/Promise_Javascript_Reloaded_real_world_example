// Define the cancellable function with debounce
var cancellable = function(fn, args, t) {
    const timerId = setTimeout(() => fn.apply(null, args), t);

    const cancelFn = () => clearTimeout(timerId);

    return { cancel: cancelFn, timerId: timerId }; // Return both cancel function and timerId
};

// Define the asynchronous function to search data from a remote API
const searchAPI = async (query) => {
    // Simulate fetching data from the API based on the search query (replace with actual fetch request)
    console.log('Searching for:', query);
    // Simulate API call with delay (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay of 500ms
    const searchData = ['result1', 'result2', 'result3']; // Simulated search results
    return searchData;
};

// Usage example:
let searchInputTimer; // Variable to store the timer ID for debounce

// Function to perform a search with debounce
const debounceSearch = (query) => {
    // Clear previous timer and cancel ongoing search (if any)
    if (searchInputTimer && searchInputTimer.timerId) {
        searchInputTimer.cancel(); // Cancel ongoing search
    }
    
    // Start a new timer to execute the search after debounce period
    searchInputTimer = cancellable(searchAPI, [query], 300); // Debounce period: 300ms
};

// Example usage in a UI event handler (e.g., input change event)
const handleSearchInputChange = (event) => {
    const query = event.target.value;
    debounceSearch(query);
};

// Example UI event listener (e.g., for input element)
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', handleSearchInputChange);
