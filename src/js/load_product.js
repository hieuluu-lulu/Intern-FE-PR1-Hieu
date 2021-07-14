/** @format */

let numberOfProduct = document.querySelector('.right__cart span');

function onLoadCartNumber() {
	let cartNumber = localStorage.getItem('cartNumbers');

	if (numberOfProduct) {
		if (cartNumber && cartNumber > 0) {
			numberOfProduct.textContent = cartNumber;
			numberOfProduct.style.display = 'flex';
		} else {
			numberOfProduct.style.display = 'none';
		}
	}
}

// --------------------- render number of product in cart ----------------////

function cartNumber(product) {
	let btnBought = document.querySelectorAll('.btn-bought');
	for (let i = 0; i < btnBought.length; i++) {
		btnBought[i].onclick = () => {
			let productNumber = localStorage.getItem('cartNumbers');
			productNumber = parseInt(productNumber);
			if (productNumber) {
				localStorage.setItem('cartNumbers', productNumber + 1);
				numberOfProduct.textContent = productNumber + 1;
				numberOfProduct.style.display = 'flex';
			} else {
				localStorage.setItem('cartNumbers', 1);
				numberOfProduct.textContent = 1;
				numberOfProduct.style.display = 'flex';
			}
			toastSuccess('Thêm hàng vào giỏ thành công');
			addProductToCart(product[i]);
			totalCost(product[i]);
			loadProductInCart();
		};
	}
}

// ------------------ add product to cart -----------------//

function addProductToCart(product) {
	let cartItems = localStorage.getItem('productsInCart');

	cartItems = JSON.parse(cartItems);

	if (cartItems != null) {
		// check if cartItem is undefined when want to add another product into cartItem
		if (cartItems[`products ${product.id}`] == undefined) {
			cartItems = {
				...cartItems,
				[`products ${product.id}`]: { ...product, inCart: 0 },
			};
		}
		cartItems[`products ${product.id}`].inCart += 1;
	} else {
		cartItems = {
			[`products ${product.id}`]: { ...product, inCart: 1 },
		};
	}

	localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}
//----------------- total cost -------------------

function totalCost(product) {
	let cartCost = localStorage.getItem('totalCost');
	if (cartCost != null) {
		cartCost = parseInt(cartCost);
		localStorage.setItem('totalCost', cartCost + parseInt(product.price));
	} else {
		localStorage.setItem('totalCost', parseInt(product.price));
	}
}
// load product ------------------ //////////////////////////////////

//  -------------------------------- total cost -------------------------//

function onLoadTotalCost() {
	let totalCost = localStorage.getItem('totalCost');
	let total_price = document.querySelector('.cart__total-price');

	total_price
		? (total_price.innerHTML = ` ${
				totalCost > 0 ? parseInt(totalCost).toLocaleString('vi-VN') : 0
		  }<sup>đ</sup>`)
		: '';
}

//  ------------------------------------ handle delete --------------------- //

function handleDeleteProduct(index) {
	let cartItem = JSON.parse(localStorage.getItem('productsInCart'));

	let totalPrice = parseInt(localStorage.getItem('totalCost'));

	let cartNumber = localStorage.getItem('cartNumbers');

	cartItem = Object.values(cartItem);

	cartItem = { ...cartItem };

	totalPrice -= cartItem[index].price * cartItem[index].inCart;
	localStorage.setItem('totalCost', totalPrice);

	if (cartItem[index].inCart == 0) {
		cartNumber = cartNumber - 1;
	} else {
		cartNumber = cartNumber - cartItem[index].inCart;
	}
	localStorage.setItem('cartNumbers', cartNumber);

	delete cartItem[index];

	cartItem = { ...cartItem };

	localStorage.setItem('productsInCart', JSON.stringify(cartItem));

	loadProductInCart();
	onLoadCartNumber();
	onLoadTotalCost();
}

