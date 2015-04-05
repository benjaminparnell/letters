# letters

This is me experimenting with leveldb on Dokku. The application is a small
http server that you can post markdown to, and then view the formatted markdown.

I am using this as a test project to try and test doing different things, without
using one of the more popular routing libraries (express/hapi).

Some things I might try and implement:

* Rate limiting
* Web uploading interface

## Usage

Start the server with `node index.js`, optionally specifying `PORT` and `LOG_LEVEL`
environment variables.

```bash
# Post markdown to `/` with content-type set to `x-markdown`

curl -XPOST -H 'Content-Type: x-markdown' -T - http://127.0.0.1:1337/ < test.md
# => 1er42fd
```

The rendered markdown can now be viewed at `/1er42fd`.
