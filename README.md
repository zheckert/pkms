To run project:
`foreman start`

# PKMS Development Checklist

## Setup Phase
- [ ] **Ensure Rails API and React Front-end Projects are Set Up:**
  - Verify that both projects are created and can run independently.
  
- [ ] **Set Up Version Control:**
  - Ensure you have a single Git repository with a proper `.gitignore` file.

## Development Phase

### Backend (Rails API)
- [ ] **Create Models:**
  - Define models for the PKMS (e.g., Note, Category, Tag).
  
- [ ] **Set Up Database:**
  - Run migrations and seed the database.
  
- [ ] **Implement Controllers and Routes:**
  - Create RESTful controllers for your models.
  
- [ ] **Add Validations and Callbacks:**
  - Implement custom validations, and callbacks for models.
  
- [ ] **Implement Scopes and Complex Queries:**
  - Use Active Record scopes for fetching data.
  
- [ ] **Set Up API Endpoints:**
  - Ensure endpoints are working correctly (GET, POST, PUT, DELETE).

### Frontend (React with Vite)
- [ ] **Create React Components:**
  - Build components for displaying notes, categories, and tags.
  
- [ ] **Set Up State Management:**
  - Use hooks or a context API for state management.
  
- [ ] **Make API Requests:**
  - Use Axios or Fetch API to connect to your Rails backend.
  
- [ ] **Handle Routing:**
  - Set up React Router for navigation between pages.
  
- [ ] **Implement Forms:**
  - Create forms for creating and editing notes and categories.
  
## Testing
- [ ] **Write Unit Tests:**
  - Create tests for both Rails models and React components.
  
- [ ] **End-to-End Testing:**
  - Use tools like Cypress or Jest for comprehensive testing.

## Final Touches
- [ ] **Error Handling:**
  - Implement error handling on both the frontend and backend.
  
- [ ] **Styling:**
  - Add CSS or use a framework like Tailwind CSS or Bootstrap for styling.
  
- [ ] **Documentation:**
  - Document your code and project setup instructions.
  
- [ ] **Deploying the Application:**
  - Prepare for deployment on platforms like Heroku for Rails and Vercel for React.
