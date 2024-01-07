<!-- components/AlertBar.svelte -->
<script>
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';

    // Import the alerts store
    import { alerts } from '../../stores/store.js';
  
    let alertList = [];
  
    // Subscribe to the alerts store
    const unsubscribe = alerts.subscribe(value => {
      alertList = value;
    });
  
    // Unsubscribe from the store on component destruction
    onMount(() => {
      return () => {
        unsubscribe();
      };
    });
</script>
  
{#if alertList.length > 0}
<div class="container">
    {#each alertList as { id, bg_color, message }}
    <div transition:fly="{{y: -200}}" class="card" style = 'background-color: {bg_color} !important' key={id}>
        <div class='text'>{message}</div>
    </div>
    {/each}
</div>
{/if}
  
<style>

.container{
    position: fixed;    
    z-index: 99; 
    left: calc((100vw - 250px) / 2);
    top: 50px;
    width: 250px;
    
}

.card {
    visibility: visible;
    display: flex;
    color: whitesmoke;
    z-index: 100;
    border-radius: 16px;
    width: 250px;
    height: 50px;
    /* box-shadow: 0px 0px 10px 5px rgb(213, 213, 213); */
    transition: all 0.5s ease;
    background-color: #2b6fd4;
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
</style>