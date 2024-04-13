const fs = require('fs');
const readline = require('readline');
// // Define the function to update the stocks.json file with new data
const updateStockDataToFile = (newStockData) => {
    // Read existing stock data from the JSON file
    const existingData = fs.readFileSync('stocks.json', 'utf8');
    let stocks = JSON.parse(existingData);

    // Append the new stock data to the existing array
    stocks = stocks.concat(newStockData);

    // Convert the updated stock data to JSON format
    const jsonData = JSON.stringify(stocks, null, 2);
    
    // Write the updated JSON data back to the stocks.json file
    fs.writeFileSync('stocks.json', jsonData);
    console.log('New stock data appended to stocks.json file.');
};

// // Define the function to update the stocks.json file with new data
// const updateStockDataToFile = (newStockData) => {
//     // Create a writable stream to append to the existing stocks.json file
//     const writeStream = fs.createWriteStream('stocks.json', { flags: 'a', encoding: 'utf8' });

//     // If the file exists and is not empty, append a comma before appending new data
//     const existingFileSize = fs.statSync('stocks.json').size;
//     if (existingFileSize > 0) {
//         writeStream.write(',');
//     }

//     // Append new stock data to the file
//     writeStream.write(JSON.stringify(newStockData));

//     // Close the write stream
//     writeStream.end();

//     console.log('New stock data appended to stocks.json file.');
// };



const newData = [
    { symbol: 'RITES', price: 140.50, change: '+0.20', percent_change: '+0.14%' },
    { symbol: 'ATL', price: 2300.10, change: '-1.30', percent_change: '-0.06%' }
];

updateStockDataToFile(newData);