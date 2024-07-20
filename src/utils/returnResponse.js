const responseDataExample =
  "## React JS: A JavaScript Library for Building User Interfaces\n\nReact.js, often simply called React, is a **declarative, efficient, and flexible JavaScript library** for building user interfaces. It's developed and maintained by Meta (formerly Facebook) and is incredibly popular for creating **dynamic, interactive web applications.**\n\n**Here's a breakdown of its key features:**\n\n* **Component-based:** React lets you break down your UI into reusable, independent components, making development more organized and maintainable.\n* **Virtual DOM:** React uses a virtual representation of the actual DOM, which allows for efficient updates. Changes are calculated on the virtual DOM first, and only the necessary updates are applied to the real DOM, boosting performance.\n* **JSX:** React uses JSX, a syntax extension for JavaScript, which allows you to write HTML-like structures directly within your JavaScript code. This makes UI code more readable and intuitive.\n* **Unidirectional Data Flow:** React follows a unidirectional data flow, meaning data flows in one direction, making state management easier and debugging simpler.\n* **Large Community & Ecosystem:** React has a vast and active community, providing extensive documentation, resources, and support.\n\n**Example Code:**\n\n```javascript\nimport React from 'react';\nimport ReactDOM from 'react-dom/client';\n\nfunction Greeting(props) {\n  return (\n    <h1>Hello, {props.name}!</h1>\n  );\n}\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(<Greeting name=\"World\" />);\n```\n\n**Explanation:**\n\n1. **Import:** We import React and ReactDOM. \n2. **Component:** We define a function component named `Greeting` that takes a `name` prop. \n3. **JSX:**  We use JSX to define the component's structure, which renders an `h1` tag with the greeting message.\n4. **Rendering:** We create a root element and render the `Greeting` component with the `name` prop set to \"World\".\n\n**Key takeaways:**\n\n* This simple example showcases the fundamental building block of React - the component. \n* React components can be nested to create complex UIs.\n* JSX makes writing UI code more readable and intuitive.\n\n**To learn more about React, explore these resources:**\n\n* [React Official Website](https://reactjs.org/)\n* [React Documentation](https://reactjs.org/docs/getting-started.html)\n* [Create React App](https://create-react-app.dev/) - A popular tool for setting up React projects.\n\nReact is a powerful and versatile library for building modern web applications. By leveraging its features and principles, you can create engaging and interactive user experiences. \n";
