<script>
	import Filters from "./components/Filters.svelte";
	import Job from "./components/Job.svelte";
	import Footer from "./components/Footer.svelte";
	import { onMount } from "svelte";
	// import moment from "moment";
	import axios from "axios";
	let jobs = []; 
	let page = 1;
	let description = null;
	let location = null;
	let fullTime = null;

	function getJobs(page = 1, description, location) {
		return new Promise(async (resolve, reject) => {
			try {
				
				let BASE_URL = "https://svelte-github-jobs.now.sh";
				if (window.location.hostname === "localhost") {
					BASE_URL = "http://localhost:5001/jobs";
				}
				const query = description || location || fullTime
					? `?page=${page}&description=${description}&location=${location}&full_time=${fullTime}`
					: `?page=${page}`;

				const response = await axios.get(`${BASE_URL}${query}`);
				resolve(response.data.jobs);
			} catch(error) {
				reject(error);
			}
		});
	}

	async function searchHandler({ detail }) {
		try {

			// Store search parameters in the app state
			description = detail.description;
			location = detail.location;

			const requestJobs = await getJobs(page, description, location);
			jobs = requestJobs;
		} catch (error) {
			console.log(error);
		}
	};

	async function getMoreJobs() {
		try {
			page += 1;
			console.log("EX");
			const requestJobs = await getJobs(page, description, location);
			const tmp = jobs.concat(requestJobs);
			jobs = tmp;
		} catch (error) {
			console.log(error);
		}
	};

	// On mount
	onMount(async () => {
		try {
			window.setTimeout(async () => {
				const requestJobs = await getJobs();
				jobs = requestJobs;
			}, 1000);
		} catch (error) {
			console.log(error);
		}
	});
</script>

<main>
	<div class="content-wrap">
		<header class="header">
			<div class="wrap">
				<h1 class="header__title">
					<b>Github</b> Jobs
				</h1>
			</div>
		</header>

		<section class="filters">
			<div class="wrap">
				<Filters on:search={searchHandler} />
			</div>
		</section>

		<section class="jobs-section wrap">
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
			
			<div class="more-jobs">
				<button
					class="more-jobs__button"
					on:click={ () => getMoreJobs() }
				>
					More Awesome Jobs
				</button>
			</div>

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

.header {
	height: 50px;
	color: #FFF;
	margin-bottom: 25px;
	background-color: #2B7FC3;
	border-top: 4px solid #1D5C8F;
}

.header__title {
	font-size: 26px;
	font-weight: 100;
	margin-top: 6px;
}

.header__title b{
	font-weight: bold;
}

:global(.wrap) {
	width: 900px;
	margin: 0 auto;
}

.jobs-section {
	padding: 20px;
	margin-top: 10px;
	background-color: #FFF;
	border: 4px solid rgba(0, 0, 0, .1);
}

.more-jobs__button {
	border: none;
	color: #FFF;
	font-size: 12px;
	font-weight: bold;
	border-radius: 3px;
	text-shadow: -1px -1px 0 #2371a3;
	background: -webkit-gradient(linear, left top, left bottom, from(#46a9e7), to(#1e81bf));
}

@media screen and (max-width: 900px) {
	.wrap {
		width: 90%;
	}
}
</style>