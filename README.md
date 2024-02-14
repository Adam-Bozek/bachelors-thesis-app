# Client App

## Project file structure

### Project structure with folders

```
.
├── keys/
│   ├── ip/
│   └── localhost/
├── node modules/
├── public/
└── src/
    ├── components/
    │   ├── private/
    │   │   ├── game/
    │   │   │   ├── data/
    │   │   │   │   ├── pictures/
    │   │   │   │   ├── question/
    │   │   │   │   └── voice/
    │   ├── public/
```

### Project structure with folders and files
```
.client-app
├── keys/
│   ├── ip/
│   │   ├── 192.168.0.11-key.pem
│   │   ├── 192.168.0.11.pem
│   │   ├── 192.168.0.12-key.pem
│   │   └── 192.168.0.12.pem
│   └── localhost/
│       ├── localhost-key.pem
│       └── localhost.pem
├── node modules/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
└── src/
    ├── components/
    │   ├── private/
    │   │   ├── game/
    │   │   │   ├── data/
    │   │   │   │   ├── pictures/
    │   │   │   │   ├── question/
    │   │   │   │   │   └── Objects_Animals_BodyParts_FoodAndDrinks.json
    │   │   │   │   └── voice/
    │   │   │   └── Gamestart.js
    │   │   ├── Dashboard.js
    │   │   ├── Header.js
    │   │   └── Footer.js
    │   ├── public/
    │   │   ├── Footer.js
    │   │   ├── Header.js
    │   │   ├── Home.js
    │   │   ├── Information.js
    │   │   ├── Login.js
    │   │   └── Registration.js
    │   └── ContextProvider.js 
    ├── App.js
    ├── Index.js
    └── Utils.js
```

# Server 

```
.server
    ├── keys/
    │   ├── api-key.txt
    │   ├── localhost-key.pem
    │   └── localhost.pem
    ├── node_modules/
    └── index.js
```