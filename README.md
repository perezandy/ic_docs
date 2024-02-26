## This is the code of the documentation website for Iron Coder.

Completed work towards having an online documentation as of 1/25/24 is:

1. Created a login, signup, and custom board tutorial page.
2. Created a backend to parse input sent from frontend, and send it over to a MongoDB instance.
3. Created cypress tests for testing frontend redirect.
4. Created a custom validator for password matching in the signup form fields.
5. Added dynamic feedback from error requests back to the user.
6. Added a feature to automatically disable buttons when submissions aren't ready.
7. Added password encryption.

To build this website locally:
1. Install Node.js (https://nodejs.org/en)
2. Install the Angular CLI with the following command: ```npm install -g @angular/cli```
3. Clone this repository
4. Navigate to the folder containing these files, and initialize the CSS library:
   ```npm install -D tailwindcss postcss autoprefixer```
   ```npx tailwindcss init```
5. Run ```ng serve```, which returns a localhost link of the current build.

To build the backend:
1. Create your own personal MongoDB trial database (https://cloud.mongodb.com/).
2. Create a ".env" file, and populate it with SECRET_KEY= some 32-bit string.
3. Also populate DB_URL with your URL to the MongoDB instance.
4. Run ```npm install``` to install all necessary packages.
5. Run ```npx nodemon index.js``` to start the backend.