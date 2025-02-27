'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import Link from 'next/link';
import { TagCount } from '@/app/types/TagCount';

export default function Page() {
  const [tagCounts, setTagCounts] = useState<TagCount[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const { data } = await supabase.rpc('group_by_tag');
      setTagCounts(data);
    };

    fetchTags();
  }, []);

  return (
    <div>
      <div className="mb-3 cursor-grab flex-wrap select-none gap-2 whitespace-nowrap">
        {tagCounts.map((c) => (
          <Link
            href={`/?tag=${c.name}`}
            className={`hover:text-bricn-100 text-bricn-300  px-2 py-1 rounded-sm`}
            key={c.name}
          >
            <p className="uppercase">{`${c.name} (${c.count})`}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
