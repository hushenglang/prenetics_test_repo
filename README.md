**Dependencies:**
* Node.js v6.x 
* Git

**Technologies:**
* [Backend] Node.js + Express + JWT + Redis + Mysql 
* [Frontend] AngularJs + Bootstrap
* [Testing] Mocha + Supertest

**Build Instruction:**
The following 4 steps will make you setup the application. Since Mysql DB and Redis server is already running on cloud, if you do not change these configuration, you can directly use the application without setting up your own Mysql DB and Redis.
1. git clone https://github.com/hushenglang/prenetics_test_repo.git
2. cd prenetics_test_repo
3. npm install
4. node server
(Note: Mysql init sql script is in here, and npm test is to run test)

**Application Web URL:**
There are 2 entry point, one is HTTP, the other is HTTPS. 
* http://ec2-54-153-122-100.us-west-1.compute.amazonaws.com:8080/ 
* https://ec2-54-153-122-100.us-west-1.compute.amazonaws.com:8443/
(note: since https certificate is generated locally, not trusted by browser, need to manually trust it);

**DB Design:**
There are 2 tables for this application: user table and user_genetic table;
user_genetic table is one-to-many, which means one user would have multiple genetic result;

**DB security:**
* make sure db server access must be limited specific servers or IP; • backup db data for period of time;
* forbid or limit db remote access;

**DB concurrency:**
* split read/write with replication;
* mysql cluster with auto-sharding;
* manually partition db into multiple, which heavily affect application DAO layers;
* db cache layers using cache server(redis, memcached) to hit the most frequent query.
* if application need full-text search which consume heavily resource in db server, we could
migrate these data into specific search database(Elasticsearch);

**Application concurrency & security:**
* setup load balancer for high availability and scalability;
* single nginx still have single point of failure issue. in this case, we could choose to deploy multi-
nginx with DNS routing; Or using cloud load balance service like AWS or Aliyun. • minify and cache css/js static file to reduce network data transfer.
* using https to security data transfer over network;
* hash original password and store it in db;

**Testing strategy:**
* using mocha to supertest for api testing;
* we could integrate with Jenkins. every time there is new commit push to git, trigger the building
and testing, if any test fails, automatically notify developers. in this way it could be better make sure the quality of software;
