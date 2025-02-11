# Furever Friends 🐶

**Furever Friends** is a dog adoption application where users can:

- **Log in** with their name and email  
- **Search** for dogs by breed (and optionally zip code)  
- **Filter, Sort, and Paginate** through available dogs  
- **Favorite** dogs to keep track of their top picks  
- **Match** with one lucky dog from their favorites list via a mini “match game”  

---

## Tech Stack

- **Frontend**: React (with Vite)  
- **State Management**: Traditional Redux (with `redux-thunk`)  
- **Routing**: React Router 6  
- **CSS**: Custom CSS   
- **Backend API**: Provided by Fetch’s dog adoption service

---

## Features

1. **User Authentication**  
   - Users enter their name and email to receive an auth cookie, which is used for subsequent requests.

2. **Dog Search**  
   - Filter by breed and/or zip code.  
   - Sort results (e.g., `breed:asc` or `breed:desc`).  
   - Paginate results so users can browse all dogs.

3. **Dog Details**  
   - Each dog’s image, name, breed, age, and zip code are displayed.

4. **Favorites**  
   - Users can favorite any dog. Favorites are stored in Redux.

5. **Match Mini-Game**  
   - From the list of favorites, the `/dogs/match` endpoint returns one matched dog ID.  

6. **Logout**  
   - Invalidate the user’s session by calling `/auth/logout`.

---

## Getting Started

### Prerequisites

- **Node.js** (v14+ recommended)
- **npm** or **yarn**

### Installation

1. **Clone** this repository:
   ```bash
   git clone https://github.com/Haydengalyeanbiz/Fetch-Coding-Challenge
   cd fetch-dog-search
   ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run the application:
    ```bash
    npm run dev
    ```
4. Enjoy the app!
   
