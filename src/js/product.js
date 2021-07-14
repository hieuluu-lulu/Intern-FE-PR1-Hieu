/** @format */
const baseURL = 'http://localhost:4000';

let filter = { _page: 1, _limit: 6 };

window.addEventListener('DOMContentLoaded', () => {
	getProductLimit(filter);
	onLoadCartNumber();
	loadProductInCart();
	onLoadTotalCost();
});

(function getAllProduct() {
	$.ajax({
		method: 'GET',
		url: `${baseURL}/product`,
		success: function (data) {
			renderPagination(data, filter);
			renderCategory(data);

			localStorage.setItem('currentPage', filter._page);
			localStorage.setItem('currentLimit', filter._limit);
			``;
		},
	});
})();

function getProductLimit(params) {
	$.ajax({
		type: 'GET',
		url: `${baseURL}/product`,
		data: params,
		success: function (data) {
			renderProduct(data);
			cartNumber(data);
		},
		error: function (err) {
			console.log(err);
		},
	});
}

// --------------- render product ------------------ //

function renderProduct(data) {
	let product_grid = data.map((product, index) => {
		return `
			<div class="col-lg-4 col-md-4 col-sm-12"> 
				<div class="card product__card">
					<img class="card-img-top product__card-img" src="${product.img}" alt="${product.name + index}">
					<div class="card-body product__card-body">
						<p class="card-text body__cate">${product.category}</p>
						<a href="./details.html">
							<h5 class="card-title body__title">${product.name}</h5>
						</a>
						<div class="body__line"></div>
						<span class="body__price">${parseInt(product.price).toLocaleString('vi-VN')}<sup>đ </sup></span>
						<span class="body__oldprice">${product.oldprice}</span>
						<div class="product__card-footer">
							<button class="btn-bought" data-id=" ${product.id}" >Mua hàng</button>
							<button class="btn-wish"><i class="fas fa-heart"></i></button>
							<button class="btn-reload"><i class="fas fa-sync-alt"></i></button>
						</div>
					</div>
				</div>
			</div>
		`;
	});

	let product_list = data.map((product, index) => {
		return `
			<div class="row mt-5">
				<div class="col-md-4 col-sm-12">
					<div class="product__list-image">
						<img src="${product.img}" alt=" product_list ${index}"></div>
					</div>
				<div class="col-md-8 col-sm-12">
					<div class="product__list-detail"> 
						<h1 class="detail__title"> ${product.name}</h1>
						<div class="detail__like"> <i class="detail__like-icon fas fa-heart"></i><i class="detail__like-icon fas fa-heart"> </i><i class="detail__like-icon fas fa-heart"></i><i class="detail__like-icon fas fa-heart"></i><i class="detail__like-icon fas fa-heart"></i><span>( 4 Lượt thích )</span></div>
						<p class="detail__desc">${product.description}</p>
						<p class="detail__price">${parseInt(product.price).toLocaleString('vi-VN')}đ</p>
					</div>
					<button class="btn-bought">Mua hàng</button>
					<button class="btn-wish"><i class="fas fa-heart"></i></button>
					<button class="btn-reload"><i class="fas fa-sync-alt"> </i></button>
				</div>
			</div>
	
		`;
	});

	$('.product__grid').html(product_grid);

	$('.product__list').html(product_list);
}

// ------------------ categories -----------------//

function renderCategory(data) {
	let cate = new Set(
		data.map((item) => {
			return item.category;
		}),
	);
	let categories = [...cate];
	let newCategories = categories.map((category) => {
		return `<li class="child__item"><a class="child__item-link" style = "cursor: pointer">${category}</a></li>`;
	});

	$('.list__item-child').html(newCategories);

	let childItem = document.querySelectorAll('.child__item-link');
	childItem.forEach((item) => {
		item.onclick = () => {
			filter = { ...filter, category: item.innerText };
			getProductLimit(filter);
		};
	});

	let allComestic = document.querySelector('#comestic');

	allComestic
		? (allComestic.onclick = () => {
				filter = { _page: 1, _limit: 6 };
				getProductLimit(filter);
		  })
		: '';
}
