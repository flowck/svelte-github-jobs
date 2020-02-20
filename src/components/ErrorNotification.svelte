<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let message;
</script>

<style>
.error-notification {
  top: 0;
  left: 0;
  width: 100%;
  color: #FFF;
  padding: 15px 0;
  position: fixed;
  font-size: 14px;
  background-color: #FA3E3E;
}

.error-notification .wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.error-notification__close-button {
  cursor: pointer;
}
</style>

<div class="error-notification">
  <div class="wrap">
    <div class="error-notification__message">
      { message }
    </div>

    <div class="error-notification__close-button" title="Close">
      <div on:click={ () => dispatch("close") }>
        <img width="15" height="15" src="/img/close.svg" alt="Close">
      </div>
    </div>
  </div>
</div>