import { useEffect } from 'react';

const greeting = 'Hello from';

const useComponentLogger = (componentName: string, customGreeting?: string) => {
  useEffect(() => {
    console.log(`${customGreeting || greeting} ${componentName}`);
  }, [componentName, customGreeting]);
};

export default useComponentLogger;
