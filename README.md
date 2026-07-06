# Rate Repository App

A React Native mobile application for browsing, reviewing, and rating GitHub repositories. Built as part of the [Full Stack Open — React Native](https://fullstackopen.com/en/part10) course (Chapters 3–5).

The app connects to the [rate-repository-api](https://github.com/fullstack-hy2020/rate-repository-api) GraphQL backend. Users can browse repositories, view details and reviews, sign in, create reviews, and manage their own submissions.

## Features

- **Repository list** — sort by date or rating, filter by keyword, infinite scroll
- **Repository detail** — stats, language tag, GitHub link, paginated reviews
- **Authentication** — sign in, sign up, sign out with JWT token persistence
- **Reviews** — create reviews for public GitHub repos, view and delete your own
- **Theming** — consistent typography and colors via a shared theme config

## Tech Stack

| Category | Libraries |
|----------|-----------|
| Framework | Expo SDK 57, React Native 0.86, TypeScript |
| Navigation | react-router-native |
| Data fetching | Apollo Client 4, GraphQL |
| Forms | Formik, Yup |
| Storage | AsyncStorage (auth token) |
| HTTP (REST) | Axios |
| Testing | Jest, jest-expo, React Native Testing Library |
| Tooling | ESLint, Prettier |

## Prerequisites

- Node.js 20+ (Node 22 recommended for the API server)
- npm
- [rate-repository-api](https://github.com/fullstack-hy2020/rate-repository-api) running locally
- Expo Go app, emulator, or web browser for preview

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/Burben-Kapula/rate-repository-app.git
cd rate-repository-app
npm install
```

### 2. Configure environment

Copy the example env file and adjust URLs if needed:

```bash
cp .env.example .env
```

Default values (works with emulator / web on the same machine):

```env
APOLLO_URI=http://localhost:4000/graphql
API_URI=http://localhost:5000/api
```

When testing on a **physical device**, replace `localhost` with your computer's LAN IP address (shown in the Expo terminal as `exp://192.168.x.x:...`).

### 3. Start the API server

Follow the setup instructions in the [rate-repository-api README](https://github.com/fullstack-hy2020/rate-repository-api). Quick start after configuration:

```bash
npm run build
npm run seed:run
npm start
```

Seed users (`kalle`, `elina`, `matti`) all have the password `password`.

### 4. Run the app

```bash
npm start
```

Then press:

| Key | Target |
|-----|--------|
| `w` | Web browser |
| `a` | Android emulator |
| `i` | iOS simulator (macOS) |
| QR code | Expo Go on your phone |

Other scripts:

```bash
npm run android   # Start with Android
npm run ios       # Start with iOS
npm run web       # Start with web
```

If port 8081 is busy:

```bash
npx expo start --port 8082
```

Clear cache after `.env` changes:

```bash
npx expo start --clear
```

## Running Tests

```bash
npm test           # Run all tests once
npm run test:watch # Watch mode
npm run lint       # ESLint
npx tsc --noEmit   # TypeScript check
```

Test coverage includes:

- `RepositoryListContainer` — renders repository data correctly
- `SignInContainer` — submits form with valid credentials
- `formatCount` — formats large numbers (e.g. 8439 → 8.4k)
- `formatDate` — formats ISO dates (e.g. 15.5.2020)

## Project Structure

```
src/
├── components/     # Reusable UI (AppBar, RepositoryItem, forms, etc.)
├── screens/        # Route-level views (SignIn, Repository, MyReviews, ...)
├── hooks/          # Data and auth hooks (useRepositories, useSignIn, ...)
├── graphql/        # Queries, mutations, fragments
├── services/       # Axios HTTP client and REST helpers
├── contexts/       # React context providers
├── constants/      # Shared constants (sort options)
├── fixtures/       # Test data
├── types/          # TypeScript interfaces
├── utils/          # Apollo client, auth storage, formatters
└── __tests__/      # Jest test suites
```

## Course Exercise Mapping

| Chapter | Topics covered |
|---------|----------------|
| 3 — React Native basics | Core components, styling, routing, forms |
| 4 — Server communication | Apollo Client, auth, AsyncStorage, env vars |
| 5 — Testing & extending | Jest tests, sorting, filtering, reviews, sign up |

Submit exercises to the [Helsinki submission system](https://studies.cs.helsinki.fi/stats/courses/fs-react-native-2020). Add GitHub user `mluukkai` as a collaborator if your repository is private.

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Network request failed | Ensure API server is running; use LAN IP on physical devices |
| Empty repository list | Run `npm run seed:run` in the API project |
| Port 8081 in use | Use `npx expo start --port 8082` |
| Stale data after login | Apollo `resetStore` handles this; try reloading the app |
| Alert not visible on web | Delete confirmation uses `Alert` — test on Expo Go or emulator |

## License

This project was created for educational purposes as part of Full Stack Open.