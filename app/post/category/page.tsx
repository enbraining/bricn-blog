'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabase';
import { Category } from '@/app/types/Category';

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const query = await supabase.rpc('group_by_category');
      const data = query.data;
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <Link
            href={`/post?category=${c.name}`}
            className={`hover:text-bricn-500 text-bricn-600 bg-bricn-800 py-1 px-3 rounded-md`}
            key={c.name}
          >
            <p className="whitespace-nowrap uppercase text-sm">{`${c.name} ${c.count}`}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
