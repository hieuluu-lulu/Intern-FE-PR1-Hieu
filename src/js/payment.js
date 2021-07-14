/** @format */

let productWrap = document.querySelector('.wrap');

let product = JSON.parse(localStorage.getItem('productsInCart'));

let summaryPrice = document.querySelector('.summary__total-price');

let billPrice = document.querySelector('.bill__price');

if (product && productWrap) {
	product = Object.values(product);

	let product_content = '';

	product.map((product) => {
		product_content += `
        <div class="product__content-order">
            <div class="order__detail">
                <div class="order__detail-image">
                    <img src="${product.img}" alt="${product.name}">
                </div>
                <div class="order__detail-desc"> 
                    <h1 class="desc__heading">${product.name}</h1><span>x${product.inCart}</span>
                </div>
            </div>
            <div class="order__price"> <span>${parseInt(product.price).toLocaleString(
				'vi-VN',
			)}<sup>đ</sup></span></div>
      </div>`;
	});

	productWrap.innerHTML = product_content;
}

summaryPrice
	? (summaryPrice.innerHTML = `${parseInt(localStorage.getItem('totalCost')).toLocaleString(
			'vi-VN',
	  )}<sup>đ</sup>`)
	: '';

billPrice
	? (billPrice.innerHTML = `${parseInt(localStorage.getItem('totalCost')).toLocaleString(
			'vi-VN',
	  )}<sup>đ</sup>`)
	: '';

// --------------------- validate input --------------------- //

let username = document.querySelector('#name');

let email = document.querySelector('#email');

let phone = document.querySelector('#phone');

let address = document.querySelector('#address');

let regex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

if (username)
	username.oninput = () => {
		let span = document.querySelector('.valid__feedback--name');
		if (isNaN(username.value)) {
			username.style.borderColor = '#789629';
			span.style.display = 'block';
			span.style.color = '#789629';
			span.innerHTML = 'Hợp lệ';
		} else if (username.value == '') {
			username.style.borderColor = '#c72527';
			span.style.display = 'block';
			span.style.color = '#c72527';
			span.innerHTML = 'Tên không được bỏ trống!';
		} else {
			username.style.borderColor = '#c72527';
			span.style.display = 'block';
			span.style.color = '#c72527';
			span.innerHTML = 'Tên không hợp lệ!';
		}
	};

if (email)
	email.oninput = () => {
		let span = document.querySelector('.valid__feedback--email');

		if (!regex.test(email.value) && email.value != '') {
			email.style.borderColor = '#c72527';
			span.style.display = 'block';
			span.style.color = '#c72527';
			span.innerHTML = 'Email không hợp lệ!';
		} else if (email.value == '') {
			email.style.borderColor = '#c72527';
			span.style.display = 'block';
			span.style.color = '#c72527';
			span.innerHTML = 'Email không được bỏ trống!';
		} else {
			email.style.borderColor = '#789629';
			span.style.display = 'block';
			span.style.color = '#789629';
			span.innerHTML = 'Hợp lệ';
		}
	};
if (phone)
	phone.oninput = () => {
		let span = document.querySelector('.valid__feedback--phone');
		if (isNaN(phone.value) || phone.value.length > 10) {
			phone.style.borderColor = '#c72527';
			span.style.display = 'block';
			span.style.color = '#c72527';
			span.innerHTML = 'Số điện thoại không hợp lệ!';
		} else if (phone.value == '') {
			phone.style.borderColor = '#c72527';
			span.style.display = 'block';
			span.style.color = '#c72527';
			span.innerHTML = 'Số điện thoại không được bỏ trống!';
		} else {
			phone.style.borderColor = '#789629';
			span.style.display = 'block';
			span.style.color = '#789629';
			span.innerHTML = 'Hợp lệ';
		}
	};
if (address)
	address.oninput = () => {
		let span = document.querySelector('.valid__feedback--address');

		if (address.value == '') {
			address.style.borderColor = '#c72527';
			span.style.display = 'block';
			span.style.color = '#c72527';
			span.innerHTML = 'Đại chỉ không được bỏ trống!';
		} else {
			address.style.borderColor = '#789629';
			span.style.display = 'block';
			span.style.color = '#789629';
			span.innerHTML = 'Hợp lý';
		}
	};
// ------------------------------- submit click ------------------------ //

let orderData = {};
let cartItem = JSON.parse(localStorage.getItem('productsInCart'));
let form = document.querySelector('#form-payment');
form
	? form.addEventListener('submit', async (e) => {
			let formInput = document.querySelectorAll('.payment__form-input');
			e.preventDefault();
			if (username.value == '') {
				let span = document.querySelector('.valid__feedback--name');
				username.style.borderColor = '#c72527';
				span.style.display = 'block';
				span.style.color = '#c72527';
				span.innerHTML = 'Tên không được bỏ trống!';
			}
			if (email.value == '') {
				let span = document.querySelector('.valid__feedback--email');
				email.style.borderColor = '#c72527';
				span.style.display = 'block';
				span.style.color = '#c72527';
				span.innerHTML = 'Email không được bỏ trống!';
			}
			if (phone.value == '') {
				let span = document.querySelector('.valid__feedback--phone');
				phone.style.borderColor = '#c72527';
				span.style.display = 'block';
				span.style.color = '#c72527';
				span.innerHTML = 'Số điện thoại không được bỏ trống!';
			}
			if (address.value == '') {
				let span = document.querySelector('.valid__feedback--address');
				address.style.borderColor = '#c72527';
				span.style.display = 'block';
				span.style.color = '#c72527';
				span.innerHTML = 'Địa chỉ không được bỏ trống!';
			} else {
				formInput.forEach((item) => {
					if (item.value != '') {
						orderData = {
							...orderData,
							order: Object.values(cartItem),
							[item.id]: item.value,
						};
					}
				});
				console.log(orderData);
				// localStorage.setItem('order', JSON.stringify(orderData));
				toastSuccess('Cảm ơn bạn đã mua hàng 🥰🥰🥰');
				await $.ajax({
					method: 'POST',
					url: `${baseURL}/payments`,
					data: orderData,
					success: function (data) {
						console.log(data);
					},
				});
				localStorage.clear();
				setTimeout(() => {
					window.location = 'http://localhost:3000/product.html';
				}, 1500);
			}
	  })
	: '';
