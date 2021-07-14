/** @format */

function renderPagination(data, params) {
	let totalPages = parseInt(data.length / params._limit);

	let listPagination = '';
	for (let page = 1; page <= totalPages; page++) {
		listPagination += `
			<li class=" ${
				page === filter._page ? ' page-item active ' : 'page-item'
			}" style="cursor:pointer"; value= ${page}><a class="page-link")>${page}</a></li>
		`;
	}

	let product_filter = document.querySelector('.product__filter-pagination');

	product_filter
		? (product_filter.innerHTML = `<nav>
			<ul class='pagination'>
				<li id= "select">
					<select class="form-select form-select-lg " onchange= 'handleChangeSort(value)' >
						<option value= "default" selected>Mặc định</option>
						<option value="asc">Tăng dần</option>
						<option value="desc">Giảm dần</option>
					</select>
				</li>
				<li id= "prev" value= "${params._page}" onclick= handlePrevious(value)>
					<a class='page-link' >
						<span aria-hidden='true' >&laquo;</span>
					</a>
				</li>
				${listPagination}
				<li value= "${totalPages - 1}" id="next" onclick= handleNext(value)>
					<a class='page-link'>
						<span aria-hidden='true'>&raquo;</span>
					</a>
				</li>
			</ul>
		</nav>`)
		: '';

	let prev = document.querySelector('#prev');
	let next = document.querySelector('#next');
	const pagiItem = document.querySelectorAll('.page-item');

	pagiItem.forEach((item) => {
		item.onclick = () => {
			filter = { ...filter, _page: item.value };
			getProductLimit(filter);
			localStorage.setItem('currentPage', item.value);
			document.querySelector('.page-item.active').classList.remove('active');
			item.classList.add('active');
			filter._page === 1 ? (prev.value = 1) : (prev.value = filter._page - 1);
			filter._page === totalPages
				? (next.value = totalPages)
				: (next.value = filter._page + 1);
		};
	});

	handlePrevious = (value) => {
		parseInt(value) > 1 ? (prev.value = value - 1) : '';
		pagiItem.forEach((item) => {
			if (item.value !== value) {
				item.classList.remove('active');
			} else {
				item.classList.add('active');
				filter = { ...filter, _page: value };
				getProductLimit(filter);
			}
		});

		if (value === 1) {
			next.value = value + 1;
		}
	};
	handleNext = (value) => {
		parseInt(value) < totalPages ? (next.value = value + 1) : '';
		pagiItem.forEach((item) => {
			if (item.value !== value) {
				item.classList.remove('active');
			} else {
				item.classList.add('active');
				filter = { ...filter, _page: value };
				getProductLimit(filter);
			}
		});
		if (value === totalPages) {
			prev.value = value - 1;
		}
	};
	handleChangeSort = (value) => {
		switch (value) {
			case 'asc':
				filter = { ...filter, _sort: 'price', _order: value };
				getProductLimit(filter);
				break;
			case 'desc':
				filter = { ...filter, _sort: 'price', _order: value };
				getProductLimit(filter);
				break;
			case 'default':
				filter = { _page: 1, _limit: 6 };
				getProductLimit(filter);
				break;
		}
	};
}
