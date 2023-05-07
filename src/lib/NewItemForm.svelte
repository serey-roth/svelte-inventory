<script lang="ts">
  import type { Item } from "../types";

  let name: string;
  let quantity: number = 1;

  export let onAdd: (item: Item) => void;
  
  const handleAddItem = () => {
    onAdd({ name, quantity });
  };

</script>

<form on:submit|preventDefault={handleAddItem}>
  <div class="flex flex-col mb-2">
    <label for="name">Name</label>
    <input bind:value={name} type="text" name="name" id="name"/>
  </div>
  <div class="flex flex-col mb-2">
    <label for="quantity">Quantity</label>
    <input bind:value={quantity} type="number" name="quantity" id="quantity" min={1} max={50}/>
  </div>
  <button class="mt-2 bg-gray-50 py-1 px-2 rounded-md" type="submit">Add Item</button>
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