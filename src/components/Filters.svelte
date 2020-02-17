<script>
  import { createEventDispatcher } from "svelte";

  let form = {
    description: "",
    location: "",
    fullTimeOnly: false
  }

  const dispatch = createEventDispatcher();
</script>

<style>
  /* Forms */
  .form {
    display: flex;
  }

  .fields {
    width: 70%;
    display: grid;
    grid-template-columns: 49% 49%;
    justify-content: space-between;
  }

  .label {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 3px;
  }

  .input {
    width: 100%;
    height: 32px;
    font-size: 12px;
    border: 2px solid rgba(0, 0, 0, .1);
  }

  .button {
    width: 80px;
    height: 31px;
    border: none;
    color: #FFF;
    font-size: 12px;
    cursor: pointer;
    font-weight: bold;
    border-radius: 3px;
    margin-top: 18px;
    background: -webkit-gradient(linear, left top, left bottom, from(#a2b8c5), to(#869ca9));
  }

  .field--radio {
    padding-top: 27px;
    margin: 0 30px;
  }
</style>

<div class="form">
  <div class="fields">
    <div class="field">
      <label class="label">Job Description</label>
      <input
        type="text"
        class="input"
        placeholder="Filter by title, benefits, companies, expertise"
        on:input={event => form.description = event.target.value }
      >
    </div>
    <div class="field">
      <label class="label">Location</label>
      <input
        type="text"
        class="input"
        placeholder="Filter by city, state, zip code or country"
        on:input={event => form.location = event.target.value }
      >
    </div>
  </div>
  <div class="field field--radio is-flex">
    <input type="checkbox">
    &nbsp;&nbsp;
    <label class="label">Full Time Only</label>
  </div>
  <div class="field">
    <button
      on:click={ () => dispatch("search", form) } class="button"
    >
      Search
    </button>
  </div>
</div>