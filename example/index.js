import App from '../src/app.js'

const app = new App(document.body)

// not compulsary, but for app state initialising
app.state = {
    firstname: 'john',
    lastname: 'doe',
    // tasks: [1, 2, 3, 4],
    get fullname() {
        return `${this.firstname} ${this.lastname}`
    }
}

document.forms['form'].onreset = (event) => {
    event.preventDefault()  // override default reset behaviour of form
    app.resetState()
}

document.forms['form'].onsubmit = (event) => {
    event.preventDefault()  // override default submit behaviour of form 
    console.table(JSON.parse(JSON.stringify(app.state)))
}