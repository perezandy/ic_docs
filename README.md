## This is the code of the documentation website for Iron Coder.

Completed work towards having an online documentation as of 11/5/23 is:

1. Researched the best way of having a responsive web framework, while at the same time building to WASM using Rust.
2. Setup and Initialized the Leptos Rust framework, which features both frontend and backend functionality.
3. Integrated Tailwind CSS functionality.
4. Created a Landing Page component. The 'github' tab redirects to the main project's repository. All other tabs are floating, but have feedback when hovered over.



Completed work towards having an online documentation as of 11/24/23 is:

1. Established a Routing protocol, allowing for the user to switch between pages.
2. Created 3 new pages detailing how to get started with iron coder.
3. Created a 404 page in case the user mistypes a URL or something goes wrong.
4. Fully compiled to wasm! Website is now publicly accesible through github pages.


There is one known bug: User must refresh when switching pages, and content doesn't update dynamically.

Completed work towards having an online documentation as of 1/15/24 is:

1. Moved everything to use the Angular framework, as opposed to Leptos. This is mainly for material and resources available online - of which Leptos is lacking.
2. Moving frameworks successfully fixed the refresh bug.






To build this website locally:
1. Install Node.js (https://nodejs.org/en)
2. Install the Angular CLI with the following command: ```npm install -g @angular/cli```
3. Clone this repository
4. Navigate to the folder containing these files, and initialize the CSS library:
   ```npm install -D tailwindcss postcss autoprefixer```
   ```npx tailwindcss init```
5. Run ```ng serve```, which returns a localhost link of the current build.

