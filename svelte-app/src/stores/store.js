// store.js
import { writable } from 'svelte/store';

// Define a writable store with an initial value
export let cartItems = writable(0);
export let is_cart_visible = writable('');