
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

    function delete_item(index) {
        if (index >= 0 && index < currentCart.length) {
            $cartItemsTotal -= currentCart[index]['price'];
            currentCart.splice(index, 1);
            $cartItemsCount -= 1;
            $cartItems = currentCart;
            console.log(`Item at index ${index} deleted. Updated cartItems:`, $cartItems);
        } else {
            console.error(`Invalid index ${index}. Item not deleted.`);
        }
    }
    
</script>
  
  

<style>
.items-container::-webkit-scrollbar {
    width: 0.5rem;
}

.items-container::-webkit-scrollbar-thumb {
    background-color: #3498db;
    border-radius: 6px;
}

.items-container::-webkit-scrollbar-track {
    /* background-color: #f1f1f1; */
}

/* Firefox */
.items-container {
    scrollbar-width: thin;
    scrollbar-color: #3498db #f1f1f1;
}

/* Microsoft Edge and Internet Explorer */
.items-container {
    -ms-overflow-style: none;
}

.items-container::-ms-scrollbar-thumb {
    background-color: #3498db;
    border-radius: 6px;
}

.items-container::-ms-scrollbar-track {
    background-color: #f1f1f1;
}

.container {
    visibility: hidden;
    position: fixed;
    background-color: #ffffff;
    box-shadow: 0px 0px 100px 20px rgba(0, 0, 0, 0.581);
    width: 40%;
    min-height: 90%;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    border-radius: 16px;
    display: flex;
    top: calc((100vh - 90%) / 2);
    left: calc((100vw - 40%) / 2);
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
}

.close-button{
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

.close-button:hover{
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
    max-height: 50vh;
    min-height: 50vh;
    overflow-y: scroll;
    width: 80%;
    padding-left: 2rem;
    padding-right: 2rem;
}

.item{
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border: 1px #2b6fd4 solid;
    border-radius: 8px;
    /* box-shadow: 0px 0px 10px 3px #2b6fd47d; */
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

.delete-button{
    position: relative;
    color: #2b6fd4;
    border: 0;
    background-color: transparent;
    margin: 0;
    padding: 0;
    cursor: pointer;
}

.delete-button:hover{
    color: #1c498c;
    
}

</style>

<div class='darker {is_visible}'></div> 

<div class="container {is_visible}" id='cart_container'>
    <button class='close-button' on:click={close_cart} style='visibility: {is_visible}'>&#10006</button>
    <div class='header-container'>
        <h1>Корзина</h1>
        {#if currentValue > 0}
            <div class="cart-bubble">{currentValue}</div>
        {/if}
    </div>
    
    {#if $cartItems.length > 0}
        <div class="items-container">
        {#each $cartItems as { imageSrc, text, price }, index}
            <div class="item">
                <img src={imageSrc}>
                <p>{text} - {price}₽</p>
                <button class='delete-button' on:click={() => delete_item(index)}>Удалить</button>
            </div>
        {/each}
        </div>
        <div class='total-container'>
        <h1 class='total'>Итого: {$cartItemsTotal}₽</h1>
        </div>    
    {:else}
        <p>Корзина пуста.</p>
    {/if}
    

</div>