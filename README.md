# Newspaper Project with Node.js, Express, MySQL, and Sequelize

This project focuses on creating a newspaper application using Node.js, Express, MySQL, and Sequelize ORM. The application provides RESTful API endpoints for managing authors and their posts.

## API Endpoints

### Postman Api Documentation link: https://documenter.getpostman.com/view/28564197/2s9Y5Zvh1A

The project features some main endpoints:

1. `/api/v1/authors`: This endpoint is used for authors. When making a `POST` request to this endpoint, the following parameters are required:
   - `email`: Email of the author (must be unique).
   - `name`: Name of the author.
   - `password`: Password for the author (minimum 8 characters).

   **Example Request:**
   ```http
   POST /api/v1/authors
   Content-Type: application/json

   {
     "email": "author@example.com",
     "name": "John Doe",
     "password": "securepassword"
   }

# Newspaper Project Setup and Getting Started

## Prerequisites

Before running the project, ensure that you have the following tools installed:

- Node.js
- npm (Node Package Manager)
- pnpm (Package Manager, recommended)

To install `pnpm`, run the following command:

```npm install -g pnpm```


# Getting Started with Newspaper Project

To begin working with the Newspaper Project, follow these steps:

1. Clone the project repository to your local machine using Git or download the source code directly:

```git clone https://github.com/your-username/newspaper-project.git```


2. Create a `.env` file based on the provided `.envexample` file. Configure your database connection and any other environment variables required for the project.

3. Install project dependencies using `pnpm`:

Alternatively you can also use `npm`

4. Start the project:

- For production:

  ```
  pnpm start
  ```

- For development (with nodemon):

  ```
  pnpm run dev
  ```

Alternatively, you can use `npm` for the above commands.

## Additional Information

Here are some important points to note:

- The project utilizes Sequelize ORM for database interactions.
- We recommend using `pnpm` as the package manager due to its benefits.
- Make sure to secure your environment variables and database credentials.

Feel free to explore and modify the project to meet your requirements. Should you encounter any issues or have questions, please refer to the project's issue tracker or engage in community discussions.

Happy coding!