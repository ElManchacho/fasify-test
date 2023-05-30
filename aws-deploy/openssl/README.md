Clone the OpenSSL repository to generate SSL key and certificate :

```bash
git clone git://git.openssl.org/openssl.git
```

(official documentation here : https://www.openssl.org/source/gitrepo.html)

Then run the 3 following commands :

```bash
git config core.autocrlf false
```

```bash
git config core.eol lf
```

```bash
git checkout .
```
Finally, generate the certificate and it's key with :

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 365
```