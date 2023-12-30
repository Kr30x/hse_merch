<!-- CustomNavbar.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
    import { cartItems } from '../../stores/store.js';    
    import { is_cart_visible } from '../../stores/store.js';

    export let bg_color = 'white';
    export let links = [];

    $: currentValue = $cartItems;

    function handleCartClick() {
        $is_cart_visible = 'visible';
        console.log($is_cart_visible);
    }

</script>
  
  

<style>
/* Use the bg_color prop for the background color */
nav {
    background-color: bg_color;
    padding: 1.7rem;
    display: block;
    position: fixed;
    width: 100vw;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
}

li {
    margin-right: 1rem;
}

a {
    color: #767676;
    text-decoration: none;
    transition: all 0.5s ease;
    font-size: 15px;
    padding: 15px;
}

a:hover{
    color: #000000;
}

.cart-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.cart-bubble {
    display: flex;
    background-color: #2b6fd4;
    color: white;
    border-radius: 50%;
    padding: 4px;
    font-size: 12px;
    font-weight: 600;
    min-width: 1rem;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }

.cart-block{
    display: flex;
    position: absolute;
    top: 1.7rem;
    right: 5rem;
    position: fixed;
}  

img {
    height: 100%;
    margin-right: 0.5rem;
}

</style>

<nav style="background-color: {bg_color}">
    <ul>
        {#each links as { text, href }}
        <li><a href={href}>{text}</a></li>
        {/each}
    </ul>
</nav>
<button on:click={handleCartClick}>
    <div class="cart-block">
        <img src="./shopping-cart.png" alt="Cart Image" class='cart-icon'/>
        {#if currentValue > 0}
            <div class="cart-bubble">{currentValue}</div>
        {/if}
    </div>
</button>
