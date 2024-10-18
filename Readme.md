# Student Registration and Counseling App

This app is designed to streamline the student registration process and provide a seamless platform for student-counselor interactions. The app features a comprehensive registration form for students seeking guidance from counselors, along with robust functionalities for counselors to manage and interact with their assigned students.

### Key Features

#### 1. Student Registration:

  -  Students can register through a user-friendly form to request guidance from a counselor.
  -  Upon registration, students receive a confirmation email with details about their registration and the next steps.

#### 2. Counselor Account Management:

- Counselors can create accounts and log in using Firebase Authentication, ensuring secure access to the system.
- Counselors can view and edit the registration details of students, allowing them to update student information as needed.

#### 3. Assigning Counselors to Students:

- Counselors can be assigned to individual students for personalized guidance.
- When a student is assigned a counselor, both the student and the counselor receive an email notification with relevant details.

#### 4. Counselor Dashboard:

- A dedicated route for counselors to view their assigned students.
-The dashboard provides a clear view of the students who require guidance and those who have been assigned to them, enabling effective time management.

#### 5. Real-Time Data Updates:

- Integrated with TanStack Query (React Query) to ensure real-time data synchronization.
- Counselors and students see updated data without having to refresh the page, ensuring a smooth user experience.

#### 6. Notifications:

- The app sends automatic email notifications:
- When a student registers.
- When a student is assigned to a counselor.
- Push Notification.

#### 7. Network Status Checking:

- Feature implemented to check network connectivity.
- Displays a message when the app loses network connection.

#### 8. Firebase Authentication:

- Firebase Authentication is implemented for secure login.
- Authentication data is stored in AsyncStorage after login and removed upon logout.

# Technologies Used

- React Native: For building a mobile-first, responsive app experience.
- Firebase Authentication: Secure login and account management for counselors.
- TanStack Query (React Query): Efficient state management and real-time data updates.
- Axios: For API calls and data fetching.
- React Navigation: Smooth navigation between different screens.
- Node.js/Express: Backend API for handling registration, counselor assignments, and more.