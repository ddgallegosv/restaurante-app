# Aplicación de Restaurante

Ejercicio guiado acumulativo de PAFW.

## Backend
Express + Prisma + SQLite (restaurante-backend/)

## Frontend
React + Vite (restaurante-frontend/)

## Desarrollo local
- Backend: copiar .env.example a .env y ejecutar npm run dev
- Frontend: copiar .env.example a .env y ejecutar npm run dev

## Despliegue
Las URL públicas se añadirán al finalizar el ejercicio.

## Aplicación desplegada
Frontend: https://restaurante-frontend-pi22.onrender.com
Backend: https://restaurante-backend-x81o.onrender.com

## Variables de entorno
Ver restaurante-backend/.env.example y restaurante-frontend/.env.example.

> Nota didáctica: el Backend gratuito usa un sistema de archivos
> efímero; SQLite no garantiza persistencia tras reinicios o
> redespliegues. Además, el servicio se suspende tras 15 minutos
> sin tráfico: la primera petición puede tardar hasta un minuto.