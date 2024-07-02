document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('btn-contact-form')) {
        const contactFormBtn = document.getElementById('btn-contact-form');
        contactFormBtn.addEventListener('click', function (event) {
            contactFormBtn.disabled = true;
            contactFormBtn.querySelector('.spinner-border').classList.remove('d-none');
            const form = event.target.form;

            fetch(APP_URL + '/contact-form', {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'X-CSRF-TOKEN': CSRF_TOKEN,
                    },
                })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    contactFormBtn.disabled = false;
                    contactFormBtn.querySelector('.spinner-border').classList.add('d-none');

                    if (data.errors !== undefined) {
                        const errors = data.errors;
                        for (const field in errors) {
                            const errors = data.errors;
                            handleValidationErrors(errors);
                        }
                    } else {
                        resetValidationClasses();
                        form.reset();
                        document.getElementById('success-contact').classList.remove('d-none');
                    }
                })
                .catch(error => {
                    contactFormBtn.disabled = false;
                    contactFormBtn.querySelector('.spinner-border').classList.add('d-none');
                    console.error('There was a problem with the fetch operation:', error);
                });
        });
    }

    if (document.getElementById('btn-volunteer-form')) {
        const vounteerFormBtn = document.getElementById('btn-volunteer-form');
        vounteerFormBtn.addEventListener('click', function (event) {
            vounteerFormBtn.disabled = true;
            vounteerFormBtn.querySelector('.spinner-border').classList.remove('d-none');
            const form = event.target.form;

            fetch(APP_URL + '/vounteer-form', {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'X-CSRF-TOKEN': CSRF_TOKEN,
                    },
                })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    vounteerFormBtn.disabled = false;
                    vounteerFormBtn.querySelector('.spinner-border').classList.add('d-none');

                    if (data.errors !== undefined) {
                        const errors = data.errors;
                        for (const field in errors) {
                            const errors = data.errors;
                            handleValidationErrors(errors);
                        }
                    } else {
                        resetValidationClasses();
                        form.reset();
                        document.getElementById('success-contact').classList.remove('d-none');
                    }
                })
                .catch(error => {
                    vounteerFormBtn.disabled = false;
                    vounteerFormBtn.querySelector('.spinner-border').classList.add('d-none');
                    console.error('There was a problem with the fetch operation:', error);
                });
        });
    }

    if (document.querySelectorAll(".btn-subscriber-form")) {
        const btnSubscriberForm = document.querySelectorAll(".btn-subscriber-form");
        btnSubscriberForm.forEach(element => {
            element.addEventListener("click", function (e) {
                e.preventDefault();
                element.disabled = true;
                const form = e.target.form;

                fetch(APP_URL + '/subscriber-form', {
                        method: 'POST',
                        body: new FormData(form),
                        headers: {
                            'X-CSRF-TOKEN': CSRF_TOKEN,
                        },
                    })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        element.disabled = false;

                        if (data.errors !== undefined) {
                            const errors = data.errors;
                            for (const field in errors) {
                                const errors = data.errors;
                                handleValidationErrors(errors);
                            }
                        } else {
                            resetValidationClasses();
                            form.reset();
                            form.querySelector('.subscriber-success').classList.remove('d-none');
                            setTimeout(function() {
                                form.querySelector('.subscriber-success').classList.add('d-none');
                            }, 3000);
                        }
                    })
                    .catch(error => {
                        element.disabled = false;
                        console.error('There was a problem with the fetch operation:', error);
                    });
            });
        });
    }

    if (document.querySelectorAll(".btn-cart-item-remove")) {
        const cartItem = document.querySelectorAll(".btn-cart-item-remove");
        if (cartItem) {
            cartItem.forEach(item => {
                item.addEventListener('click', function () {
                    document.getElementById('cart-item-' + item.getAttribute('data-id')).remove();
                    var formData = new FormData();
                    formData.append('id', item.getAttribute('data-id'));
                    fetch(APP_URL + '/delete-cart-item', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'X-CSRF-TOKEN': CSRF_TOKEN,
                        },
                    })
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        document.getElementById('cart-count').innerHTML = data.cart_count;
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    });
                });
            });
        }
    }

    if (document.querySelectorAll(".payment-input")) {
        const paymentInput = document.querySelectorAll(".payment-input");
        const paymentForm = document.getElementById('payment-form');
        if (paymentForm) {
            const submitButtons = paymentForm.querySelectorAll('button[type="submit"]');
            paymentInput.forEach(input => {
                input.addEventListener('change', function () {
                    submitButtons.forEach(button => {
                        button.classList.add('d-none');
                    });
                    if (document.getElementById('btn-' + input.getAttribute('id'))) {
                        document.getElementById('btn-' + input.getAttribute('id')).classList.remove('d-none');
                    }
                });
            });
        }
    }

    if (document.querySelectorAll('.carousel .carousel-item')) {
        const items = document.querySelectorAll('.carousel .carousel-item');
        items.forEach((el) => {
            const minPerSlide = 4
            let next = el.nextElementSibling
            for (var i = 1; i < minPerSlide; i++) {
                if (!next) {
                    // wrap carousel by using first child
                    next = items[0]
                }
                let cloneChild = next.cloneNode(true)
                el.appendChild(cloneChild.children[0])
                next = next.nextElementSibling
            }
        });
    }

    if (document.querySelectorAll('.btn-plus')) {
        const plusbtn = document.querySelectorAll('.btn-plus');
        plusbtn.forEach(btn => {
            btn.addEventListener('click', function() {
                let quantityElement = document.getElementById('quantity');
                let currentValue = parseInt(quantityElement.value);
                quantityElement.value = currentValue + 1;
                variant_price(btn.getAttribute('data-pid'));
            });
        });
    }

    if (document.querySelectorAll('.btn-minus')) {
        const minusbtn = document.querySelectorAll('.btn-minus');
        minusbtn.forEach(btn => {
            btn.addEventListener('click', function() {
                let quantityElement = document.getElementById('quantity');
                let currentValue = parseInt(quantityElement.value);
                quantityElement.value = currentValue - 1;
                variant_price(btn.getAttribute('data-pid'));
            });
        });
    }

    if (document.querySelectorAll('.btn-group-toggle .attribute_choices')) {
        const attributeCheckboxes = document.querySelectorAll('.btn-group-toggle .attribute_choices');
        attributeCheckboxes.forEach(label => {
            label.addEventListener('click', function(event) {
                event.stopPropagation();

                const innerChoices = document.querySelectorAll('.attribute_choices_' + label.getAttribute('data-id'));
                innerChoices.forEach(div => {
                    div.classList.remove('active');
                    div.querySelector('input[type="radio"]').checked = false;
                });

                label.classList.add('active');
                label.querySelector('input[type="radio"]').checked = true;
                variant_price(document.getElementById('product_detail_id').value);
            });
        });
    }

    if (document.getElementById('product_detail_id')) {
        variant_price(document.getElementById('product_detail_id').value);
    }

    if (document.getElementById('add-to-cart')) {
        const cartBtn = document.getElementById('add-to-cart');
        cartBtn.addEventListener('click', function (e) {
            e.preventDefault();
            addToCart(cartBtn);
        });
    }

    if (document.getElementById('payment-form')) {
        document.getElementById('payment-form').addEventListener('submit', function(event) {
            // Prevent the form from submitting immediately
            event.preventDefault();

            // Find all submit buttons within the form
            var submitButtons = this.querySelectorAll('button[type="submit"]');

            // Disable all submit buttons
            submitButtons.forEach(function(button) {
                button.disabled = true;

                button.querySelector('.spinner-border').classList.remove('d-none');
            });

            this.submit();
        });
    }

    if (document.querySelectorAll('input[name="subscription"]')) {
        const radioButtons = document.querySelectorAll('input[name="subscription"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.checked) {
                    if (document.getElementById('custom-amount')) {
                        if (this.value == 'custom_amount') {
                            document.getElementById('custom-amount').classList.remove('d-none');
                        } else {
                            document.getElementById('custom-amount').classList.add('d-none');
                        }
                    }

                    const donations = document.querySelectorAll('.donation-amount');
                    donations.forEach(element => {
                        element.innerHTML = radio.getAttribute('data-text');
                    });
                }
            });
        });
    }

    if (document.querySelectorAll('.see-more')) {
        const seeMoreLinks = document.querySelectorAll('.see-more');
        seeMoreLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const id = this.id.replace('see-more-', '');
                document.getElementById('extra-text-' + id).classList.remove('d-none');
                document.getElementById('extra-text-' + id).classList.add('d-inline');
                this.classList.add('d-none');
                document.getElementById('see-less-' + id).classList.remove('d-none');
            });
        });
    }

    if (document.querySelectorAll('.see-less')) {
        const seeLessLinks = document.querySelectorAll('.see-less');
        seeLessLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const id = this.id.replace('see-less-', '');
                document.getElementById('extra-text-' + id).classList.remove('d-inline');
                document.getElementById('extra-text-' + id).classList.add('d-none');
                this.classList.add('d-none');
                document.getElementById('see-more-' + id).classList.remove('d-none');
            });
        });
    }
});

