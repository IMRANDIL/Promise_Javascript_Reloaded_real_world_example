function executeAsyncFunctionsInParallel(functions) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completedCount = 0;
        let hasRejected = false;

        // Function to handle the resolution of each promise
        function handleResolve(index, result) {
            results[index] = result;
            completedCount++;

            // If all promises have resolved, resolve the main promise with the results
            if (completedCount === functions.length) {
                resolve(results);
            }
        }

        // Function to handle the rejection of any promise
        function handleReject(reason) {
            if (!hasRejected) {
                hasRejected = true;
                reject(reason);
            }
        }

        // Execute each asynchronous function and handle its promise
        for (let i = 0; i < functions.length; i++) {
            const index = i;
            const promise = functions[i]();

            promise.then((result) => {
                handleResolve(index, result);
            }).catch((error) => {
                handleReject(error);
            });
        }
    });
}






// var promiseAll = function(functions) {
//     const promises = [];
//     for (let i = 0; i < functions.length; i++) {
//         promises.push(Promise.resolve(functions[i]()));
//     }
//     return Promise.all(promises);
// };

// var promiseAll = async function(functions) { return Promise.all(functions.map((f) => f())); };
