🎬 React Movie Search Demo
🚀 Project Overview
A sleek React web app to search movies, view details, and manage favorites. Powered by TMDB API and Appwrite backend, showcasing a modern full-stack approach with secure authentication and real-time updates.

✨ Features
🔍 Search movies by title from TMDB’s huge database

🎥 View detailed movie info: synopsis, ratings, genres, release dates

🔐 User authentication with secure JWT via Appwrite

❤️ Add/remove movies to your favorites list

📱 Responsive design for desktop & mobile

⚡ Real-time favorite list updates

🎨 Clean, modern, and intuitive UI

🛠️ Getting Started
Prerequisites
Node.js & npm

TMDB API key (Get it here)

Appwrite server setup (Docs)

Installation
bash
Copy
Edit
git clone https://github.com/yourusername/react-movie-search-demo.git
cd react-movie-search-demo
npm install
Create a .env file at the root with:

ini
Copy
Edit
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_APPWRITE_ENDPOINT=your_appwrite_endpoint
REACT_APP_APPWRITE_PROJECT=your_appwrite_project_id
Run the app:

bash
Copy
Edit
npm start
Open your browser at http://localhost:3000

📂 Project Structure
bash
Copy
Edit
/src
  /components    # Reusable UI components
  /pages         # Different app views/pages
  /services      # TMDB & Appwrite API handlers
  /utils         # Helper functions
  App.js         # Main app component
💻 Technologies
React.js

TMDB API

Appwrite (Auth & Database)

Axios (HTTP requests)

React Router

CSS Modules / Styled Components

🚀 Future Plans
Add user reviews & ratings

Advanced filters (genres, year, ratings)

Movie trailers & galleries

UI animations & transitions

Deployment with CI/CD pipelines
