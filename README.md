# Backend for a Gas Meter Readings app

## Local development

Install packages
```
npm install
```

Start Postgres and SQS containers
```
docker-compose up -d --build --remove-orphans
```

Create queue (press q to continue)
```
npm run sqs
```
You can see the queue console here `http://localhost:9325`

Start app
```
npm run dev
```

Run migrations
```
npm run migrate
```

Start worker
```
npm run worker
```


## Teardown

Remove containers and images
```
docker-compose down --rmi all --remove-orphans
```
