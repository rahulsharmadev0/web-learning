const logInFormHtml = (
    <form action="">
        <h1>By Using React & Babel</h1>
        <div>
            <h2>Login Form</h2>
            <input type="text" placeholder="Enter your username" />
            <input type="password" placeholder="Enter your password" />
            <button type="submit">Login</button>
        </div>
    </form>
);


const root = ReactDOM.createRoot(document.querySelector('#logInForm-via-React-Babel'));
root.render(logInFormHtml);