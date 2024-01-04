<script>
    import Navbar from './Components/Navbar/Navbar.svelte';
    import Showcase from './Components/Showcase/Showcase.svelte';
	import Footer from './Components/Footer/Footer.svelte';
    import Cart from './Components/Cart/Cart.svelte';

	const links = [
		{ text: 'Магазин', href: '/' },
		{ text: 'Правила ухода', href: '/about' },
		{ text: 'Вопросы-ответы', href: '/contact' },
		{ text: 'Как выбрать размер', href: '/contact' },
		{ text: 'Контакты', href: '/contact' },
		{ text: 'Доставка', href: '/contact' },
		{ text: 'Где мой заказ?', href: '/contact' },
		{ text: 'Оферта', href: '/contact' },
	];

	const Navbar_bg_color = '#ffffff';

</script>

<style>
	:global(body) { margin: 0; padding: 0; }
	body {
		font-family: 'Roboto', sans-serif;
		margin: 0;
		padding: 0;
		background-color: #f9f9f9; 
		color: #000000;
		height: auto;
		overflow-x: hidden;
		overflow-y: scroll;
	}


	:global(body)::-webkit-scrollbar {
		width: 0.5rem;
	}

	:global(body)::-webkit-scrollbar-thumb {
		background-color: #3498db;
		border-radius: 6px;
	}

	:global(body)::-webkit-scrollbar-track {
		/* background-color: #f1f1f1; */
	}

	/* Firefox */
	:global(body) {
		scrollbar-width: thin;
		scrollbar-color: #3498db #f1f1f1;
	}

	/* Microsoft Edge and Internet Explorer */
	:global(body) {
		-ms-overflow-style: none;
	}

	:global(body)::-ms-scrollbar-thumb {
		background-color: #3498db;
		border-radius: 6px;
	}

	:global(body)::-ms-scrollbar-track {
		background-color: #f1f1f1;
	}

	main{
		display: flex;
		max-width: 75vw;
		margin-left: calc((100vw - 75vw) / 2) ;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.logo-container{
		margin-top: 2rem;
		margin-bottom: 2rem;
		display: flex;
		justify-content: center;

	}

</style>


<body>
	<Cart />
	<Navbar links={links} bg_color={Navbar_bg_color}/>
	<div style='height: 75px'></div>
	<main>
		<div class='logo-container'>
			<img src="https://placehold.co/600x200" class='logo'>
		</div>
		<h1>Главная</h1>

		<Showcase />

		<Footer />
	</main>
</body>