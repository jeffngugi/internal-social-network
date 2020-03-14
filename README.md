
<h1>Internal Social Network app </h1>

<p>This is a fullstack javascript application for Andela/Facebook Open Classroom #devCTraining final project </p>
<hr />
<h3>Technologies used  </h3>
<ul style="list-style-type:square;">
    <li><a href="https://cloudinary.com/" target="_blank"> Cloudinary </a> </li>
    <li><a href="https://www.postgresql.org/docs/10/index.html" target="_blank"> Postgres </a> </li>
    <li><a href="https://reactjs.org/" target="_blank"> React JS </a> </li>
    <li><a href="http://www.passportjs.org/" target="_blank"> Passport </a> </li>
    <li><a href="https://redux.js.org/" target="_blank"> Redux </a> </li>
    <li><a href="https://jwt.io/" target="_blank"> Json web token </a> </li>
    <li><a href="https://expressjs.com/" target="_blank"> Node/Express js </a> </li>
</ul>
<hr />

<h3> How to install and run the application in your computer </h3>

<p>1. Ensure you have <a href="https://nodejs.org/en/" target="_blank"> nodejs </a>, <a href="https://www.postgresql.org/" target="_blank"> Postgres </a> and <a href="https://www.npmjs.com/" target="_blank">npm </a> are installed in your computer. If you are on windows OS, you can download  <a href="https://git-scm.com/">git </a> for easy command controls</p>

<p>2. Download/Clone the application to your local computer by <code> git clone https://github.com/jeffngugi/internal-social-network.git </code>  </p>

<p>3. Cd into the project by <code> cd internal-social-network </code> and run <code>npm install </code> to install dependencies the to backend and <code>npm run client-install </code> to install dependencies to the fronted part of the application </p>

<p>4. Run <code>cp .env.example .env </code> and set your database(postgres) url and other environment variables </p>

<p>5. After setting up the databases, run <code> npm run createTables </code> to create tables in the databases(kinda migrations) </p>

<p>6. Run <code>npm run dev</code> to start the application. If you'd like to run the backend alone run <code>npm run server </code>

<hr />

