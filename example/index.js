import App, { ElementQueries } from '../src/app.js'

const app = new App(document.body)

// not compulsary, but for app state initialising
app.state = {
    firstname: '',
    lastname: '',
    // tasks: [1, 2, 3, 4],
    get fullname() {
        return `${this.firstname} ${this.lastname}`
    },
    get formValid() {
        return this.firstname === "" && this.lastname === ""
    }
}
app.queries = [
    { query: 'model', property: 'value', isInput: true },
    { query: 'text', property: 'textContent' },
    { query: 'disable', property: 'disabled' },
]

document.forms['form'].onreset = (event) => {
    event.preventDefault()  // override default reset behaviour of form
    app.resetState()    // will remove all getters
}
document.forms['form'].onsubmit = (event) => {
    event.preventDefault()  // override default submit behaviour of form 
    console.table(JSON.parse(JSON.stringify(app.state)))
}