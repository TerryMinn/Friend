import { useEffect, useState } from "react";

/**
 * A custom React hook that checks if code is running on the client side
 * @returns {Object} An object containing the isClient state
 * @returns {boolean} isClient - Indicates whether the code is running in client environment
 */

const useCheck = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    return () => {
      setIsClient(false);
    };
  }, []);
  return { isClient };
};

export default useCheck;
