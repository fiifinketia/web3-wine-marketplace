# **Code Standards**

The following are the code standards for the Quasar Vue3 Web3 project. These standards should be followed in order to maintain consistency and readability across the project.

## File Structure

The project should have the following file structure:

```
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── router/
│   ├── store/
│   ├── App.vue
│   └── main.js
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
└── quasar.conf.js
```

- `src/` directory contains all the source code of the project.
- `assets/` directory contains all the assets (e.g. images, fonts, etc.).
- `components/` directory contains all the reusable Vue components.
- `layouts/` directory contains all the Vue layouts used for the app.
- `pages/` directory contains all the Vue pages used for the app.
- `router/` directory contains all the Vue router configuration files.
- `store/` directory contains all the Vuex store files.
- `App.vue` is the root Vue component of the app.
- `main.js` is the entry point of the app.
- `public/` directory contains all the static assets.
- `quasar.conf.js` is the configuration file for Quasar.

## Using Quasar Classes and Components

It is recommended to use Quasar classes and components rather than default custom HTML components, as this will make the code more readable, maintainable, and consistent with the project. Always check the quasar docs for components and assets before creating custom or using another library.

For example, to create a button, use the Quasar `q-btn` component instead of the default `button` HTML element.

```html
<template>
	<div class="page">
		<q-btn color="primary">Click Me</q-btn>
		<q-row>
			<q-col cols="6">Left Column</q-col>
			<q-col cols="6">Right Column</q-col>
		</q-row>
	</div>
</template>
```

Quasar provides a flexible and powerful grid system that allows you to create responsive grid layouts for your Vue 3 application.

For example

```html
<template>
	<div class="q-pa-md">
		<div class="row q-col-gutter-md">
			<div class="col-4">Column 1</div>
			<div class="col-4">Column 2</div>
			<div class="col-4">Column 3</div>
		</div>
	</div>
</template>
```

Quasar provides a large number of icons that you can use in your application. You can use the `q-icon` component to display an icon. Here is an example:

```
<q-icon name="fas fa-star" />
```

Quasar provides a `q-dialog` component that allows you to display a dialog box. You can use this to create confirmation dialogs, error messages, and more. Here is an example:

```html
<q-dialog v-model="showDialog">
	<q-card>
		<q-card-section>
			Are you sure you want to delete this item?
		</q-card-section>
		<q-card-actions>
			<q-btn label="Cancel" @click="showDialog = false" />
			<q-btn label="Delete" @click="deleteItem" color="negative" />
		</q-card-actions>
	</q-card>
</q-dialog>
```

## Naming Conventions

### Components

- Components should be named in PascalCase.
- Each component should have a unique name.
- If a component is used only within another component, it should be prefixed with an underscore`_`.

### CSS Classes

- CSS classes should be named in kebab-case.
- Classes should be descriptive and should indicate the purpose of the element they are attached to.

## Code Formatting

- Use single quotes (`''`) for string literals.
- Use semicolons at the end of each statement.
- Use spaces between operators and operands.
- Use`===` instead of`==` for equality comparisons.
- Use`let` or`const` instead of`var`.
- Use object destructuring instead of dot notation to access object properties.
- Use arrow functions instead of function declarations.
- Avoid using`this` in arrow functions.
- Use 1 tab for indentation

```javascript
const myObj = { foo: 'bar', baz: 'qux' };

const myFunction = (arg1, arg2) => {
	let result = arg1 + arg2;
	return result;
};

const myArrowFunction = () => {
	const { foo, baz } = myObj;
	return `${foo} ${baz}`;
};

let myVar = 'hello';
myVar += ' world';

if (myVar === 'hello world') {
	console.log('This is true.');
} else {
	console.log('This is false.');
}
```

## JavaScript Best Practices

- Use`async`/`await` instead of`Promise.then()` for asynchronous operations.
- Use default parameter values instead of`if` statements to handle missing function arguments.
- Use`map`,`reduce`,`filter`, and other array methods instead of`for` loops when possible.
- Use`const` instead of`let` for variables that don't change avoid using `var`.
- Avoid using global variables and functions.
- Use comments to explain complex code or algorithms.

```javascript
// Use async/await instead of Promise.then() for asynchronous operations
async function getData() {
	try {
		const response = await fetch('/api/data');
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

// Use default parameter values instead of if statements to handle missing function arguments
function greet(name = 'world') {
	console.log(`Hello, ${name}!`);
}

greet(); // Output: Hello, world!
greet('Alice'); // Output: Hello, Alice!

// Use map, reduce, filter, and other array methods instead of for loops when possible
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // Output: 15

const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // Output: [2, 4]

// Use const instead of let for variables that don't change
const pi = 3.14159;
const radius = 5;
const area = pi * radius ** 2;
console.log(area); // Output: 78.53975

// Avoid using global variables and functions
(function () {
	const message = 'Hello, world!';
	console.log(message);
})();

// Use comments to explain complex code or algorithms
function fibonacci(n) {
	// Check if the input is a non-negative integer
	if (!Number.isInteger(n) || n < 0) {
		throw new Error('Invalid input');
	}

	// Calculate the n-th Fibonacci number
	let a = 0;
	let b = 1;
	for (let i = 0; i < n; i++) {
		const temp = a + b;
		a = b;
		b = temp;
	}
	return a;
}

console.log(fibonacci(5)); // Output: 5
```

## Vue Best Practices

- Use single-file components with a`.vue` extension.
- Keep components small and focused on a single task.
- Use Pinia to manage state in applications.
- Use Vue Router for client-side routing.
- Use`$emit` to communicate between parent and child components.
- Use watchers to react to changes in component props or data.
- Use`v-if` for conditional rendering and `v-for` for list rendering.
- Use the shorthand`@` to bind event handlers.

## ENV Variables

- ENV varaibles should not end with a `/` to avoid confusion when using them
