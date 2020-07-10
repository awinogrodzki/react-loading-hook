# React Loading Hook

[![npm](https://img.shields.io/bundlephobia/minzip/react-loading-hook?style=for-the-badge)](https://bundlephobia.com/result?p=react-loading-hook)

Async loading and error state management hook for TypeScript and JavaScript React applications

## Install

    npm install react-loading-hook

or

    yarn add react-loading-hook

Please note that TypeScript type definition files are included.

## Quickstart

```jsx
import React from "react";
import { useLoadingCallback } from "react-loading-hook";

export default function App() {
  const [person, setPerson] = React.useState();
  const [fetchPerson, isLoading, error, reset] = useLoadingCallback(
    async (id) => {
      const response = await fetch(`https://swapi.dev/api/people/${id}/`);
      const person = await response.json();

      setPerson(person);
    }
  );

  React.useEffect(() => {
    const personId = 1;

    fetchPerson(personId);
  }, []);

  if (error) {
    return <span>{error.message}</span>;
  }

  if (isLoading || !person) {
    return <span>Is loading...</span>;
  }

  return <span>{person.name}</span>;
}
```
