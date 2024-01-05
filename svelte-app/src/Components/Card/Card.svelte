<!-- Card.svelte -->
<script>
    export let imageSrc = '';
    export let text = '';
    export let price = 0;
    export let invis = 'visible';
    

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function addToCart() {
      dispatch('add-to-cart', { imageSrc, text, price });
    }
</script>
  
<style>
  .card {
    border-radius: 24px;
    overflow: hidden;
    margin: 1rem;
    width: 30%;
    box-shadow: 0px 0px 10px 5px rgb(213, 213, 213);
    transition: all 0.5s ease;
  }

  img {
    width: 100%;
    height: auto;
  }

  .text {
    padding: 1rem;
    text-align: center;
    font-weight: 700;
  }

  button{
      width: calc(100% - 30px);
      height: 3rem;
      border: 0;
      background-color: #2b6fd4;
      margin: 15px;
      color: white;
      transition: all 0.5s ease;
      border-radius: 16px;
      cursor: pointer;
  }

  button:hover{
      background-color: #184487;
  }

</style>

<div class="card" style="visibility: {invis};">
  <img src={imageSrc} alt="Card Image" />
  <div class="text">{text}</div>
  <div class="text">{price + '₽'}</div>
  <button on:click={addToCart} class="button">В корзину</button>
</div>
  