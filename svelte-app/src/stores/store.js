// store.js
import { writable } from 'svelte/store';

// Define a writable store with an initial value
export let cartItemsCount = writable(0);
export let is_cart_visible = writable('');
export let cartItems = writable([]);
export let cartItemsTotal = writable(0);
export let alerts = writable([]);