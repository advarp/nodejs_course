### Event Loop
Code that may behave differently on different runs:

Run `node ./homework_2/event-loop/micro-macro-tasks.js`

Write the server with api that blocks loop (and prove it)

Run: `node ./homework_2/event-loop/blocking-api.js`,
 
Run: `node ./homework_2/event-loop/none-blocking-api.js`

### Cluster
Create cluster with 6 workers. Run smal**l server with some api. Run script that performs 100 calls to this server. Calculate on server how many requests handled each worker

Run: `node ./homework_2/cluster/multi-threads.js`

Run `node ./homework_2/cluster/culculate.js`

### Workers
Calculate n-th Fibonacci number on worker thread (can be as api) (1 or 2 files)

Run `node ./homework_2/worker/fibonacci.js`