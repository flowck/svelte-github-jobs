<script></script>

<style>
.card-placeholder {
  width: 100%;
}

.card-placeholder:not(:last-child) {
  margin-bottom: 30px;
}

.card-placeholder__row {
  width: inherit;
  height: 10px;
  background-color: #EEE;
  animation: isLoading infinite .7s;
}

.card-placeholder__row:not(:last-child) {
  margin-bottom: 10px;
}

@keyframes isLoading {
  from {
    background-color: transparent;
  }
  to {
    background-color: #EEE;
  }
}
</style>

<div class="card-placeholder">
  {#each [0, 1, 2] as row}
  <div class="card-placeholder__row"></div>
  {/each}
</div>