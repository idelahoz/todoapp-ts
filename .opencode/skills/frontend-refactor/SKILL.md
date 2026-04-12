# Skill: Frontend Refactor

## Descripción

Este skill refactoriza componentes primitivos (etiquetas HTML) a componentes genéricos basados en Atomic Design.

## Activación

Se activa cuando el usuario:
- Pide refactorizar un archivo
- Menciona "componentes primitivos", "atomic design", "refactorizar código"

## Flujo

### Paso 1: Recibir Archivo

1. Si el usuario proporciona un archivo en el mensaje, usarlo
2. Si no lo proporciona, pedir el archivo

### Paso 2: Analizar el Archivo

1. Leer el archivo especificado
2. Identificar etiquetas HTML primitivas:
   - `div` → componente `Card` o `Box`
   - `span` → componente `Text`
   - `button` → componente `Button`
   - `input` (type="text") → componente `Input`
   - `input` (type="checkbox") → componente `Checkbox`
   - `ul` / `ol` → componente `List`
   - `li` → componente `ListItem`
   - `h1`, `h2`, `h3`, `h4`, `h5`, `h6` → componente `Heading`
   - `p` → componente `Paragraph`
   - `form` → componente `Form`

### Paso 3: Verificar Componentes Existentes

1. Buscar en `client/src/components/`:
   - `client/src/components/atoms/`
   - `client/src/components/molecules/`
   - `client/src/components/organisms/`

2. Usar glob para encontrar componentes por nombre

### Paso 4: Crear o Reutilizar Componentes

1. **Si el componente existe**: reutilizarlo
2. **Si no existe**: crear en el directorio apropiado:
   - Átomos: `client/src/components/atoms/`
   - Moléculas: `client/src/components/molecules/`
   - Organismos: `client/src/components/organismos/`

### Paso 5: Refactorizar Archivo

1. Reemplazar etiquetas HTML por componentes
2. Mantener todas las props existentes (onChange, onClick, value, checked, style, etc.)
3. Pasar className si existe para estilos

## Estructura de Componentes

```
client/src/components/
├── atoms/
│   ├── Button/
│   │   └── Button.jsx
│   ├── Input/
│   │   └── Input.jsx
│   ├── Text/
│   │   └── Text.jsx
│   ├── Checkbox/
│   │   └── Checkbox.jsx
│   ├── List/
│   │   └── List.jsx
│   ├── ListItem/
│   │   └── ListItem.jsx
│   ├── Heading/
│   │   └── Heading.jsx
│   ├── Paragraph/
│   │   └── Paragraph.jsx
│   └── Form/
│       └── Form.jsx
├── molecules/
│   └── FormField/
│       └── FormField.jsx
└── organisms/
    └── TodoItem/
        └── TodoItem.jsx
```

## Componentes Átomos

### Button.jsx

```jsx
function Button({ children, onClick, type = 'button', className, ...props }) {
  return (
    <button type={type} onClick={onClick} className={className} {...props}>
      {children}
    </button>
  )
}
```

### Input.jsx

```jsx
function Input({ type = 'text', className, ...props }) {
  return (
    <input type={type} className={className} {...props} />
  )
}
```

### Text.jsx

```jsx
function Text({ children, className, style, ...props }) {
  return (
    <span className={className} style={style} {...props}>
      {children}
    </span>
  )
}
```

### Checkbox.jsx

```jsx
function Checkbox({ checked, onChange, className, ...props }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={className}
      {...props}
    />
  )
}
```

### List.jsx

```jsx
function List({ children, className, ...props }) {
  return (
    <ul className={className} {...props}>
      {children}
    </ul>
  )
}
```

### ListItem.jsx

```jsx
function ListItem({ children, className, ...props }) {
  return (
    <li className={className} {...props}>
      {children}
    </li>
  )
}
```

### Heading.jsx

```jsx
function Heading({ children, level = 1, className, ...props }) {
  const Tag = `h${level}`
  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  )
}
```

### Paragraph.jsx

```jsx
function Paragraph({ children, className, ...props }) {
  return (
    <p className={className} {...props}>
      {children}
    </p>
  )
}
```

## Reglas

1. **No duplicar componentes**: Verificar si ya existen antes de crear
2. **Componentes genéricos**: Deben aceptar cualquier prop válida de HTML
3. **Preservar funcionalidad**: Mantener onChange, onClick, value, etc.
4. **Permitir className**: Para compatibilidad con estilos existentes
5. **TypeScript**: Usar extensión `.tsx` si el proyecto usa TypeScript
6. **Ejecutar lint y build**: Después de refactorizar para verificar