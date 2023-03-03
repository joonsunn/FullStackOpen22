``` mermaid

sequenceDiagram
title Opening Notes page (SPA)

participant Browser
participant Server

Browser->> Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa

Server -->> Browser: html-code

Browser ->> Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css

Server -->> Browser: main.css

Browser ->> Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js

Server -->> Browser: spa.js

Browser ->> Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json

Server -->> Browser: data.json

```
