import { useCallback, useState } from 'react';

export default function useApiRequest(apiFunction) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (params, { onSuccess, onError }) => {
      try {
        setIsLoading(true);
        setError(null);

        await new Promise(resolver => setTimeout(resolver, 1000));
        const response = await apiFunction(params);
        setData(response.data);
        if (onSuccess) {
          onSuccess(response);
        }
      } catch (err) {
        setError(err);
        if (onError) {
          onError(err);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction],
  );

  return {
    isLoading,
    error,
    data,
    execute,
  };
}
