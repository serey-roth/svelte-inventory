import { writable } from "svelte/store";
import { type EditableItem, type Item } from "../types";

const initialItems: Item[] = [{
    name: 'Gloves', 
    quantity: 1,
}];

export const items = writable(initialItems);

export const editStatus = writable<'idle' | 'preparing' | 'editing' | 'done'>('idle');
export const editableItem = writable<EditableItem | undefined>(undefined);