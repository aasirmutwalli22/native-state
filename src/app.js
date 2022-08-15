"use strict";

export const ElementQueries = [
    { query: 'model', property: 'value', isInput: true },
    { query: 'text', property: 'textContent' },
]

export default class App {
    /** 
     * set queries for scanning app dom
    */
    #queries = []
    /**
     * Array holding uniq keys of elements and state
     */
    #elementKeys = []
    /**
     * Object holding state of app
     */
    #state = {}
    /** 
     * Array of object holding elements and other required parameters
     * {key: string, query: string, property : string, element: HTMLElement}[] 
    */
    #elements = []

    constructor(root) {
        this.root = root
        this.scan()
        this.#addInputListener()
        this.initState()
        this.render()
    }
    /**
     * Filter app elements with type inputs
     */
    get #inputElements() {
        return this.#elements.filter(item => item.isInput)
    }
    /**
     * Input field listener
     */
    #inputListener = (event) => {
        this.state[event.getAttribute('model')] = event.value
        this.render()   // getter depending on input change will not work if renderWithKey is called
        // this.renderWithKey(event.getAttribute('model'))
    }
    /**
     * Add oninput event listener for app state update
     */
    #addInputListener = () => {
        this.#inputElements.forEach(item => item.element.oninput = () => this.#inputListener(item.element))
    }
    /**
     * Read previous state from inputs
    */
    initState() {
        this.#inputElements.forEach(item => this.#state[item.key] = item.element.value)
    }
    /**
     * Returns current state of application
     */
    get state() {
        return this.#state
    }
    /**
     * Set new state and render app
     */
    set state(value) {
        this.#state = value
        this.render()
    }
    get elements () {
        return this.#elements
    }

    /**
     * Get current queries of app
    */
    get queries(){
        return this.#queries;
    }
    /** 
     * Set new queries to app
    */
    set queries(value = []) {
        this.#queries = value
        this.scan()
        this.render()
    }
    /**
     * Access single property of app state
     * @param {} key key of state to update
     * @param {} completeRender 
     * true: to render complete app, 
     * false: only render respective state
     * @returns getter and setter of state for key
     */
    useState(key = "", completeRender = false) {
        return {
            key: key,
            state: this.#state,
            completeRender: completeRender,
            render: this.render,
            renderProperty: this.renderWithKey,
            get value() {
                return this.state[key]
            },
            set value(val) {
                this.state[key] = val
                this.completeRender ? this.render() : this.renderProperty(key)
            }
        }
    }
    /**
     * Scan DOM attributes for using application
     */
    scan = () => {
        // scan through DOM and extract elements with defined queries
        this.#queries.forEach(query => Array
            .from(this.root.querySelectorAll(`[${query.query}]`))
            .map(item => ({
                key: item.getAttribute(query.query),
                element: item,
                ...query,
            }))
            .forEach(item => this.#elements.push(item)))
        // extract keys from elements for state
        this.#elementKeys = Array.from(new Set(this.#elements.map(item => item.key)))
        // add input listeners
        this.#addInputListener()
    }
    /**
     * Update single DOM data with current application state
     */
    renderWithKey = (key) => {
        this.#elements
            .filter(item => item.key === key)
            .forEach(item => {
                return item.element[item.property] = this.#state[item.key];
            })
    }
    /**
     * Update DOM data with current application state
     */
    render = () => {
        this.#elementKeys.forEach(item => this.renderWithKey(item))
    }
    /**
     * Print Scanned elements count
     */
    printCount() {
        console.log('model:' + this.inputs.length)
        console.log('text: ' + this.containers.length)
    }
    /**
     * reset app state
     */
    resetState() {
        this.state = {}
    }
}
