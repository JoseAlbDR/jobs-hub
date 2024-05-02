# JobsHub

JobsHub es una aplicación para gestionar tus búsquedas de empleo de manera eficiente. Puedes registrar tus aplicaciones, hacer un seguimiento de su estado y obtener estadísticas útiles sobre tu progreso en la búsqueda de empleo.

## Características

- **Gestión de empleos:** Registra los detalles de tus aplicaciones de trabajo, incluyendo el puesto, la empresa, la ubicación, el estado y más.
- **Estadísticas:** Obtén información visual sobre el estado de tus aplicaciones de trabajo, incluyendo el número de aplicaciones pendientes, en proceso de entrevista y rechazadas.
- **Filtros y búsqueda:** Filtra y busca entre tus aplicaciones de trabajo según diferentes criterios, como estado, tipo de contrato y modo de trabajo.
- **Integración con Google Calendar:** Crea enlaces de Google Calendar directamente desde la aplicación para programar entrevistas y seguimientos.

## Tecnologías Utilizadas

- **Frontend:** React.js, Next.js, Tailwind CSS
- **Backend:** Prisma, PostgreSQL
- **Otros:** TypeScript, Zod, Day.js

## Estructura de carpetas

jobshub/
├── .github/
│   └── workflows/
│       └── ci.yml
├── .next/
├── .prisma/
│   └── schema.prisma
├── components/
│   ├── ui/
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── command.tsx
│   │   ├── form.tsx
│   │   ├── popover.tsx
│   │   ├── skeleton.tsx
│   │   ├── toast.tsx
│   │   ├── tooltip.tsx
│   │   └── use-toast.tsx
│   ├── DatePicker.tsx
│   ├── Sidebar.tsx
│   ├── StatsCard.tsx
│   ├── StatsContainer.tsx
│   ├── StatsLoadingCard.tsx
│   └── TechsInput.tsx
├── hooks/
│   └── useErrorNotification.ts
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── _error.tsx
│   ├── api/
│   │   ├── jobs/
│   │   │   ├── [id].ts
│   │   │   └── index.ts
│   │   └── stats.ts
│   ├── dashboard.tsx
│   ├── index.tsx
│   └── jobs/
│       ├── [id].tsx
│       └── index.tsx
├── prisma/
│   └── schema.prisma
├── public/
│   ├── assets/
│   │   ├── horizontal-black.svg
│   │   └── horizontal-white.svg
│   └── favicon.ico
├── styles/
│   ├── globals.css
│   ├── tailwind.css
│   └── theme.css
├── utils/
│   ├── actions.ts
│   ├── db.ts
│   ├── generateGoogleCalendarLink.ts
│   ├── getBackgroundColor.ts
│   ├── getParamsFromUrl.ts
│   ├── links.ts
│   ├── schemas.ts
│   └── types.ts
├── .eslintrc.js
├── .gitignore
├── package-lock.json
├── package.json
├── tsconfig.json
└── README.md



## Instalación

1. Clona este repositorio: `git clone https://github.com/tuusuario/jobshub.git`
2. `cd jobshub`
3. Instala las dependencias: `npm install`
4. Configura las variables de entorno según sea necesario, utiliza los archivos .env.template y .env.local.template como base
   
```
#.env
DATABASE_URL=<database url>
DIRECT_URL=<direct database url>
```
```
#.env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<clerk publisable key>
CLERK_SECRET_KEY=<clerk secret key>
```
5. Migra el schema de prisma a la base de datos proporcionada
`npx prisma migrate dev`

6. Arranca la aplicacion el desarrollo
`npm run dev`

## Contribuir

¡Contribuciones son bienvenidas! Si encuentras algún error o tienes sugerencias de mejoras, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la licencia MIT. Para más detalles, ver el archivo LICENSE.
