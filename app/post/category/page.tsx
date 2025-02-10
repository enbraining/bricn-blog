'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabase';
import { Category } from '@/app/types/Category';

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.rpc('group_by_category');
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="mb-3 overflow-x-auto cursor-grab flex flex-wrap select-none gap-2 whitespace-nowrap">
        {categories.map((c) => (
          <Link
            href={`/post?category=${c.name}`}
            className={`hover:text-bricn-500 text-bricn-700 bg-bricn-800 px-2 py-1 rounded-sm`}
            key={c.name}
          >
            <p className="uppercase">{c.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
