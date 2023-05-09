<script lang="ts">
  import type { Item, EditableItem } from "../types";
  import { editStatus, editableItem, items } from "./store";

  export let index: number;
  let nameSpan: HTMLSpanElement;
  let quantitySpan: HTMLSpanElement;

  const handleEditItem = () => {
    if (nameSpan && quantitySpan) {
      editableItem.set({
        index,
        name: nameSpan.innerText,
        quantity: Number.parseInt(quantitySpan.innerText)
      });
      editStatus.set('preparing');
    }
  };

  const handleDeleteItem = () => {
    if (nameSpan && quantitySpan) {
      items.update((items) => items.filter(item => item.name !== nameSpan.innerText));
    }
  }
</script>

<div
  class="flex items-center max-w-full p-2 bg-orange-300 rounded-lg drop-shadow-lg border-2 border-gray-50"
>
    {#if $$slots.name && $$slots.quantity}
      <span bind:this={nameSpan}>
          <slot name="name" />
      </span>
      <span bind:this={quantitySpan}>
          <slot name="quantity" />
      </span>
      <div class="ml-auto">
          <button
              class="transition-all hover:scale-105 hover:opacity-100 opacity-50 text-white rounded-md px-2 py-0.5 bg-green-600"
              on:click="{handleEditItem}"
          >Edit</button
          >
          <button
          on:click="{handleDeleteItem}"
          class="transition-all hover:scale-105 hover:opacity-100 opacity-50 text-white rounded-md px-2 py-0.5 bg-red-600"
          >Delete</button
          >
      </div>
    {/if}
</div>
