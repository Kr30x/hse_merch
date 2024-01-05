<script>
    import Alert from '../AlertBar/Alert.svelte';  
    import { alerts } from '../../stores/store.js';

    export function NewAlert(text, type){
        $alerts.push({text, type});
        $alerts = $alerts;
    }
</script>


<style>

.container{
    position: fixed;    
    z-index: 99; 
    left: calc((100vw - 250px) / 2);
    top: 50px;
    width: 250px;
    
}

</style>

<div class='container'>
    {#each $alerts as { text, type }}
        <Alert {text} {type} />
    {/each}
</div>
    