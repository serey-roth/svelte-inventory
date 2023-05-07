<script lang="ts">
  import "./app.css";
  import NewItemForm from "./lib/NewItemForm.svelte";
  import type { Item } from "./types";

  let items: Item[] = [
    {
      name: "Gloves",
      quantity: 1,
    },
  ];

  $: total = items.reduce((initalTotal, item) => initalTotal + item.quantity, 0);

  const addNewItem = (newItem: Item) => {
    const index = items.findIndex(item => item.name === newItem.name);
    if (index === -1) {
      items = [...items, newItem];
    } else {
      items[index].quantity += newItem.quantity;
      items = items;
    }
  }
</script>

<main class="flex justify-center bg-yellow-500 w-screen min-h-screen pt-4">
  <div>
    <h1 class="font-bold text-xl underline">My First Svelte App</h1>
    <p class="font-sm text-lg">
      We're using Svelte to create and manage an inventory.
    </p>
    <NewItemForm onAdd={addNewItem}/>
    <div class="mt-4 bg-white max-w-[500px] rounded-md p-2 drop-shadow-md">
      <h3 class="font-semibold text-lg underline">Current Inventory</h3>
      <ul class="list-disc">
        {#each items as item (item.name)}
          <li class="ml-4">
            <span class="flex items-center">
              <span class="truncate max-w-full">{item.name}</span>
              <span class="ml-auto">X {item.quantity}</span>
            </span>
          </li>
        {/each}
      </ul>
      <hr class="mt-2">
      <div class="flex items-center">
        Total
        <span class="ml-auto">{total}</span>
      </div>
    </div>
  </div>
</main>
