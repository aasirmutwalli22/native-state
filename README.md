# Native State

State management library for venilla javascript

## usage
--------------------------------------------------
### 1. Initialize app in script
```js
import App from '../src/app.js'

const app = new App(document.body)
```
--------------------------------------------------
### 2. Set app state
```js
app.state = {
    firstname: 'john',
    lastname: 'doe',
    tasks: [1, 2, 3, 4],
    get fullname() {
        return `${this.firstname} ${this.lastname}`
    }
}
```
--------------------------------------------------
### 3. Update state
```js
// updating firstname property of app state
app.state = { ...app.state, firstname: 'admin2' }
```
--------------------------------------------------
### 4. Print app's current state
```js
console.log(app.state)
```
--------------------------------------------------
### 5. Example using useState api
```js
/**
 *Access single property of app state
 * @param {} key key of state to update
 * @param {} completeRender 
 * true: to render complete app, 
 * false: only render respective state
 * @returns state for key
 */
const firstname = app.useState('firstname', true)
// get value
console.log(firstname.value)
// set value
firstname.value = 8
```
--------------------------------------------------