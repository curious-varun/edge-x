import { atom } from 'recoil';
import { coursesType } from '@/db/course';



export const coursesAtom = atom<coursesType[]>({
  key: 'coursesAtom',
  default: [],
});
