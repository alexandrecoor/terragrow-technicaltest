# Terragrow - Technical Test - Alexandre COOREMAN 25/07/2025

Application web de gestion de parcelles et bandes pour un test technique.

## Stack Technique utilisée

- Frontend : Angular standalone + TailwindCSS
- Backend : Node.js + Express + TypeORM
- DB : PostgreSQL
- DevOps : Docker Compose

---

## Build/Lancement du projet

```bash
docker compose -f docker/docker-compose.{dev/prod}.yml build
```

```bash
docker compose -f docker/docker-compose.{dev/prod}.yml up
```

- Frontend : `http://localhost:4200`
- Backend : `http://localhost:3000`
- DB : PostgreSQL (exposée uniquement dans le réseau docker interne)
