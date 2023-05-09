<script lang="ts">
  import App from "../App.svelte";
  import type { Item } from "../types";
  import { items, editStatus } from "./store";
  import { editableItem } from "./store";

  let name: string;
  let quantity: number = 1;

  $: {
    if ($editableItem && $editStatus === 'preparing') {
      name = $editableItem.name;
      quantity = $editableItem.quantity;
      editStatus.set('editing')
    }
  }

  const handleAddItem = () => {
    items.update((items) => {
      const index = items.findIndex(item => item.name === name);
      if (index !== -1) {
        items[index].quantity += quantity;
        return items;
      } else {
        return [...items, { name, quantity }];
      }
    });
    name = "";
    quantity = 1;
  }

  const handleEditItem = () => {
    items.update((items) => {
      if ($editableItem === undefined) return items;
      items[$editableItem.index].name = name;
      items[$editableItem.index].quantity = quantity;
      return items;
    });
    editableItem.set(undefined);
    editStatus.set('done');
    name = "";
    quantity = 1;
  }

</script>

<form on:submit|preventDefault={$editStatus === 'editing' && $editableItem ? handleEditItem : handleAddItem}>
  <div class="flex flex-col mb-2">
    <label for="name">Name</label>
    <input bind:value={name} type="text" name="name" id="name" />
  </div>
  <div class="flex flex-col mb-2">
    <label for="quantity">Quantity</label>
    <input bind:value={quantity} type="number" name="quantity" id="quantity" min={1} max={50}/>
  </div>
  <button class="mt-2 bg-gray-50 py-1 px-2 rounded-md" type="submit">{$editStatus === 'editing' ? 'Edit Item' : 'Add Item'}</button>
</form>

<style lang="postcss">
  form {
    max-width: 500px;
  }

  input {
    padding: 0.25em 0.5em;
    border-radius: 0.375em;
  }
</style>