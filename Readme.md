# Front-end Engineer Homework Assignment


## Stack


- NextJS
- TypeScript
- Tailwind CSS
- ShadcnUi
- Jest/Cypress
- React-toastify(notifications)
- React Context



# How to run


```sh
- cd server => npm i or sudo npm i => node server.js
```
```sh
- npm i or sudo npm i (in directory with frontend) => npm run dev
```

## How to run Tests

```sh
- cypress(in directory with frontend): sudo npm run cypress:open 
```
```sh
- jest (in directory with frontend): npm run test
```

## 1 Part. JWT Authentication with Next.js and Tailwind CSS.

# Login Component (Login.tsx):

- This is a React component that displays a login form.
- When the user enters a username and password and submits the form, handleLogin is executed.
handleLogin calls authenticateUser from the "api.ts" file with the entered data.
- If authentication is successful (successful token received), the user is redirected to the Dashboard page, otherwise an error message is displayed.


# Dashboard Component (DashboardComponent.tsx):

- This is the component that displays information on a secure Dashboard page.
- This component also implements a mechanism for updating the token via refreshToken from the "api.ts" file, which is executed every 10 seconds.
- If the token is expired, the user must re-authenticate.
- The component gets a token from localStorage and if there is none, the user is redirected to the login page.


# AuthProvider.tsx

- The AuthProvider.tsx file is a React component responsible for managing user authentication within the application. It provides user authentication functionalities and stores the user's authentication token and decoded token information. It is crucial for maintaining the user's authentication status throughout the application.
- This component is used to create an authentication context, manage the user's token, and handle actions such as logging in and logging out. It relies on local storage to store and retrieve the user's authentication token and decoded token data.

- The primary functionalities of the AuthProvider component include:

- Logging In: The login function allows the user to log in by setting their authentication token, storing it in local storage, and saving the decoded token information.
- Logging Out: The logout function clears the user's authentication token and associated data from local storage.
- Saving Refresh Token: The saveRefreshToken function updates the user's authentication token and its decoded representation.
- UseAuth Hook: The useAuth hook provides access to the authentication context and its functions for other components

# AuthGuard.tsx

- The AuthGuard.tsx file is another React component used to protect certain routes or components that require user authentication. It ensures that a user is authenticated before allowing access to specific parts of the application.
- The primary logic within the AuthGuard component involves checking whether a valid authentication token exists in local storage. If no token is found, the user is redirected to a default route, typically the login page. If a token is present, it allows access to the wrapped child components.
- Together with the AuthProvider, the AuthGuard component helps in securing routes and providing a seamless authentication experience for users in the application.


# NetworkStatus (NetworkStatus.tsx)


- NetworkStatus is a functional component that accepts children as a children property.
- The component uses the useEffect hook, which is executed when the component is mounted.
- Inside the useEffect hook, we configure an offline event listener on the window object to listen for changes in network state. When the Internet connection is lost or restored, the corresponding events will be triggered.
- If, when calling the offline event, it is detected that the browser has gone offline (no Internet connection), then a notification will be displayed with the message “Internet connection lost!” using the react-toastify library.
- If, when the online event is called, it is detected that the browser has returned to online mode (the Internet connection has been restored), then a notification with the message “The Internet connection has been restored!” will be displayed.
- To periodically check the network status, an interval, that  adds an offline event listener, is created every 10 seconds.
- When dismantling a component, the return block of useEffect removes the event listeners and interval to prevent resource leaks and unnecessary event handler calls.
- Finally, the children (passed to children) are rendered inside the NetworkStatus component.


# Node.js Server (server.js):


- This is the server part that implements endpoints for authentication.
- The /login endpoint verifies the provided credentials (username and password) and, upon successful authentication, generates a JWT token with a limited validity period (2 minutes) and sends it to the client.
- The /refresh-token endpoint allows you to refresh a token with a limited validity period. If the token is valid and has not expired, the server sends a new token.


