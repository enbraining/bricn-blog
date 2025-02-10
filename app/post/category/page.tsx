'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import { Category } from '@/app/types/Category';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.rpc('group_by_category');
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const onClickHandler = useCallback(
    (name: string) => {
      router.push(`/post?category=${name}`);
    },
    [router]
  );

  return (
    <div>
      <div className="mb-3 overflow-x-auto cursor-grab flex flex-wrap select-none gap-2 whitespace-nowrap">
        {categories.map((c) => (
          <div
            onClick={() => onClickHandler(c.name)}
            className={`hover:text-bricn-500 text-bricn-700 bg-bricn-800 px-2 py-1 rounded-sm`}
            key={c.name}
          >
            <p className="uppercase">{`${c.name} ${c.count}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
