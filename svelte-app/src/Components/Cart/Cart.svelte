
<script>
    import { is_cart_visible } from '../../stores/store.js';
    import { cartItemsCount } from '../../stores/store.js'; 
    import { cartItems } from '../../stores/store.js';
    import { cartItemsTotal } from '../../stores/store.js';

    $: is_visible = $is_cart_visible;
    $: currentValue = $cartItemsCount;
    $: currentCart = $cartItems;

    function close_cart() {
        $is_cart_visible = 'hidden';
    }

    
</script>
  
  

<style>
.container {
    visibility: hidden;
    position: absolute;
    top: calc((100vh - 40%) / 2);
    left: calc((100vw - 40%) / 2);
    background-color: #ffffff;
    box-shadow: 0px 0px 100px 20px rgba(0, 0, 0, 0.581);
    width: 40%;
    min-height: 40%;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    border-radius: 16px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
}

button{
    position: absolute;
    top: 0px;
    right: 0px;
    width: 30px;
    height: 30px;
    border: 0;
    margin: 15px;
    color: #767676;
    cursor: pointer;
    background-color: transparent !important;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transform-origin: top left;
    transition: all 0.3s ease;
  }

button:hover{
    color: #000000;
}

.container.hidden{
    visibility: visible;
    transform: scale(0);
    animation: popoutAnimation 0.3s ease-in-out forwards;
    z-index: -1;
}

.container.visible{
    visibility: visible;
    animation: popupAnimation 0.3s ease-in-out forwards;
    z-index: 2;
}

.darker.hidden{
    visibility: visible;
    animation: fadeOut 0.3s ease-in-out forwards;
    
}

.darker.visible{
    visibility: visible;
    animation: fadeIn 0.3s ease-in-out forwards;
    
}

@keyframes popupAnimation {
    from {
        transform: scale(0.5);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes popoutAnimation {
    0% {
        transform: scale(1);
        opacity: 1;
        z-index: 2;
    }
    99% {
        transform: scale(0.5);
        opacity: 0;
        z-index: 2;
    }
    100%{
        z-index: -1;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        z-index: 1;
    }
    to {
        opacity: 1;
        z-index: 1;
    }
}

@keyframes fadeOut {
    0% {
        opacity: 1;
        z-index: 1;
    }
    99%{
        opacity: 0;
        z-index: 1;
    }
    100% {
        z-index: -1;
    }
}

.darker{
    visibility: hidden;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0px;
    left: 0px;
    background-color: #00000077;
}


.cart-bubble {
    display: flex;
    background-color: #2b6fd4;
    color: white;
    border-radius: 50%;
    padding: 8px;
    font-size: 12px;
    font-weight: 600;
    min-width: 1rem;
    justify-content: center;
    align-items: center;
    width: 1rem;
    height: 1rem;
    margin-left: 1rem;
}

.header-container{
    width: 100%;
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10%;
    margin-bottom: 2rem;
}

.items-container{
    display: flex;
    flex-direction: column;
}

.item{
    margin-bottom: 10px;
    display: flex;
    align-items: center;
}

.item p{
    margin-left: 2rem; 
}

img{
    width: 7rem;
    height: 7rem;

}

.total{
}

.total-container{
    width: 100%;
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10%;
    margin-bottom: 2rem;
}

</style>

<div class='darker {is_visible}'></div> 

<div class="container {is_visible}" id='cart_container'>
    <button on:click={close_cart} style='visibility: {is_visible}'>&#10006</button>
    <div class='header-container'>
        <h1>Корзина</h1>
        {#if currentValue > 0}
            <div class="cart-bubble">{currentValue}</div>
        {/if}
    </div>
    
    {#if $cartItems.length > 0}
        <div class="items-container">
        {#each $cartItems as { imageSrc, text, price }}
            <div class="item">
                <img src={imageSrc}>
                <p>{text} - {price}₽</p>
            </div>
        {/each}
        </div>
        <div class='total-container'>
        <h1 class='total'>Итого: {$cartItemsTotal}₽</h1>
        </div>    
    {:else}
        <div class="items-container">
            <p>Корзина пуста.</p>
        </div>
    {/if}
    

</div>