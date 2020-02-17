<script>
</script>

<style>
.footer {
	left: 0;
	bottom: 0;
	width: 100%;
	color: #999;
	font-size: 12px;
	margin-top: 20px;
	position: absolute;
	background-color: #f5f5f5;
	border-top: 1px solid #ddd;
}

.footer .wrap {
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.footer ul {
	display: flex;
	list-style: none;
}

.footer ul li:not(:first-child) {
	margin-left: 20px;
}

.footer ul li a {
	text-decoration: none;
}

/* .footer__logo{
} */

.footer__logo img{
	width: 24px;
	height: 24px;
	opacity: 0.15;
}

.footer__copyright a{
	color: inherit;
}

.footer__copyright .footer__heart {
	display: inline-block;
	animation: heartbeat infinite 1s;
}

@keyframes heartbeat {
	from {
		transform: scale(1, 1);
	}
	
	to {
		transform: scale(1.2, 1.2);
	}
}
</style>

<footer class="footer">
  <div class="wrap">
    <nav>
      <ul>
        <li>
          <a href="https://changani.me">Firmino's blog</a>
        </li>
        <li>
          <a href="https://changani.me">Contact</a>
        </li>
        <li>
          <a href="https://jobs.github.com/positions.json">API</a>
        </li>
      </ul>
    </nav>
    <div class="footer__logo">
      <img src="/img/github.png" alt="Github logo">
    </div>
    <div class="footer__copyright">
      Built with 
      <span class="footer__heart">♥</span>
      by 
      <a href="https://changani.me">Firmino Changani</a>
    </div>
  </div>
</footer>