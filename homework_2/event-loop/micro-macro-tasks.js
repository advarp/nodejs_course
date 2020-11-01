setImmediate(() => console.log('set immediate 2')); // 12
process.nextTick(() => console.log('next tick 1')); // 4
Promise.resolve().then(() => console.log('promise resolved 2')); // 6
process.nextTick(() => console.log('next tick 3')); // 5
console.log('console log 1'); // 1
setImmediate(() => console.log('set immediate 1')); // 13
console.log('console log 3'); // 2
Promise.resolve().then(() => console.log('promise resolved 1')); // 7
setTimeout(() => console.log('set timeout 2'));
console.log('console log 2'); // 3
Promise.resolve().then(() => {
    console.log('promise resolved 3') // 8
    process.nextTick(() => console.log('next tick 2')); // 9
});
setTimeout(() => console.log('set timeout 1')); // 10
setTimeout(() => console.log('set timeout 3')); // 11
setImmediate(() => console.log('set immediate 3')); // 14