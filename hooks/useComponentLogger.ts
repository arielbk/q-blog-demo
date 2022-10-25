import { useEffect } from 'react';

const useComponentLogger = (
  componentName: string,
  greeting: string = 'Hello from'
) => {
  useEffect(() => {
    // disable while testing
    if (process.env.NODE_ENV === 'test') return;
    console.log(`${greeting} ${componentName}`);
  }, [componentName, greeting]);
};

export default useComponentLogger;
