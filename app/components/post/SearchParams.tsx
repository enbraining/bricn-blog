import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

export default function SearchParams({
  setCategory,
}: {
  setCategory: Dispatch<SetStateAction<string | null>>;
}) {
  const searchParams = useSearchParams();
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      setCategory(searchParams.get('category'));
    }
  }, [searchParams, setCategory]);

  return <></>;
}
