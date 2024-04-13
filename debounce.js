var debounce = function(fn, t) {
    let timeoutId;
    return function(...args) {
        // Clear the previous timeout
        clearTimeout(timeoutId);
        // Set a new timeout to call the function after t milliseconds
        timeoutId = setTimeout(() => {
            fn.apply(null, args);
        }, t);
    }
};