function loadProductInCart() {
	let cartItem = JSON.parse(localStorage.getItem('productsInCart'));
	let totalPrice = parseInt(localStorage.getItem('totalCost'));
	let total_price = document.querySelector('.cart__total-price');
	let wrapAll = '';
	let cartWrap = document.querySelector('.right__cart-wrap');

	let productCartTable = document.querySelector('.cart__table-body');
	let productTable = '';

	if (cartItem && Object.values(cartItem).length !== 0) {
		let allProductInLocal = Object.values(cartItem);
		allProductInLocal.map((item) => {
			wrapAll += `
				<div class="wrap__items">
                    <div class="wrap__items-image"> <img src="${item.img}" alt="cart-img"></div>
                    <div class="wrap__items-details">
                      <p class="details__title">${item.name}  <span class= "ms-3">x</span></p>
                      <p class="details__price">${parseInt(item.price).toLocaleString(
							'vi-VN',
						)}<sup>đ</sup></p>
                    </div>
                </div>
			`;
			productTable += `
				<tr>
					<td><div class= "body__img"><img src="${item.img}" alt="${item.name}"></div></td>
					<td>${item.name}</td>
					<td><span class="body__price">${parseInt(item.price).toLocaleString(
						'vi-VN',
					)}<sup>đ</sup></span></td>
					<td><input type="number" value=${item.inCart} class="body__quantity"></input></td>
					<td><span class="body__total" data-price= "${parseInt(item.price * item.inCart)}">${parseInt(
				item.price * item.inCart,
			).toLocaleString('vi-VN')}<sup>đ</sup></span></td>
					<td><a class="body__link" href= "#" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="far fa-trash-alt"></i></a></td>
					<div class="modal fade mt-5 p-5 " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div class="modal-dialog ">
							<div class="modal-content mt-5  ">
								<div class="modal-header">
									<h2 class="modal-title text-danger" id="exampleModalLabel">Bạn chắc chắn muốn bỏ sản phẩm này?</h2>
									<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div class="modal-body">
									<p>${item.name}</p>
								</div>
								<div class="modal-footer py-4">
									<button type="button" class="btn btn-no" data-bs-dismiss="modal">Không</button>
									<button type="button" class="btn btn-yes" data-bs-dismiss="modal">Có</button>
								</div>
							</div>
						</div>
					</div>
				</tr>`;
		});
		cartWrap
			? (cartWrap.innerHTML = `
			${wrapAll}
			<div class="wrap__footer">
                <div class="wrap__footer-total">
                    <p>Tổng số</p>
                    <p>${totalPrice.toLocaleString('vi-VN')}<sup>đ</sup></p>
                </div>
				<a class="btn wrap__footer-btn" href="./product-cart.html">Giỏ hàng</a>
            </div>
		`)
			: '';
		productCartTable ? (productCartTable.innerHTML = productTable) : '';

		let quantity = document.querySelectorAll('.body__quantity');

		let total = document.querySelectorAll('.body__total');

		// --------------------- handle change quantity of product ---------------------- //

		for (let i = 0; i < quantity.length; i++) {
			quantity[i].addEventListener('change', () => {
				total[i].innerHTML = `${(
					parseInt(allProductInLocal[i].price) * parseInt(quantity[i].value)
				).toLocaleString('vi-VN')}<sup>đ</sup>`;

				total[i].setAttribute(
					'data-price',
					parseInt(allProductInLocal[i].price) * parseInt(quantity[i].value),
				);

				allProductInLocal[i].inCart = parseInt(quantity[i].value);

				localStorage.setItem('productsInCart', JSON.stringify(cartItem));

				// ------------------ render total price ---------------- //

				let priceAll = [];

				for (let i = 0; i < total.length; i++) {
					priceAll.push(parseInt(total[i].getAttribute('data-price')));
				}

				let priceChange = priceAll.reduce((acc, item) => acc + item);

				total_price.innerHTML = `${priceChange.toLocaleString('vi-VN')}<sup>đ</sup>`;

				totalPrice = priceAll.reduce((acc, item) => acc + item);
				localStorage.setItem('totalCost', totalPrice);

				if (quantity[i].value == 0) {
					handleDeleteProduct(i);
				}
			});
		}

		// ----------- handle delete product in cart -------------------------- ///

		let spanDelete = document.querySelectorAll('.details__title span');

		for (let i = 0; i < spanDelete.length; i++) {
			spanDelete[i].onclick = () => {
				handleDeleteProduct(i);
			};
		}

		// ------------------ handle delete product in table ---------------- //

		let btnYes = document.querySelectorAll('.btn-yes');

		for (let i = 0; i < btnYes.length; i++) {
			btnYes[i].onclick = () => {
				handleDeleteProduct(i);
			};
		}
		//------------------- delete all product in cart ----------------- //
		let btnDelete = document.querySelector('.btn-delete');

		if (btnDelete && totalPrice != 0) {
			btnDelete.addEventListener('click', () => {
				localStorage.clear();
				loadProductInCart();
				onLoadCartNumber();
				onLoadTotalCost();
			});
		}
	} else {
		cartWrap
			? (cartWrap.innerHTML = `
			<img class="no-cart" src="../assets/images/no-cart.png">
			<p class="fs-4  w-100 py-4 text-center">Chưa có sản phẩm nào trong giỏ hàng</p>
		`)
			: '';

		productCartTable
			? (productCartTable.innerHTML = `
			<td class=" text-center py-5" td colspan="6">
				<h1 class= "text-center">Bạn chưa có sản phẩm nào!</h1>
			</td>
		`)
			: '';
	}
	if (!totalPrice || totalPrice == 0) {
		document.querySelector('.btn.btn-payment').style.display = 'none';
	}
}
