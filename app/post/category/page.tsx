'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import { Tag } from '@/app/types/Tag';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [tags, setTags] = useState<Tag[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTags = async () => {
      const { data } = await supabase.rpc('group_by_tag');
      setTags(data);
    };

    fetchTags();
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
        {tags.map((c) => (
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
