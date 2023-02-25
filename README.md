# Esy-State
Make your DOM react to changes.

Low-code framework, no aditional dependencies (100% Vanilla JS), no building, no transpilation.

[![Test](https://github.com/esyfyi/esy-state/actions/workflows/test.yml/badge.svg)](https://github.com/esyfyi/esy-state/actions/workflows/test.yml)
[![Release](https://github.com/esyfyi/esy-state/actions/workflows/npm-publish.yml/badge.svg?branch=main)](https://github.com/esyfyi/esy-state/actions/workflows/npm-publish.yml)
[![npm version](https://badge.fury.io/js/@esyfyi%2Fesy-state.svg)](https://badge.fury.io/js/@esyfyi%2Fesy-state)  

## 👋 Getting Started

```shell
$ npm i @esyfyi/esy-state
```

```javascript
// Serv the module files staticly (With express for example) 
app.use('/esy-state',  express.static('node_modules/@esyfyi/esy-state', { index: ["index.mjs"] }));
```

```html
<h1 #hello-world></h1>
<script type="module">
  import { state } from './esy-state';
  state["hello-world"] = 'Hello World!';
</script>
```

## 🤨 How it works?

TODO: Explain how state and mutations are working
TODO: Explain persistence and how to not persisit certain variables (__)

## 🧩 Features

### Simple one-way data binding
```html
<h1 #hello-world></h1>
<script type="module">
  import { state } from './esy-state';
  state["hello-world"] = 'Hello World!';
</script>
```

### TODO: One-way Data binding with "Mustache" syntax
```html
<h1 #world>Hello {{world]]!</h1>
<script type="module">
  import { state } from './esy-state';
  state["world"] = 'World';
</script>
```

### One-way data binding (arbitrary HTML)

⚠️ Dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily lead to XSS vulnerabilities. Only use this method on trusted content and never on user-provided content.

```html
<div +hello-world></div>
<script type="module">
  import { state } from './esy-state';
  state["hello-world"] = '<h1>Hello World!</h1>';
</script>
```

### TODO: Attribute binding (Two-way data binding)
```html
<h1 #foo></h1>
<input type="text" :value="foo" @change="onInputChange" id="input">
<script type="module">
  import { state, mutations } from './esy-state';
  state["foo"] = 'bar!';
  mutations.onInputChange = () => {
    const name = document.getElementById("input").value;
    state["foo"] = bar;
    console.log(state);
  };
</script>
```

### Conditional rendering
```html
<div ?foo>I'm visible!</div>
<div ?!foo>I'm not visible</div>
<script type="module">
  import { state } from './esy-state';
  state["foo"] = true;
</script>
```

### List rendering
```html
<div %arr></div>

 <li %people>
  <div>Index: {{__index}}</div>
  <div>Name: {{name}}</div>
  <div>Age: {{age}}</div>
</li>

<script type="module">
  import { state } from './esy-state';
  state["arr"] = [1, 2, 3, 4, 5];
  state["people"] = [{ name: "John", age: 20 }, { name: "Jane", age: 21 }];
</script>
```

### Muanipulate the state (mutations)
```html
Hello <div #name>Noname</div>!
<input type="text" id="name" placeholder="Enter your name..">
<button @click="setName">Add</button>

<script type="module">
  import { state, mutations } from './esy-state';
  mutations.setName = () => {
    const name = document.getElementById("name").value;
    state["name"] = name;
  };
</script>
```

## 🚀 Roadmap
- Known issue: Neasted list rendering is not possible yet.
- Improvment needed on: Mustache template implementation.
- Improvment needed on: Subscription handling.
- Better documentation.
- Figure out: CDN distribution besides NPM package.

## 💡 Future Feature Ideas
- CSS class manipulation (add, remove, toggle)
- A common pain-point is how to create Modals/Pop-ups?
- How we could decapule and re-use partial logic? Web Components maybe?
- Routing (nice urls /foo/bar)?