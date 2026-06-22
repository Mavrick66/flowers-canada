let cart = [];

function toggleCart() {
    document.getElementById("cart").classList.toggle("active");
}

function addToCart(name, price) {

    cart.push({
        name,
        price
    });

    renderCart();

    document.getElementById("cart").classList.add("active");
}

function removeFromCart(index) {

    cart.splice(index, 1);

    renderCart();
}

function renderCart() {

    const cartItems = document.getElementById("cartItems");
    const totalElement = document.getElementById("total");

    let html = "";
    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        html += `
        <div class="cart-item">
            <strong>${item.name}</strong><br>
            ${item.price.toLocaleString()} ₽
            <br><br>

            <button
                onclick="removeFromCart(${index})"
                class="btn"
                style="padding:8px 12px;font-size:13px;"
            >
                Удалить
            </button>
        </div>
        `;
    });

    if (cart.length === 0) {
        html = `<p style="color:#777;">Корзина пуста</p>`;
    }

    cartItems.innerHTML = html;
    totalElement.innerText =
        total.toLocaleString() + " ₽";
}

document.addEventListener("DOMContentLoaded", () => {

    renderCart();

    const form = document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", async function(e) {

        e.preventDefault();

        const name =
            document.getElementById("name").value;

        const phone =
            document.getElementById("phone").value;

        const message =
            document.getElementById("message").value;

        try {

            const response = await fetch("/send", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    phone,
                    message,
                    cart
                })
            });

            const result = await response.json();

            if (result.success) {

                alert("Заказ успешно отправлен 🌹");

                form.reset();

                cart = [];

                renderCart();

            } else {

                alert("Ошибка отправки");
            }

        } catch (error) {

            console.error(error);

            alert("Ошибка соединения с сервером");
        }
    });
});
const modal = document.getElementById('orderModal');

document
.getElementById('openOrderModal')
.addEventListener('click', () => {
    modal.classList.add('active');
});

document
.querySelector('.close-modal')
.addEventListener('click', () => {
    modal.classList.remove('active');
});

window.addEventListener('click', (e) => {
    if(e.target === modal){
        modal.classList.remove('active');
    }
});

async function sendOrder(){

    const name =
        document.getElementById("customerName").value;

    const phone =
        document.getElementById("customerPhone").value;

    const message =
        document.getElementById("customerAddress").value;

    const response = await fetch("/send",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:name,
            phone:phone,
            message:message,
            cart:cart
        })
    });

    const result = await response.json();

    if(result.success){

        alert("Заказ отправлен 🌹");

        modal.classList.remove("active");

    }else{

        alert("Ошибка отправки");

    }
}
const slides =
document.querySelectorAll(".slide");

const dots =
document.querySelectorAll(".dot");

let currentSlide = 0;

function showSlide(index){

    slides.forEach(slide =>
        slide.classList.remove("active"));

    dots.forEach(dot =>
        dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
}

function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);
}

function prevSlide(){

    currentSlide--;

    if(currentSlide < 0){
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
}

document.querySelector(".next")
?.addEventListener("click", nextSlide);

document.querySelector(".prev")
?.addEventListener("click", prevSlide);

setInterval(nextSlide, 5000);