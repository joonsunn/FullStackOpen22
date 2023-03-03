``` mermaid
sequenceDiagram
title Submitting new note (SPA)

participant Browser
participant Server

note over Browser: Payload = {content: "new note 444", date: "2023-01-15T06:39:12.595Z"}

Browser->> Server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

Server -->> Browser: {message: "note created"}
```
