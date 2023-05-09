<script lang="ts">
  import "./app.css";
  import ItemCard from "./lib/ItemCard.svelte";
  import NewItemForm from "./lib/NewItemForm.svelte";
  import { items } from "./lib/store";
  import type { Item } from "./types";

  $: total = $items.reduce(
    (initalTotal, item) => initalTotal + item.quantity,
    0
  );
</script>

<main class="flex justify-center bg-yellow-500 w-screen min-h-screen pt-4">
  <div>
    <h1 class="font-bold text-xl underline">My First Svelte App</h1>
    <p class="font-sm text-lg">
      We're using Svelte to create and manage an inventory.
    </p>
    <NewItemForm />
    <div class="mt-4 bg-white max-w-[500px] rounded-md p-2 drop-shadow-md">
      <div class="flex items-center">
        <h3 class="font-semibold text-lg">Current Inventory</h3>
        <span class="ml-auto">Total: {total}</span>
      </div>
      <hr class="my-2" />
      {#if $items.length > 0}
        <div class="flex flex-col w-full py-1 gap-2 max-h-[500px] overflow-y-auto scroll-smooth">
          {#each $items as item, index (item)}
            <ItemCard index={index}>
              <span class="font-semibold truncate max-w-[50%]" slot="name">{item.name}</span>
              <span slot="quantity" class="ml-1.5 rounded-lg px-2 bg-indigo-500/50 text-white">{item.quantity}</span>
            </ItemCard>
          {/each}
        </div>
      {:else}
        <p class="text-red-500">Inventory is currently empty. Please add items!</p>
      {/if}
    </div>
  </div>
</main>
