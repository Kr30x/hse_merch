<script>
    export let text = 'Test text';
    export let type = 'good'; // good or bad
    export let duration = 1500; 

    let alert;
    let is_visible;
    let visible_flag = true;


    function closeAlert(){
        is_visible = 'hidden';
    }

    setTimeout(() => {
        is_visible = 'hidden';
    }, duration);
</script>

<style>
    .card.visible{
        visibility: visible;
        animation: fadeIn 0.3s ease-in-out forwards;
    }

    .card.hidden{
        visibility: visible;
        animation: fadeOut 0.3s ease-in-out forwards;
        
    }

    .card {
        visibility: visible;
        display: flex;
        color: whitesmoke;
        z-index: 100;
        border-radius: 16px;
        width: 250px;
        height: 50px;
        box-shadow: 0px 0px 10px 5px rgb(213, 213, 213);
        transition: all 0.5s ease;
        background-color: rgba(57, 228, 57, 0.9);
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-bottom: 30px;
    }
  
  
    .text {
      padding: 1rem;
      text-align: center;
      font-weight: 700;
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
            display: none;
        }
    }
  
  </style>


<div bind:this={alert} class="card {is_visible}" id='alert' on:click={closeAlert} >
    <div class="text">{text}</div>
</div>
    