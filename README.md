 # Info
...

## Dev mód

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Build

Buildnutí appky:

```bash
npm run build
```

Zobrazení náhledu build verze: `npm run preview`.

Spuštění buildnuté aplikace `npm run start` s [Node Adaptérem](https://kit.svelte.dev/docs/adapter-node) nebo s použitím svého [Adaptéru](https://kit.svelte.dev/docs/adapters)

## Ukázkový ENV file

```YAML
#webserver config
HOST=0.0.0.0
PORT=5178
ORIGIN=http://localhost:5178
#database config
DATABASE_IP=10.10.10.223
DATABASE_PORT=3306
DATABASE_USER=superclovek
DATABASE_PASSWORD=tajnyheslo123456
#secret pro JWT (tím se bude podepisovat JWT token - https://jwt.io/)
JWT_SECRET=text
#v sekundách (10 min =  10 * 60)
#expiruje pouze pokud uživatel danou dobu nic nedělá (neprochází stránky)
COOKIE_EXPIRE=1200
#v sekundách (5 minut = 5 * 60)
PUBLIC_CHECK_COOKIE_INTERVAL=300
```
