# Worker Threads

This is just is an example of using NodeJS worker_threads feature
In real application I would rather use event-based queue system with RabbitMQ or Redis messaging service
Also solution with chunking rows on segments it's not the best solution I would like ((

## Running

Before running please add .env file in the root directory with the following content

```yaml
MONGODB_USER=admin
MONGODB_PASS=pekmabz
```

```bash
npm install

node ./src/mainThread.js
```

#### For inserting new urls to database please use client.js
