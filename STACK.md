# STACK.md - Stack de Desarrollo

## Visión General

Este proyecto utiliza un stack moderno con **React** en el frontend y **Node.js + Express** en el backend, ambos con **TypeScript**.

## Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | ^19.2.4 | Framework UI |
| Vite | ^8.0.4 | Build tool y dev server |
| ESLint | ^9.39.4 | Linting |

**Scripts:**
- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Build de producción
- `npm run lint` - Verificar código
- `npm run preview` - Preview del build

## Backend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Express | ^5.2.1 | Framework servidor |
| CORS | ^2.8.6 | Middleware CORS |
| TypeScript | ^5.7.0 | Lenguaje tipado |
| tsx | ^4.19.0 | Ejecución dev |

**Scripts:**
- `npm run dev` - Iniciar servidor de desarrollo (watch mode)
- `npm run build` - Compilar TypeScript
- `npm run start` - Iniciar servidor production

## Estructura Sugerida

```
/app
├── client/          # Frontend (React + Vite)
├── server/          # Backend (Node + Express)
└── STACK.md
```