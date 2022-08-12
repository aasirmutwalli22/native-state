export default class App {
    constructor(root) {
        this.root = root
        this.inputs = Array.from(this.root.querySelectorAll('[model]'))
        this.spans = Array.from(this.root.querySelectorAll('[text]'))
        this.inputs.forEach(element => element.oninput = () => this._inputListener(element))
        this.initState()
        this.render()
    }

    _state = {}

    initState(){
        /// read previous state from inputs
        this.inputs.forEach(element => this._state[element.getAttribute('model')] = element.value)
    }

    get state() {
        return this._state
    }

    set state(value) {
        this._state = value
        this.render()
    }

    _inputListener = (element) => {
        this.state[element.getAttribute('model')] = element.value
        this.render()
    }

    render() {
        this.inputs.forEach(element => element.value = this._state[element.getAttribute('model')])
        this.spans.forEach(element => element.innerHTML = this._state[element.getAttribute('text')])
    }

    printCount() {
        console.log('model:' + this.inputs.length)
        console.log('text: ' + this.spans.length)
    }
}
