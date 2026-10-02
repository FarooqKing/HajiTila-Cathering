"use client";

import { useSyncExternalStore } from "react";

/** In-memory dish selection shared by the menu builder and the enquiry form. Not stored. */
let selected: string[] = [];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const menuSelection = {
  toggle(dish: string) {
    selected = selected.includes(dish) ? selected.filter((d) => d !== dish) : [...selected, dish];
    emit();
  },
  clear() {
    selected = [];
    emit();
  },
  use() {
    return useSyncExternalStore(
      (l) => { listeners.add(l); return () => listeners.delete(l); },
      () => selected,
      () => selected,
    );
  },
};