# These Cypress tests are for the "Login" component. Let's break down what each test is doing:


# Test 1: "should successfully log in with valid credentials"


- It visits the login page.
- It inputs a valid username and password into the respective input fields.
- Then, it clicks the "Log in" button, attempting a successful login.


# Test 2: "should display an error message for invalid credentials"


- It visits the login page.
- It inputs an invalid username and password into the respective input fields.
- Then, it clicks the "Log in" button, simulating a login with incorrect credentials. - It should trigger an error message.


# Test 3: "should display an error message for an incorrect username"


- It visits the login page.
- It inputs an incorrect username (less than 6 characters) and a valid password.
- Then, it clicks the "Log in" button, and it should display an error message related to the username not meeting the minimum character requirement.


# Test 4: "should display an error message for an incorrect password"


- It visits the login page.
- It inputs a valid username and an incorrect password (less than 6 characters).
- Then, it clicks the "Log in" button, and it should display an error message related to the password not meeting the minimum character requirement.


# Test 5: "should display an error message for an incorrect username" (Note: This test appears to be a duplicate of Test 3, and the description is the same.)


# Test 6: "should display an error message for an incorrect password and username"


- It visits the login page.
- It doesn't provide any input for both the username and password.
- Then, it clicks the "Log in" button, and it should display error messages indicating that both the username and password are required.


# Test 7: "should display an error message for an incorrect length password and username"


- It visits the login page.
- It inputs an incorrect username (less than 6 characters) and an incorrect password (less than 6 characters).
- Then, it clicks the "Log in" button, and it should display error messages for both the username and password not meeting the minimum character requirement.
- These tests cover various scenarios for the login component, including successful login, invalid credentials, and input validation checks for both username and password. They ensure that the component behaves correctly and displays appropriate error messages as needed.


## 2 Part. Nested Table Component with Shadcn UI


## DashboardComponent:


- DashboardComponent is a component that displays information on a dashboard. It is designed to show a table (NestedTable) and handle user authentication.


- At the beginning of the component, the following variables and hooks are defined:


token: A variable to store the user's token (retrieved from localStorage).
router: Next.js routing object for managing page navigation.
username: A variable to store the username extracted from the route.
- handleLogout(): A function for logging out. It removes the token from localStorage and redirects the user to the main page.
- refreshToken(): A function for token refresh. It checks for the existence of a token and, if it exists, calls the refreshAccessToken function to attempt token refresh. If token refresh fails, the user is redirected to the main page, and an error message is displayed.
- useEffect(): Inside the useEffect hook, an interval is set up to periodically call the refreshToken function every 10 seconds. This allows for automatic token refreshing in the background, enabling the user to stay authenticated.
- Inside the return statement of the component, the dashboard is rendered, including a logout button, the username, and the NestedTable component for displaying a nested table.


## NestedTable:


- NestedTable is a component for displaying and managing a nested table of data.


- Inside the component, the following variables and hooks are defined:


- expandedRows: Holds an array of identifiers for expanded rows.
- sortedColumn: Stores information about the column used for sorting.
- sortDirection: Stores the sorting direction (ascending or descending).
- filterText: Stores the text used for filtering rows in the table.
- newRow: Stores data for a new row to be added.
- tableData: Holds the data for the table, including columns and rows.
- addNewRow(): A function for adding a new row to the table. It checks that a name and age are provided, creates a new row, and appends it to the table's data.


- toggleRow(): A function for expanding or collapsing child rows. It updates the expandedRows array.


- toggleSort(): A function for sorting the table based on the selected column. It updates the sortedColumn and sortDirection variables.
- filterRows(): A function for filtering table rows based on the entered filter text.
- handleFilterTextChange(): A function that handles changes in the filter input field. It updates the filterText variable as the user types.
- renderRows(): A function for rendering table rows. It first filters the rows based on the filter text, sorts them, and displays them on the screen.
- Inside the return statement of the component, a table is rendered with columns and rows. For each row, data from the columns is displayed, along with an "Expand" or "Collapse" button for showing or hiding child rows.


