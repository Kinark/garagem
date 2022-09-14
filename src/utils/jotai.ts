import { WritableAtom, atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export function atomWithToggle(
   initialValue?: boolean,
): WritableAtom<boolean, boolean | undefined> {
   const anAtom = atom(initialValue, (get, set, nextValue?: boolean) => {
      const update = nextValue ?? !get(anAtom);
      set(anAtom, update);
   });

   return anAtom as WritableAtom<boolean, boolean | undefined>;
}

export function atomWithToggleAndStorage(
   key: string,
   initialValue: boolean = true,
   storage?: any,
): WritableAtom<boolean, boolean> {
   const anAtom = atomWithStorage(key, initialValue, storage);
   const derivedAtom = atom(
      (get) => get(anAtom),
      (get, set, nextValue?: boolean) => {
         const update = nextValue ?? !get(anAtom);
         set(anAtom, update);
      },
   );

   return derivedAtom;
}
