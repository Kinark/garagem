import { SetStateAction, useMemo } from 'react';
import { PrimitiveAtom, useAtom } from 'jotai';
import { atomWithStorage, splitAtom } from 'jotai/utils';
import { focusAtom } from 'jotai/optics';
import { atom } from 'jotai';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

export interface Car {
   id: string;
   model: string;
   brand: string;
   power: number;
}

interface Garagem {
   cars: Car[];
   lastSave: number;
}

const initialState: Garagem = {
   cars: [],
   lastSave: dayjs().unix(),
};

// This is the raw "garagem" atom that will be persisted
export const rawGaragemAtom = atomWithStorage('garagem', initialState);

// This is a derived atom, it's used to automatically save the timestamp
// on every update.
const garagemAtom = atom(
   (get) => get(rawGaragemAtom),
   async (_get, set, update) => {
      const newGaragem: Garagem = {
         cars: (update instanceof Promise ? await update : update).cars,
         lastSave: dayjs().unix(),
      };
      set(rawGaragemAtom, newGaragem);
   },
);

// This focus only on the cars array to prevent rerenders on other fields
// Read more in: https://jotai.org/docs/advanced-recipes/large-objects
const cars = focusAtom(garagemAtom, (optic) => optic.prop('cars'));

export const carsAtoms = splitAtom(cars, (c) => c.id);

// This is a custom hook that gets a car by it's id
// in a optimal way.
export const useCarAtom = (id: string) => {
   const [carsAtomsArr] = useAtom(carsAtoms);
   const car = useMemo(
      () =>
         atom(
            (get) => {
               const foundCar = carsAtomsArr.find((car) => get(car).id === id);
               if (!foundCar) return false;
               return get(foundCar);
            },
            (get, set, update: SetStateAction<Car>) => {
               const carAtom = carsAtomsArr.find((car) => get(car).id === id);
               if (!carAtom) return;
               set(carAtom, update);
            },
         ),
      [],
   );
   return useAtom(car);
};

// A global selected car state atom
export const selectedCarAtom = atom<Car | null>(null);

// This is a simple car object creator
export const createCarObj = (car?: Omit<Car, 'id'>) => {
   const id = nanoid();
   return {
      id,
      ...(car || {
         brand: 'New Car',
         model: 'Model',
         power: 200,
      }),
   };
};
