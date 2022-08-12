import App from '../src/index.js'

const app = new App(document.body)

app.state = {
    username: 'admin',
    email: 'admin@main.com',
    age: 55
}

document.getElementById('submit').onclick = () => {
    app.render()
    console.table(app.state)
    app.state = { ...app.state, username: 'admin2' }
}
