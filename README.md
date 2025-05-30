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
