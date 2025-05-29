# Bill Splitter Application

A modern web application for splitting bills among multiple people, built with React, TypeScript, and Express.

## Project Structure

```
.
├── client/                 # Frontend React application
│   ├── src/               # Source files
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
└── server/                # Backend Express server
    ├── src/              # Source files
    └── package.json      # Backend dependencies
```

## Prerequisites

- Node.js 20.18.3 (specified in `.tool-versions`)
- npm (comes with Node.js)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```
3. Start the development servers:
   ```bash
   # Start backend server (from server directory)
   npm run dev

   # Start frontend server (from client directory)
   npm run dev
   ```

## Development Tasks

### 1. Debug Why Web App is Not Loading

**Context**: The web application fails to load after recent changes. This is a common issue in real-world development where applications can break due to dependency issues, configuration problems, or code changes.

**Acceptance Criteria**:
- Identify and fix the root cause of the loading issue
- Ensure the application loads without console errors
- Verify that all necessary dependencies are correctly installed and configured
- Document the debugging process and solution in a PR description
- Add appropriate error handling for loading failures

**Technical Details**:
- The issue might be related to React version mismatches (React 19.1.0 is specified, which doesn't exist)
- Potential TypeScript configuration issues
- Possible Vite build configuration problems

### 2. Handle Invalid Input Characters

**Context**: The application crashes when users input negative values or non-numeric characters. This is a common real-world scenario where input validation needs to be improved.

**Acceptance Criteria**:
- Implement proper input validation for all numeric fields
- Add user-friendly error messages for invalid inputs
- Prevent application crashes when invalid data is entered
- Add unit tests for various invalid input scenarios
- Ensure the UI provides clear feedback about invalid inputs

**Technical Details**:
- Add input validation for the bill amount and number of people
- Implement proper error state handling in the UI
- Add TypeScript type guards for input validation
- Create test cases for edge cases (negative numbers, decimals, special characters)

### 3. Implement Share Functionality Using Existing Backend

**Context**: The backend API for sharing bills exists but isn't properly integrated with the frontend. This is a common scenario where backend services need to be connected to the frontend.

**Acceptance Criteria**:
- Implement the share button functionality using the existing `/api/bills/share` endpoint
- Add proper error handling for API calls
- Implement loading states during API calls
- Add success feedback when sharing is complete
- Create a way to view shared bills using the `/api/bills/:shareId` endpoint

**Technical Details**:
- Integrate with the existing Express backend
- Handle CORS and API errors appropriately
- Implement proper TypeScript interfaces for API responses
- Add loading and error states in the UI

### 4. Enhance Customization of Ratios and Support Naming

**Context**: Users need more flexibility in how they split bills and want to assign names to participants. This is a common feature request in real-world applications.

**Acceptance Criteria**:
- Add the ability to customize ratios for each person
- Implement a way to add and remove participants
- Allow naming of participants
- Ensure the UI is intuitive and user-friendly
- Add validation for the new input fields
- Implement proper state management for the new features

**Technical Details**:
- Create new components for participant management
- Implement proper form handling for multiple participants
- Add TypeScript interfaces for the new data structures
- Ensure the UI is responsive and accessible
- Add proper validation for all new input fields

## Development Guidelines

1. **Code Style**
   - Follow the existing ESLint configuration
   - Use TypeScript for type safety
   - Write meaningful commit messages

2. **Testing**
   - Write tests for new functionality
   - Ensure existing tests pass
   - Test edge cases and error scenarios

3. **Documentation**
   - Document any assumptions or decisions made
   - Update README when adding new features
   - Comment complex logic

4. **Best Practices**
   - Keep components small and focused
   - Use proper error handling
   - Follow React best practices
   - Ensure accessibility

## Environment Setup

The project uses environment variables for configuration. Create the following files:

- `.env.local` - Local development environment
- `.env.development` - Development environment
- `.env.test` - Testing environment
- `.env.production` - Production environment

## Available Scripts

### Frontend (client directory)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend (server directory)
- `npm run dev` - Start development server
- `npm run build` - Build TypeScript
- `npm start` - Start production server

## Contributing

1. Create a new branch for each task
2. Follow the existing code style
3. Write tests for new functionality
4. Submit a pull request with a clear description

## License

This project is licensed under the ISC License. 