
## Development Tasks

### 1. Debug Why Web App is Not Loading

**Context**: The web application fails to load after recent changes. 

**Acceptance Criteria**:
- Identify and fix the root cause of the loading issue
- Ensure the application loads without console errors
- Add appropriate error handling


### 2. Handle Invalid Input Characters

**Context**: The application crashes when users input negative values or non-numeric characters. 

**Acceptance Criteria**:
- Prevent application crashes when invalid data is entered
- Ensure the UI provides clear feedback about invalid inputs

### 3. Implement Share Functionality Using Existing Backend

**Context**: The backend API for sharing bills exists but isn't properly integrated with the frontend. 

**Acceptance Criteria**:
- Implement the share button functionality using the existing `/api/bills/share` endpoint
- Add proper error handling for API calls
- Implement loading states during API calls
- Add success feedback when sharing is complete
- Create a way to view shared bills using the `/api/bills/:shareId` endpoint

**Technical Details**:
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
