function executeAsyncFunctionsInParallel(functions) {
    return new Promise((resolve) => {
        const results = [];
        let completedCount = 0;

        // Function to handle the settlement of each promise
        function handleSettlement(index, status, value) {
            results[index] = { status, value };
            completedCount++;

            // If all promises have settled, resolve the main promise with the results
            if (completedCount === functions.length) {
                resolve(results);
            }
        }

        // Execute each asynchronous function and handle its promise
        for (let i = 0; i < functions.length; i++) {
            const index = i;
            const promise = functions[i]();

            promise.then(
                (result) => handleSettlement(index, 'fulfilled', result), //onFullfilled
                (reason) => handleSettlement(index, 'rejected', reason) // onRejected
            );

    //         promise
    // .then((result) => handleSettlement(index, 'fulfilled', result)) //this will work too...
    // .catch((reason) => handleSettlement(index, 'rejected', reason));

        }
    });
}
