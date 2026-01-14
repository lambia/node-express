# Scaffolding
- Inizializzare una repo con il gitignore per escludere node_modules e package.json
- Inizializzare un progetto con npm init
- Installare express con `npm i express`
- Aggiungere al package.json gli script per npm run:
  ```
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js",
  },
  ```

# Configurazione express
- Partiamo dall'esempio in documentazione Express.
- Aggiungiamo le varie rotte da gestire.
- Eventualmente aggiungiamo il middleware per file statici
- Creiamo un file /data/entità.js che esporta i dati necessari (finto database)
- Creiamo un file /controllers/entitàController.js che esporta le funzioni che useremo nel router (index, show, store, update, modify, destroy)
- Creiamo un file /routers/entità.js che istanzia express.Router(), imposta le rotte usando il controller ed esporta il router
- Importiamo i router da server.js e ne facciamo "use"

# Avvio progetto
- Se si clona una repo: `npm install` o `npm i` per creare il package-lock e la cartella node_modules.
Utile anche se abbiamo "fatto casino" e vogliamo eliminare e ricreare tutto.
- Avviare il progetto con il comando specificato in package.json.
Di solito è `npm run dev` o `npm run watch`