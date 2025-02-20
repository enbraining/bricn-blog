import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

export default function SearchParams({
  setTag,
  setLoadingSearchParams,
}: {
  setTag: Dispatch<SetStateAction<string | null>>;
  setLoadingSearchParams: Dispatch<SetStateAction<boolean>>;
}) {
  const searchParams = useSearchParams();
  const initialRef = useRef(true);

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
    }

    setLoadingSearchParams(!!searchParams);
    setTag(searchParams.get('category'));
  }, [searchParams, setLoadingSearchParams, setTag]);

  return <></>;
}
