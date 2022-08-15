import App, { ElementQueries } from '../src/app.js'

const app = new App(document.body)

// not compulsary, but for app state initialising
app.state = {
    firstname: '',
    lastname: '',
    profile: undefined,
    get fullname() {
        return `${this.firstname} ${this.lastname}`
    },
    get formValid() {
        return this.firstname === "" && this.lastname === ""
    },
    get hideReset() {
        return this.firstname === "" && this.lastname === ""
    },
}

app.queries = [
    { query: 'model', property: 'value', isInput: true },
    { query: 'text', property: 'textContent' },
    { query: 'disable', property: 'disabled' },
    { query: 'hide', property: 'hidden' }
]

const profileImage = app.useState('profile', true)

document.forms['form']['profile'].onchange = event => {
    profileImage.value = event.target.value
    console.log('profile selected')
}

document.forms['form'].onreset = event => {
    app.state.firstname = ''
    app.state.lastname = ''
}

document.forms['form'].onsubmit = event => {
    event.preventDefault()  // override default submit behaviour of form 
    console.table(JSON.parse(JSON.stringify(app.state)))
    console.table(app.elements)
}