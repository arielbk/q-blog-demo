import { useEffect } from 'react';

const greeting = 'Hello from';

const useComponentLogger = (componentName: string, customGreeting?: string) => {
  useEffect(() => {
    // disable while testing
    if (process.env.NODE_ENV === 'test') return;
    console.log(`${customGreeting || greeting} ${componentName}`);
  }, [componentName, customGreeting]);
};

export default useComponentLogger;
