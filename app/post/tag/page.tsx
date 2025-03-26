'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import Link from 'next/link';
import { TagCount } from '@/app/types/TagCount';
import Image from 'next/image';

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
      <div className="mb-3 cursor-grab grid sm:grid-cols-5 grid-cols-3 flex-wrap select-none gap-2 whitespace-nowrap">
        {tagCounts.map((c) => (
          <Link className="grid" href={`/post/?tag=${c.name}`} key={c.name}>
            <Image
              src={'/images/macos-folder-blue512x512@2x.svg'}
              alt="folder"
              className="mx-auto"
              width={100}
              height={100}
            />
            <p className="mx-auto">{`${c.name}`}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
