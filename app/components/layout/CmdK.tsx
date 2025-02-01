'use client';

import 'react-cmdk/dist/cmdk.css';
import CommandPalette, { filterItems, getItemIndex } from 'react-cmdk';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { User } from '@supabase/supabase-js';

const CmdK = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();
  }, [open]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        (navigator?.platform?.toLowerCase().includes('mac')
          ? e.metaKey
          : e.ctrlKey) &&
        e.key === 'k'
      ) {
        e.preventDefault();
        e.stopPropagation();

        setOpen((currentValue) => {
          return !currentValue;
        });
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const filteredItems = filterItems(
    [
      {
        heading: 'Auth',
        id: 'auth',
        items: [
          user
            ? {
                id: 'signout',
                children: '로그아웃',
                icon: 'CodeBracketIcon',
                onClick: async () => {
                  await supabase.auth.signOut();
                },
              }
            : {
                id: 'signin',
                children: '로그인',
                icon: 'CodeBracketIcon',
                href: '/auth/signin',
              },
        ],
      },
      {
        heading: 'Post',
        id: 'post',
        items: [
          {
            id: 'newpost',
            children: '글 작성하기',
            icon: 'PencilSquareIcon',
            href: '/post/new',
          },
        ],
      },
    ],
    search
  );

  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={setOpen}
      search={search}
      isOpen={open}
      page={'root'}
    >
      <CommandPalette.Page id="root">
        {filteredItems.length ? (
          filteredItems.map((list) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
                <CommandPalette.ListItem
                  key={id}
                  index={getItemIndex(filteredItems, id)}
                  {...rest}
                />
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <CommandPalette.FreeSearchAction />
        )}
      </CommandPalette.Page>

      <CommandPalette.Page id="projects">Projects page</CommandPalette.Page>
    </CommandPalette>
  );
};

export default CmdK;
