const fs = require('fs');
const readline = require('readline');
// // Define the function to update the stocks.json file with new data
// const updateStockDataToFile = (newStockData) => {
//     // Read existing stock data from the JSON file
//     const existingData = fs.readFileSync('stocks.json', 'utf8');
//     let stocks = JSON.parse(existingData);

//     // Append the new stock data to the existing array
//     stocks = stocks.concat(newStockData);

//     // Convert the updated stock data to JSON format
//     const jsonData = JSON.stringify(stocks, null, 2);
    
//     // Write the updated JSON data back to the stocks.json file
//     fs.writeFileSync('stocks.json', jsonData);
//     console.log('New stock data appended to stocks.json file.');
// };

// Define the function to update the stocks.json file with new data
const updateStockDataToFile = (newStockData) => {
    // Create a readable stream to read from the existing stocks.json file
    const readStream = fs.createReadStream('stocks.json', { encoding: 'utf8' });

    // Create a writable stream to write to a temporary file
    const tempFile = 'stocks_temp.json';
    const writeStream = fs.createWriteStream(tempFile, { encoding: 'utf8' });

    // Pipe the data from the read stream to the write stream
    readStream.pipe(writeStream);

    // When the read stream emits the 'close' event (indicating it has finished reading), append the new stock data
    readStream.on('close', () => {
        // Append new stock data to the temporary file
        newStockData.forEach((stock) => {
            fs.appendFileSync(tempFile, JSON.stringify(stock) + ',' + '\n');
        });

        // Replace the original file with the temporary file
        fs.renameSync(tempFile, 'stocks.json');
        console.log('New stock data appended to stocks.json file.');
    });
};

// Usage example:
const newStockData = [
    // Define your new stock data here
    // Example:
    { symbol: 'RITES', price: 140.50, change: '+0.20', percent_change: '+0.14%' },
    { symbol: 'ATL', price: 2300.10, change: '-1.30', percent_change: '-0.06%' },
    // Add more stock data as needed
];

updateStockDataToFile(newStockData);