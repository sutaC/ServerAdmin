# ServerAdmin

ServerAdmin is a simple GUI setup for managing your server.

## Getting starded

1. Set your `.env` file in root directory by following template:

    ```
    ADMIN_PASSWORD='<password>'
    ```

    Where `<password>` means password for accessing your admin dashboard. To generate random secret number for your password you can run:

    ```bash
    npm run secret
    ```

2. Add your personal scripts, to access them in dashboard. Just add them, to `scripts` directory. There is a sample file `Hello_World` waiting for you there.

## Development

To run development server run:

```bash
npm run dev
```

You can acces it at `localhost:3000`.
