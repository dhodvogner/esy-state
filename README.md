# Esy-State
Make your DOM react to state changes

## 👋 Getting Started

```shell
$ npm i esy-state
// Or import it via CDN
```

```html
<h1 #hello-world></h1>
<script type="module">
  import { state } from 'esy-state';
  state["hello-world"] = 'Hello World!';
</script>
```

## 🧩 Features

### Binding state data for a DOM element
```html
<h1 #hello-world></h1>
<script type="module">
  import { state } from 'esy-state';
  state["hello-world"] = 'Hello World!';
</script>
```

### Repeater for Arrays and Objects
```html
<div %arr></div>

 <li %people>
  <div>Index: {{__index}}</div>
  <div>Name: {{name}}</div>
  <div>Age: {{age}}</div>
</li>

<script type="module">
  import { state } from 'esy-state';
  state["arr"] = [1, 2, 3, 4, 5];
  state["people"] = [{ name: "John", age: 20 }, { name: "Jane", age: 21 }];
</script>
```

### Mutations to manipulate the state
```html
Hello <div #name>Noname</div>!
<input type="text" id="name" placeholder="Enter your name..">
<button @click="setName">Add</button>

<script type="module">
  import { state, mutations } from 'esy-state';
  mutations.setName = () => {
    const name = document.getElementById("name").value;
    state["name"] = name;
  };
</script>
```

## 🚀 Roadmap

- Better mustache like templating concept: ```<div #>{{ foo }} Bar</div>```
- Fix dodgey subscription handling
- Figure out CDN hosting
- Figure out building npm package
- Better documentation
- Release the first version
