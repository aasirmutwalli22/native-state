import App from '../src/app.js'

const app = new App(document.body)
/// example using direct app state give flexibility to create getters and setters
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
/// example using useState method of app gives simplicity to handle single arguments of state
const firstname = app.useState('firstname')
/// get value from state
console.log(firstname.value)
/// set new value to state
firstname.value = 8
/// print all
console.log(app.state)
