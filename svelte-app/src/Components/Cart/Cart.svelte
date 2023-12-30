
<script>
    import { is_cart_visible } from '../../stores/store.js';
    $: is_visible = $is_cart_visible;
    
    function close_cart() {
        $is_cart_visible = 'hidden';
        console.log($is_cart_visible);
    }

</script>
  
  

<style>
.container {
    visibility: hidden;
    position: fixed;
    top: calc((100vh - 40%) / 2);
    left: calc((100vw - 40%) / 2);
    background-color: #ffffff;
    box-shadow: 0px 0px 100px 20px rgba(0, 0, 0, 0.581);
    width: 40%;
    height: 40%;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    border-radius: 16px;
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

</style>

<div class='darker {is_visible}'></div> 

<div class="container {is_visible}" id='cart_container'>
    <button on:click={close_cart} style='visibility: {is_visible}'>&#10006</button>

</div>