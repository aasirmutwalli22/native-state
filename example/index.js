import App from '../src/app.js'

const app = new App(document.body)

app.state = {
    firstname: 'john',
    lastname: 'doe',
    tasks: [1, 2, 3, 4],
    get fullname() {
        return `${this.firstname} ${this.lastname}`
    }
}

document.getElementById('submit').onclick = () => {
    app.state = { ...app.state, firstname: 'admin2' }
    console.table(app.state)
}
