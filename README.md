# smartbus-api

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## Configuración del proyecto

El proyecto para funcionar debes de indicar las siguientes variables de entorno:

- KEY_PATH="./localhost-key.pem"
- CERT_PATH="./localhost.pem"
- FIREBASE_API_KEY=
- FIREBASE_AUTH_DOMAIN=
- FIREBASE_PROJECT_ID=
- FIREBASE_STORAGE_BUCKET=
- FIREBASE_MESSAGING_S_ID=
- FIREBASE_APP_ID=

Las que inician con el prefijo FIREBASE son necesarias para que las api-keys generadas sean guardadas en firestore.

Y el proyecto tiene soporte para https, por eso tienes que indicar la ruta a los archivos de certificado.