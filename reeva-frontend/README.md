# Project Management Dashboard

A **Project Management Dashboard** built with **Next.js 15**, designed to streamline project tracking and task management. The application supports user authentication, project creation, task assignment, and photo uploads for tasks.

## Features

- **User Authentication**: Users can sign in and sign out securely using Clerk Authentication.
- **Project Management**: Each user can create multiple projects.
- **Task Management**: Projects can have multiple tasks with attributes like priority, status, and assignee.
- **Photo Uploads**: Tasks support uploading photos for better context.

## Data Models

### User

| Field   | Type   | Description            |
| ------- | ------ | ---------------------- |
| `name`  | String | Full name of the user  |
| `email` | String | Unique email address   |
| `id`    | String | Unique user identifier |

### Project

| Field         | Type   | Description                         |
| ------------- | ------ | ----------------------------------- |
| `title`       | String | Title of the project                |
| `description` | String | Detailed description of the project |
| `status`      | String | Current status of the project       |
| `deadline`    | Date   | Deadline for project completion     |

### Task

| Field         | Type   | Description                                 |
| ------------- | ------ | ------------------------------------------- |
| `title`       | String | Title of the task                           |
| `description` | String | Detailed description of the task            |
| `status`      | String | Current status of the task                  |
| `priority`    | String | Priority level of the task (e.g., High/Low) |
| `assignee`    | String | User assigned to the task                   |
| `due_date`    | Date   | Deadline for task completion                |

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ReevaDashboard.git
   cd ReevaDashboard/reeva-frontend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
   CLERK_SECRET_KEY=<your_clerk_secret_key>
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=<your_clerk_signin_url>
   CLERK_SIGN_IN_FORCE_REDIRECT_URL=<your_signin_force_redirect_url>
   CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=<your_signin_redirect_url>
   CLERK_SIGN_UP_FORCE_REDIRECT_URL=<your_signup_redirect_url>
   CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=<your_signup_fallback_url>
   NEXT_PUBLIC_SUPABASE_URL=<your_supabase_public_url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_public_anon_key>
   ```

4. Start the development server:

   ```bash
   pnpm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

1. **Sign In**: Create an account or sign in with existing credentials.
2. **Create Projects**: Navigate to the Projects section and add a new project.
3. **Add Tasks**: Select a project and add tasks, specifying details like title, description, and priority.
4. **Upload Photos**: Attach photos to tasks for better visualization.

## Technologies Used

- **Next.js 15**: Framework for building the application.
- **Clerk Authentication**: User authentication and session management.
- **Supabase Storage**: For photo uploads.
- **Tailwind CSS**: For styling and responsive design.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- The **Next.js**, **Clerk** and **Supabase** teams for their excellent tools and documentation.
- Inspiration and support from the developer community.
