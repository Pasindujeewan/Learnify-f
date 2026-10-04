# Learnify – Frontend

A modern and responsive Learning Management System (LMS) frontend designed to deliver a seamless learning experience for students and educators.

## Features

* **Course Management:** Browse and explore available courses.
* **Student Dashboard:** View enrolled courses and learning progress.
* **Authentication:** User login and registration.
* **Course Ratings:** Rate and review courses.
* **Search and Filtering:** Find courses using search and filtering options.
* **Pagination:** Navigate course listings efficiently.
* **Responsive UI:** Optimized for different screen sizes.
* **API Integration:** Connects with backend services to manage learning data.

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* Supabase
* REST API

## Getting Started

### Prerequisites

* Node.js
* pnpm

### Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd learnify
```

Install dependencies:

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the project root and configure the required environment variables.

```env
VITE_API_URL=http://localhost:5000
```

Use the actual API URL and any additional variables required by your implementation.

### Run the Development Server

```bash
pnpm dev
```

Open the local URL provided by Vite in your browser.

### Build for Production

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## Project Structure

```text
learnify/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

*Adjust this structure to reflect your actual project.*

## Architecture

The frontend communicates with backend services through REST APIs.

* **UI Components:** Reusable components for consistent design.
* **Pages:** Main application screens and routes.
* **Services:** API communication and data handling.
* **Types:** TypeScript definitions for improved type safety.
* **Hooks:** Reusable React logic.

## Key Highlights

* Built with TypeScript for maintainable and type-safe code.
* Uses reusable React components to improve code organization.
* Implements pagination and filtering for better data navigation.
* Integrates with backend APIs for dynamic data.
* Uses Tailwind CSS for consistent and responsive styling.

## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

## License

Add your preferred license if you intend to distribute the project publicly.