- In summary, DashboardComponent and NestedTable are components that interact with each other, allowing users to manage authentication and view a nested table of data with filtering and sorting capabilities.


# Test 1: "displays table and data" (NestedTable.test.tsx)


- This test checks whether the NestedTable component renders a table with data and the"Add line" button.
- It renders the NestedTable component with the provided data and retrieves elements from the rendered component.
- The following expectations are checked:
-It checks if the table element is present.
-It checks if the number of rows is equal to the number of rows in the provided data plus one (for the header row).
-It checks if the "Add line" button is present.


# Test 2: "adds a new row when you click on the 'Add row' button" (NestedTable.test.tsx)


- This test verifies that clicking the "Add line" button adds a new row to the table.
- It renders the NestedTable component and gets the initial count of rows.
- Then, it clicks the "Add line" button.
- After clicking, it waits for the component to update (using waitFor).
- It retrieves the updated count of rows and verifies that the number of rows has increased by one.
- It checks the content of the newly added row to ensure it contains the expected text.


# Test 3: "expands and collapses rows when you click the Expand/Collapse button" (NestedTable.test.tsx)


- This test checks if clicking the "Expand" and "Collapse" buttons works as expected.
It renders the NestedTable component and retrieves the "Expand" buttons.
It initially checks that there are two "Expand" buttons (representing two collapsible rows).
- It simulates clicking the first "Expand" button.
After clicking, it checks that there is one "Expanded" row (indicating the first row expanded).
- It then simulates clicking the same button again.
- After clicking, it checks that there are two "Collapsed" rows (indicating both rows were collapsed).
- These tests ensure that the NestedTable component behaves as expected, correctly displays data, adds new rows, and manages the expansion and collapse of rows.


## 3 Part. Themeable Configuration


# ThemeProvider.tsx:


- This component provides a theme provider wrapper around the next-themes ThemeProvider. It's meant to set up theme-related context for the application.


- ThemeProvider is a functional component that receives children and props.
- It returns the NextThemesProvider, which wraps around the children and spreads the props.
- This allows the app to use the context provided by next-themes throughout its component tree.


# ModeToggle.tsx:
- This component handles theme toggling.


- It imports various components and hooks, including useTheme from next-themes.
- Inside the component, it initializes the theme and setTheme using the useTheme hook.
- It retrieves the user's saved theme from localStorage and sets it using setTheme when the component mounts.
- toggleTheme is a function to switch between "light" and "dark" themes. It also manages the dark class on the body element and saves the new theme in localStorage.
- The component uses a DropdownMenu to create a toggle button for theme switching.
- The button has icons for the sun and moon (indicating light and dark themes), and it visually changes based on the current theme.
- When clicked, it opens a dropdown menu with options to switch between light, dark, and system themes.


# There is also a file with styles, where all the styles (variables) are located so that when switching themes, the necessary styles are applied.(globals.css)


- Here are variables for themes or roots that can be used in the project


# Test 1: Checking whether the light theme is applied (Theme.cy.ts + dashboard.cy.ts)


- It visits the root URL ("/") of the application.
- It retrieves the class attribute of the <html> element (usually used for applying global styles).
- It checks if the "dark" class is initially applied to the <html> element, indicating that the dark theme is active.
- Then, it clicks the "toggle theme" button, which should switch to the light theme.
- It checks if the "light" class is applied to the <html> element, indicating that the light theme is  active now.


# Test 2: Checking whether the theme is saved in localStorage


- It also visits the root URL ("/") of the application.
- It retrieves and checks whether the "dark" item in localStorage is initially null, indicating that no theme is stored.
- It clicks the "toggle theme" button.
- It waits for 1000 milliseconds (1 second) to ensure that the theme change is processed.
- It retrieves and checks whether the "theme" item in localStorage is  set to "light," now indicating that the theme preference is saved in localStorage.




## Thank you for watching!
