
<script>

    import { is_cart_visible } from '../../stores/store.js';
    import { cartItemsCount } from '../../stores/store.js'; 
    import { cartItems } from '../../stores/store.js';
    import { cartItemsTotal } from '../../stores/store.js';
    import { addNewAlert } from '../../utils/alertUtils.js';

    $: is_visible = $is_cart_visible;
    $: currentValue = $cartItemsCount;
    $: currentCart = $cartItems;


    let cart_container;
    let close_button;
    let order_button;
    let total_text;
    let placing_order = false;

    let customer_name;
    let customer_email;
    let customer_phone;
    let customer_adress;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function close_cart() {
        $is_cart_visible = 'hidden';
    }

    function delete_item(index) {
        if (index >= 0 && index < currentCart.length) {
            $cartItemsTotal -= currentCart[index]['price'];
            currentCart.splice(index, 1);
            $cartItemsCount -= 1;
            $cartItems = currentCart;
            addNewAlert('Товар удален из корзины', '#c72b1aff')
        } else {
            console.error(`Invalid index ${index}. Item not deleted.`);
        }
    }
    
    const change_cart_container_LeftProperty = () => {
        if (cart_container) {
            cart_container.style.left = '7%';
        }
    };

    const restore_cart_container_LeftProperty = () => {
        if (cart_container) {
            cart_container.style.left = 'calc((100vw - 40%) / 2)';
        }
    };


    const hide_order_button = () => {
        if (order_button) {
            order_button.style.visibility = 'hidden';
        }
    };

    const show_order_button = () => {
        if (order_button) {
            order_button.style.visibility = 'visible';
        }
    };

    const hide_close_button = () => {
        if (close_button) {
            close_button.style.visibility = 'hidden';
        }
    };

    const show_close_button = () => {
        if (close_button) {
            close_button.style.visibility = 'visible';
        }
    };

    const change_total_text = () => {
        if (total_text) {
            total_text.style.marginTop = '4rem';
        }
    };

    const restore_total_text = () => {
        if (total_text) {
            total_text.style.marginTop = '2rem';
        }
    };

    async function place_order(){
        change_cart_container_LeftProperty();
        hide_order_button();
        hide_close_button();
        change_total_text();

        await sleep(200);
        placing_order = 'visible';
    }
    
    async function cancel_order(){
        placing_order = 'hidden';
        await sleep(200);

        restore_cart_container_LeftProperty();
        show_order_button();
        show_close_button();
        restore_total_text();
    }

    function handleSubmit() {
        console.log('Name:', customer_name);
        console.log('Email:', customer_email);
        console.log('Phone:', customer_phone);
        console.log('Adress:', customer_adress);
        close_cart();
        cancel_order();
        $cartItems = [];
        $cartItemsCount = 0;
        $cartItemsTotal = 0;
        addNewAlert('Заказ создан!');
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
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, all 0.3s ease-in-out;
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
    border: 2px #2b6fd4 solid;
    border-radius: 8px;
    font-weight: 700;
    /* box-shadow: 0px 0px 10px 3px #2b6fd47d; */
}

.item p{
    margin-left: 2rem; 
}

img{
    width: 7rem;
    height: 7rem;

}


.total-container{
    width: 100%;
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10%;
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

.order-button{
    background-color: #2b6fd4;
    color: white;
    border-radius: 16px;
    border: none;
    transition: color 0.5s ease;
    cursor:pointer;
    padding-left: 3rem;
    padding-right: 3rem;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    font-size: 1.5rem;
    transition: background-color 0.3s ease-in-out;
}

.order-button:hover{
    background-color: #1c498c;
}


.info-container{
    left: auto;
    right: 7%;
}


input{
    font-size: 1.5rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    transition: all 0.3s ease-in-out;
}

input:hover{
    border-color: #2b6fd4;
    box-shadow: 0 0 5px #2b6fd4b1;
}

input:focus {
  outline: none;
  border-color: #2b6fd4;
  box-shadow: 0 0 5px #2b6fd4b1;
  /* You can add additional styles for focus state if needed */
}



.finish-button{
    background-color: #2b6fd4;
    color: white;
    border-radius: 16px;
    border: none;
    transition: color 0.5s ease;
    cursor:pointer;
    padding-left: 3rem;
    padding-right: 3rem;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    font-size: 1.5rem;
    position: absolute;
    bottom: 2rem;
    transition: all 0.3s ease-in-out;
    width: 40%;
}

.finish-button:hover{
    background-color: #1c498c;
}

form{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

label{
    font-size: 1.5rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
}


.data-container{
    padding-left: 10%;
    padding-right: 10%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

</style>

<div class='darker {is_visible}'></div> 

<div bind:this={cart_container} class="container {is_visible}" id='cart_container'>
    <button bind:this={close_button} class='close-button' on:click={close_cart} style='visibility: {is_visible}'>&#10006</button>
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
        <h1 bind:this={total_text} class='total'>Итого: {$cartItemsTotal}₽</h1>
        </div>
        <button bind:this={order_button} class = 'order-button' on:click={place_order}>Перейти к оформлению</button>
    {:else}
        <p>Корзина пуста.</p>
    {/if}

</div>

<div class="container {placing_order} info-container">
    <button class='close-button' on:click={cancel_order} style='visibility: {placing_order}'>&#10006</button>
    <div class='header-container'>
        <h1>Информация о заказчике</h1>
    </div>
    <form on:submit|preventDefault={handleSubmit}>
        <div class='data-container'>
            <label for="name">Имя:</label>
            <input type="text" id="name" bind:value={customer_name} />

            <label for="email">Почта:</label>
            <input type="email" id="email" bind:value={customer_email} />

            <label for="phone">Телефон:</label>
            <input type="text" id="phone" bind:value={customer_phone} />

            <label for="adress">Адрес доставки:</label>
            <input type="text" id="adress" bind:value={customer_adress} />
        </div>
        <button type="submit" class="finish-button">Заказать</button>
    </form>
</div>