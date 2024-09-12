# kaven-proxy

[docker pull kavenzero/kaven-proxy](https://hub.docker.com/r/kavenzero/kaven-proxy)

```sh
docker run --name kaven-proxy \
    -p 8558:8558 \
    -v "$(pwd)"/config:/app/config \
    -d kavenzero/kaven-proxy

# Or if you need to access the LAN
docker run --name kaven-proxy \
    --network host \
    -v "$(pwd)"/config:/app/config \
    -d kavenzero/kaven-proxy
```

Default config:

```json
{
    "SERVER": true,
    "SERVER_HOST": "0.0.0.0",
    "SERVER_PORT": 8558,
    "SERVER_CERT_GENERATE_DIR": "./generated",
    "SERVER_CERT_JSON_FILE": "./generated/cert.json",
    "SERVER_VALID_CLIENTS": [],
    "CLIENT": true,
    "CLIENT_CONNECT_HOST": "127.0.0.1",
    "CLIENT_CONNECT_PORT": 8558,
    "CLIENT_HTTP_HOST": "127.0.0.1",
    "CLIENT_HTTP_PORT": 8765,
    "CLIENT_CERT_JSON_FILE": "./generated/cert.json",
    "CLIENT_CHECK_CERT_CN": false,
    "CLIENT_VALID_SERVERS": []
}
```
