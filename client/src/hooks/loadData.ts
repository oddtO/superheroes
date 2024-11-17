import { useState, useEffect } from "react";
import { useMemo } from "react";

type ReturnType<DataType> =
  | {
      dataToLoad: null;
      isLoading: true;
      isError: false;
      errors: unknown;
    }
  | {
      dataToLoad: DataType;

      isLoading: false;
      isError: false;
      errors: null;
    }
  | {
      dataToLoad: null;
      isLoading: false;
      isError: true;
      errors: unknown;
    };

export function useData<DataType>(loadData: () => Promise<DataType>) {
  const BaseState: ReturnType<DataType> = useMemo(
    () => ({
      dataToLoad: null,
      isLoading: true,
      isError: false,
      errors: null,
    }),
    [],
  );
  const [loadingState, setLoadingState] =
    useState<ReturnType<DataType>>(BaseState);

  useEffect(() => {
    async function fetchData() {
      try {
        const loadedData = await loadData();

        setLoadingState({
          dataToLoad: loadedData,
          isLoading: false,
          isError: false,
          errors: null,
        });
      } catch (error) {
        setLoadingState({
          dataToLoad: null,
          isLoading: false,
          isError: true,
          errors: error,
        });
      }
    }

    fetchData();
  }, [loadData]);

  return loadingState;
}
