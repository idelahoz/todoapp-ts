# AGENTS.md

## Dev Commands

- Root: `npm run dev` - runs client + server concurrently
- Client: `npm run dev` (Vite), `npm run build`, `npm run lint`
- Server: `npm run dev` (tsx watch), `npm run build` (tsc), `npm run start`

## Structure

- `client/` - Vite + React 19 + TypeScript
- `server/` - Express 5 + TypeScript

## Server Routes

- `GET /api/todos` - get all todos
- `POST /api/todos` - create todo
- Handlers: `server/src/handlers/todos.ts`
- Model: `server/src/models/todos.ts`

## Patterns

### Model
```
server/src/models/{name}.ts - export class {Name}Model with CRUD methods
```

### Handler
```
server/src/handlers/{name}.ts - export const handler = (model: {Name}Model) => (req, res) => Response
```

Usage:
```typescript
apiRouter.post('/{route}', handler(modelInstance));
```