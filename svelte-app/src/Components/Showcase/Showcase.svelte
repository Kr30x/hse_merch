<!-- Showcase.svelte -->
<script>
    import Card from '../Card/Card.svelte';
    import { cartItemsCount } from '../../stores/store.js';
    import { cartItems } from '../../stores/store.js';
    import { cartItemsTotal } from '../../stores/store.js';

    // Example cards data
    const cards = [
      { imageSrc: 'https://placehold.co/600x600', text: 'Футболка "Промыслов"', price: 1200 },
      { imageSrc: 'https://placehold.co/600x600', text: 'Футболка Авдеев', price: 1200 },
      { imageSrc: 'https://placehold.co/600x600', text: 'Кепка Вялый', price: 900 },
    ];

    function handleAddToCart(event) {
      $cartItemsCount += 1;
      $cartItems.push(event.detail);
      $cartItems = $cartItems;
      $cartItemsTotal += event.detail['price'];
      // console.log($cartItems.length);
      // console.log($cartItemsTotal);
      console.log($cartItems);
      
    }
</script>
  
<style>
  .showcase {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 1rem;
  }
</style>

<div class="showcase">
  {#each cards as { imageSrc, text, price }}
    <Card {imageSrc} {text} {price} on:add-to-cart={handleAddToCart} />
  {/each}
</div>