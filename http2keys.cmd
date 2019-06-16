cd /d %~dp0
cd .\webapp
md certificates
cd certificates

REM https://nodejs.org/api/http2.html#http2_server_side_example
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj "/CN=localhost" -keyout localhost-privkey.pem -out localhost-cert.pem

cd ..\..
