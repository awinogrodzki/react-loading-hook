# React Loading Hook

[![npm](https://img.shields.io/bundlephobia/minzip/react-loading-hook?style=for-the-badge)](https://bundlephobia.com/result?p=react-loading-hook)

Easy asynchronous loading state management in React

## Install

    npm install react-loading-hook

or

    yarn add react-loading-hook

Please note that TypeScript type definition files are included.

## Quickstart

```jsx
import React from "react";
import { useLoadingCallback } from "react-loading-hook";

function App() {
  const [person, setPerson] = React.useState();
  const [fetchPerson, isLoading, error, reset] = useLoadingCallback(
    async () => {
      const response = fetch("https://swapi.dev/api/people/1");
      const person = await response.json();

      setPerson(person);
    }
  );

  if (isLoading) {
    return <span>Is loading...</span>;
  }

  if (error) {
    return <span>{error}</span>;
  }

  return <span>{person.name}</span>;
}
```
