<script>
	import Filters from "./components/Filters.svelte";
	import Job from "./components/Job.svelte";
	import Footer from "./components/Footer.svelte";
	import Header from "./components/Header.svelte";
	import CardPlaceholder from "./components/CardPlaceholder.svelte";
	import ErrorNotification from "./components/ErrorNotification.svelte";
	import { onMount } from "svelte";
	import { getJobs } from "./actions.js";

	let jobs = []; 
	let page = 1;
	let description = null;
	let location = null;
	let fullTime = null;
	let isLoading = false;
	let errorMessage = "";

	/**
	 * searchHandler
	*/
	async function searchHandler({ detail }) {
		try {
			// Store search parameters in the app state
			description = detail.description;
			location = detail.location;

			const requestJobs = await getJobs(page, description, location, fullTime);
			jobs = requestJobs;
		} catch (error) {
			errorMessage = "Sorry, unfortunately we couldn't search jobs."
		}
	};

	/**
	 * getMoreJobs
	*/
	async function getMoreJobs() {
		try {
			page += 1;
			const requestJobs = await getJobs(page, description, location);
			const tmp = jobs.concat(requestJobs);
			jobs = tmp;
		} catch (error) {
			errorMessage = "Sorry, unfortunately we couldn't get more jobs. Please try again."
		}
	};

	function closeErrorNotification() {
		errorMessage = "";
	}

	// On mount
	onMount(async () => {
		isLoading = true;
		try {
			// window.setTimeout(async () => {
			const requestJobs = await getJobs();
			jobs = requestJobs;
			isLoading = false;
			// }, 500);
		} catch (error) {
			console.log(error);
			isLoading = false;
			errorMessage = "Sorry, unfortunately load jobs from Github API, please try to refresh the page."
		}
	});
</script>

<main>

	{#if errorMessage.length > 0}
		<ErrorNotification message={ errorMessage } on:close={ () => closeErrorNotification() } />
	{/if}

	<div class="content-wrap">
		<Header></Header>

		<section class="filters">
			<div class="wrap">
				<Filters on:search={searchHandler} />
			</div>
		</section>

		<section class="jobs-section wrap">

			{#if isLoading === true}
				<div class="card-placeholders">
					{#each [0, 1, 2, 3, 4, 5, 6] as card}
						<CardPlaceholder />
					{/each}
				</div>
			{:else}
				<div class="jobs">
					{#each jobs as job}
						<Job
							title={job.title}
							date={job.created_at}
							location={job.location}
							company={job.company}
							type={job.type}
							url={job.url}
						/>
					{/each}
				</div>

				<div class="more-jobs">
					<button
						class="more-jobs__button"
						on:click={ () => getMoreJobs() }
					>
						More Awesome Jobs
					</button>
				</div>
			{/if}
			
		</section>
	</div>

	<Footer></Footer>
</main>

<style>
:global(*),
:global(body){
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:global(body) {
	background-color: #fafafa;
}

:global(.is-flex) {
	display: flex;
}

main {
	position: relative;
	min-height: 100vh;
}

.content-wrap {
	padding-bottom: 80px;
}

:global(.wrap) {
	width: 900px;
	margin: 0 auto;
}

@media screen and (max-width: 1024px) {
	:global(.wrap) {
		width: 90%;
	}	
}

.jobs-section {
	padding: 20px;
	margin-top: 10px;
	background-color: #FFF;
	border: 4px solid rgba(0, 0, 0, .1);
}

.more-jobs {
	margin-top: 20px;
}

.more-jobs__button {
	width: 100%;
	border: none;
	color: #FFF;
	height: 30px;
	padding: 0 20px;
	font-size: 12px;
	cursor: pointer;
	font-weight: bold;
	border-radius: 3px;
	text-shadow: -1px -1px 0 #2371a3;
	background: -webkit-gradient(linear, left top, left bottom, from(#46a9e7), to(#1e81bf));
}

.more-jobs__button:hover {
	background: -webkit-gradient(linear, left top, left bottom, from(#2b91e2), to(#125db3));
}

@media screen and (max-width: 900px) {
	.wrap {
		width: 90%;
	}
}
</style>