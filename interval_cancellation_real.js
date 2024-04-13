const fs = require('fs');

// Define the cancellable function for real-time updates
var cancellable = function(fn, args, t) {
    // Call fn immediately with the provided arguments
    fn.apply(null, args);

    // Set up an interval to call fn repeatedly every t milliseconds
    const timer = setInterval(() => fn.apply(null, args), t);
    // Define cancelFn function to clear the interval
    const cancelFn = () => clearInterval(timer);

    // Return the cancelFn function
    return cancelFn;
};

// Define the function to read stock data from a JSON file
const readStockDataFromFile = () => {
    console.log('Reading stock data from file...'); // Log each time the function is called
    // Read stock data from the JSON file (replace with actual file path)
    const stockData = fs.readFileSync('stocks.json', 'utf8');
    return JSON.parse(stockData);
};

// Define the function to update the dashboard with new stock data
const updateDashboard = (stockData) => {
    // Update the dashboard UI with the latest stock data
    console.log('Dashboard updated with new stock data:', stockData);
    // Update dashboard UI (replace with actual UI update code)
};

// // Define the function to update the stocks.json file with new data
// const updateStockDataToFile = (newStockData) => {
//     // Convert the new stock data to JSON format
//     const jsonData = JSON.stringify(newStockData, null, 2);
    
//     // Append the JSON data to the stocks.json file
//     fs.appendFileSync('stocks.json', jsonData);
//     console.log('New stock data appended to stocks.json file.');
// };

// Usage example:
// Start real-time updates for the dashboard
const cancelRealTimeUpdates = cancellable(readStockDataFromFile, [], 5000); // Update interval: 5000ms (5 seconds)

// Simulate closing the dashboard after 20 seconds
setTimeout(() => {
    cancelRealTimeUpdates(); // Cancel real-time updates
    console.log('Dashboard closed or inactive. Real-time updates stopped.');
}, 20000); // Simulate closing the dashboard after 20 seconds
