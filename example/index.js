import App from '../src/app.js'

const app = new App(document.body)

app.state = {
    firstname: 'john',
    lastname: 'doe',

    get fullname(){
        return `${this.firstname} ${this.lastname}`
    }
}

document.getElementById('submit').onclick = () => {
    console.table(app.state)
    app.state = { ...app.state, firstname: 'admin2' }   /// getter not working properly
}