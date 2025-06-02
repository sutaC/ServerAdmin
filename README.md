# ServerAdmin

ServerAdmin is a simple GUI setup for managing your server.

## Getting starded

0. Make sure to run this app with **admin privliges**, because that is required to properly handle services!

1. Set your `.env` file in root directory by following template:

    ```
    ADMIN_PASSWORD='<password>'
    ```

    Where `<password>` means password for accessing your admin dashboard. To generate random secret number for your password you can run:

    ```bash
    npm run secret
    ```

2. Add your personal scripts, to access them in dashboard. Just add them, to `scripts` directory. There is a sample file `Hello_World` waiting for you there.

3. Add your services to `services.json` in JSON array. That will be list of services that you would like to manage from dashboard. In the file you will find example service name.

## Development

To run development server run:

```bash
npm run dev
```

You can acces it at `localhost:3000`.

## Deployment

To deploy app run:

```bash
npm run build # Builds production version
npm run start # Runs server
```

---

You may want to change port on which server is running, to do is change script in `package.json` file:

```json
"start": "next -p <port> start",
```

Where `<port>` is your desired port.

---

If you want to configure your domain with this app you will need to add to application settings (file: `next.config.ts`) such option:

```ts
experimental: {
    serverActions: {
        allowedOrigins: ['<domain>'],
    },
}
```

Where `<domain>` is domain you are using.
