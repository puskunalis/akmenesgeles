After launching `docker compose up -d`, go to `http://localhost:9000`, 
log in with username `user` and password `password`,
create an access key pair,
create a file `src/main/resources/secret.properties`:

```
minio.access-key=xxxxxxxxxxxxxxxx
minio.secret-key=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
jwt.secret=some-secret-string-here-123
jwt.expiration=2592000000
```
