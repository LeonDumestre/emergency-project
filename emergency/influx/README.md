# Influxdb et Telegraf

## Startup

``` bash
docker-compose up
```

 Création d'un compte utilsateur avec les login de la config

- Username : ``admin``
- Password : ``password``
- Organisation : ``CPE``
- Bucket : ``telegraf``

Création d'un token API et renseignement du token dans ``telegraf.conf``

``` bash
docker-compose down
docker-compose up
```
