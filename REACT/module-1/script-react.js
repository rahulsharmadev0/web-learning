class LoginForm extends React.Component {
    render() {
        return React.createElement('form', {},
            React.createElement('h1', {}, 'By Using React'),
            React.createElement('div', {},
                React.createElement('h2', {}, 'Login Form'),
                React.createElement('input', {
                    type: "text",
                    placeholder: "Enter you username",
                }),

                React.createElement('input', {
                    type: "password",
                    placeholder: "Enter you password"
                })
                ,
                React.createElement('button', {
                    type: "submit",
                }, "Login")
            )

        )
    }
}

const logInForm = ReactDOM.createRoot(document.getElementById('logInForm-via-React'));
logInForm.render(React.createElement(LoginForm));