function variant_price(pid) {
    var formData = new FormData();
    formData.append('id', pid);
    const labels = document.querySelectorAll('.attribute_choices');
    if (labels) {
        labels.forEach(label => {
            const radio = label.querySelector('input[type=radio]');
            if (radio.checked) {
                formData.append(radio.getAttribute('name'), radio.getAttribute('value'));
            }
        });
    }
    formData.append('quantity', document.getElementById('quantity').value);

    fetch(APP_URL + '/variant-price', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': CSRF_TOKEN,
            },
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            document.getElementById('product-price').innerHTML = data.price;
            document.getElementById('avialable-product-qty').innerHTML = data.quantity;
            document.getElementById('quantity').setAttribute('max', data.max_limit);

            if (parseInt(data.in_stock) > 0) {
                document.getElementById('add-to-cart').classList.remove('d-none');
                document.getElementById('out-of-stock').classList.add('d-none');
            } else {
                document.getElementById('add-to-cart').classList.add('d-none');
                document.getElementById('out-of-stock').classList.remove('d-none');
                document.getElementById('btn-minus').disabled = true;
                document.getElementById('quantity').disabled = true;
                document.getElementById('btn-plus').disabled = true;
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function handleValidationErrors(errors) {
    for (const field in errors) {
        console.log(field);
        if (errors.hasOwnProperty(field)) {
            const errorMessages = errors[field];
            if (document.getElementById(field)) {
                document.getElementById(field).classList.add('is-invalid');
            }
            const element = document.getElementById(field + '_error');
            if (element) {
                element.classList.remove('d-none');
                element.innerHTML = errorMessages;
            }
            if (document.querySelector('[name="' + field + '"]')) {
                var elements = document.querySelectorAll('[name="' + field + '"]');
                elements.forEach(function(element) {
                    element.classList.add('is-invalid');
                });
            }
        }
    }
}

function resetValidationClasses() {
    var errorElements = document.querySelectorAll('._error');
    errorElements.forEach(function(element) {
        element.classList.add('d-none');
    });

    var elements = document.querySelectorAll('.is-invalid');
    elements.forEach(function(element) {
        element.classList.remove('is-invalid');
    });
}

function addToCart(cartBtn) {
    if (checkAddToCartValidity()) {
        cartBtn.disabled = true;
        document.getElementById('response').innerHTML = '';
        const form = document.getElementById('option-choice-form');
        fetch(APP_URL + '/add-to-cart', {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'X-CSRF-TOKEN': CSRF_TOKEN,
            },
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            cartBtn.disabled = false;
            if (data.status == 1) {
                document.getElementById('response').innerHTML = '<div class="alert alert-success">Product added to cart</div>';
                document.getElementById('cart-count').innerHTML = data.cart_count;
                // window.location.href = '/checkout';
            } else {
                document.getElementById('response').innerHTML = data.view;
            }
        })
        .catch(error => {
            cartBtn.disabled = false;
            console.error('There was a problem with the fetch operation:', error);
        });
    } else {
        document.getElementById('response').innerHTML = '<div class="alert alert-danger">Please select all options</div>';
    }
}

function checkAddToCartValidity() {
    var names = new Set();
    var radios = document.querySelectorAll('#option-choice-form input[type="radio"]');

    radios.forEach(function (radio) {
        names.add(radio.name);
    });

    var count = names.size;
    var checkedCount = document.querySelectorAll('#option-choice-form input[type="radio"]:checked').length;

    return checkedCount === count;
}
