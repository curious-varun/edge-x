import { revalidatePath } from 'next/cache';

export function reloadCourcesPage() {
  revalidatePath('/courses');
}

export function reloadHomeage() {
  revalidatePath('/');
}
