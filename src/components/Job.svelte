<script>
  export let url;
  export let title;
  export let company;
  export let type;
  export let location;
  export let date;
</script>

<style>
.job {
  color: initial;
  padding: 10px 0;
  display: block;
  border-top: 1px solid rgba(0, 0, 0, .1);
  text-decoration: none;
}

.job:hover {
  background-color: #eee;
}

.job article {
	display: grid;
	grid-template-columns: 75% 25%
}

.job__title {
  font-size: 14px;
  color: #2B7FC3;
  margin-bottom: 3px;
}

.job__meta {
  color: #999;
  font-size: 12px;
}

.job__type {
	color: #1d9a00;
	font-weight: bold;
}

.job__location {
  color:#666;
  margin-bottom: 3px;
}

.job__location,
.job__date {
  display: block;
}
</style>

<a href={ url } target="_blank" class="job">
  <article>
    <div>
      <h1 class="job__title">{ title }</h1>
      <div class="job__meta">
        <span class="job__company">{ company }</span>
        <span>–</span>
        <span class="job__type">{ type }</span>
      </div>
    </div>
    <div class="job__meta">
      <span class="job__location">{ location }</span>
      <span class="job__date">{ date }</span>
    </div>
  </article>
</a>