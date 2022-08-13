"use strict";

export default class App {
    constructor(root) {
        this.root = root
        this.scan()
        this.initState()
        this.render()
    }

    _state = {}

    /**
     * Read previous state from inputs
    */
    initState() {
        this.inputs.forEach(element => this._state[element.getAttribute('model')] = element.value)
    }
    /**
     * Returns current state of application
     */
    get state() {
        return this._state
    }
    /**
     * Set new state and render app
     */
    set state(value) {
        this._state = value
        this.render()
    }
    /**
     * Access single property of app state
     * @param {} key 
     * @returns state for key
     */
    useState(key = "") {
        return {
            key: key,
            state: this._state,
            render: this.render,
            get value() {
                return this.state[key]
            },
            set value(val) {
                this.state[key] = val
                this.render()
            }
        }
    }
    /**
     * Input field listener
     */
    _inputListener = (element) => {
        this.state[element.getAttribute('model')] = element.value
        this.render()
    }
    /**
     * Scan DOM attributes for using application
     */
    scan = () => {
        this.inputs = Array.from(this.root.querySelectorAll('[model]'))
        this.containers = Array.from(this.root.querySelectorAll('[text]'))
        this.lists = Array.from(this.root.querySelectorAll('[elements]'))

        this.inputs.forEach(element => element.oninput = () => this._inputListener(element))
    }
    /**
     * Update DOM data with current application state
     */
    render = () => {
        this.inputs.forEach(element => {
            element.value = this._state[element.getAttribute('model').toString()]
        })
        this.containers.forEach(element => {
            element.innerHTML = this._state[element.getAttribute('text').toString()]
        })
        this.lists.forEach(element => {
            var items = this._state[element.getAttribute('elements')]
            // console.log(items[0  ])
            // Array.from(this._state[element.getAttribute('elements').toString()])
            // .forEach(item => {
            //     console.log(item)
            // })
            // .forEach(value => {

            //     element.innerHTML = value
            // })
        })
    }
    /**
     * Print Scanned elements count
     */
    printCount() {
        console.log('model:' + this.inputs.length)
        console.log('text: ' + this.containers.length)
    }
}
