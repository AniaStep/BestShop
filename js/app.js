// Calculator logic

const arrows = document.querySelector(".arrows");
const arrowDown = document.querySelector(".arrow-down");
const dropDown = document.querySelector(".select-dropdown");
const calcInput = Array.from(document.querySelectorAll(".calc-input"));
const calcForm = document.querySelector(".calc-form");
const total = document.querySelector(".total-price");

const productsSummary = document.querySelector(".list-item");
const ordersSummary = productsSummary.nextElementSibling;
const packageSummary = ordersSummary.nextElementSibling;
const accountingSummary = packageSummary.nextElementSibling;
const terminalSummary = accountingSummary.nextElementSibling;

const productsPrice = document.querySelector(".item-calc");
const productsValue = document.getElementById("products");
const productsTotal = productsPrice.nextElementSibling;
const ordersTotal = productsPrice.parentElement.nextElementSibling.lastElementChild;
const ordersValue = document.getElementById("orders");
const ordersPrice = ordersTotal.previousElementSibling;
const packagesTotal = packageSummary.lastElementChild;
const packagesName = packagesTotal.previousElementSibling;
const accountingTotal = accountingSummary.lastElementChild;
const terminalTotal = terminalSummary.lastElementChild;

let clickCount = 0;
let packagesArray = [0];
let accountingArray = [0];
let terminalArray = [0];

arrowDown.style.zIndex = 3;
dropDown.style.display = "none";
productsSummary.style.display = "none";
ordersSummary.style.display = "none";
packageSummary.style.display = "none";
accountingTotal.textContent = "$0";
terminalTotal.textContent = "$0";
accountingSummary.style.display = "none";
terminalSummary.style.display = "none";
total.textContent = "$0";

const packages = Array.from(document.querySelectorAll(".select-dropdown li"));
packages.forEach(element => element.addEventListener("click", updateAddonPrice2));

arrows.addEventListener("click", handleSelectOptions);
calcInput.forEach(element => element.addEventListener("change", updateAddonPrice));
calcForm.addEventListener("change", updateTotalPrice);
calcForm.addEventListener("click", updateTotalPrice);

const accountingCheckbox = document.getElementById("accounting");
const terminalCheckbox = document.getElementById("terminal");
const checkboxes = [accountingCheckbox, terminalCheckbox];

checkboxes.forEach(element => element.addEventListener("change", updateAddonPrice3));

function handleSelectOptions(event) {
    event.preventDefault();
    clickCount += 1;
    if (clickCount % 2 === 0) {
        arrowDown.style.zIndex = 3;
        dropDown.style.display = "none";
    } else {
        arrowDown.style.zIndex = 0;
        dropDown.style.display = "flex";
    }
}

function updateAddonPrice(event) {
    const productValue = parseFloat(productsValue.value) || 0;
    const orderValue = parseFloat(ordersValue.value) || 0;

    if (productValue > 0) {
        productsPrice.textContent = `${productValue} * $0.5`;
        productsTotal.textContent = `$${(productValue * 0.5).toFixed(2)}`;
        productsSummary.style.display = "flex";
    } else {
        productsSummary.style.display = "none";
        productsPrice.textContent = "";
        productsTotal.textContent = "";
    }

    if (orderValue > 0) {
        ordersPrice.textContent = `${orderValue} * $0.5`;
        ordersTotal.textContent = `$${(orderValue * 0.5).toFixed(2)}`;
        ordersSummary.style.display = "flex";
    } else {
        ordersSummary.style.display = "none";
        ordersPrice.textContent = "";
        ordersTotal.textContent = "";
    }
    updateTotalPrice();
}

function updateAddonPrice2(event) {
    const { value } = event.currentTarget.dataset;
    const priceMap = {
        basic: { name: "Basic", price: 20 },
        professional: { name: "Professional", price: 40 },
        premium: { name: "Premium", price: 65 }
    };
    const { name, price } = priceMap[value];
    packagesName.textContent = name;
    packagesTotal.textContent = `$${price}`;
    packagesArray[0] = price;
    packageSummary.style.display = "flex";

    packages.forEach(element => element.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    updateTotalPrice();
}

function updateAddonPrice3(event) {
    const checkboxMap = {
        accounting: { element: accountingCheckbox, total: accountingTotal, array: accountingArray },
        terminal: { element: terminalCheckbox, total: terminalTotal, array: terminalArray }
    };
    const { element, total, array } = checkboxMap[event.target.id];
    if (element.checked) {
        total.textContent = "$10";
        array[0] = 10;
    } else {
        total.textContent = "$0";
        array[0] = 0;
    }
    const summary = event.target.id === "accounting" ? accountingSummary : terminalSummary;
    summary.style.display = element.checked ? "flex" : "none";
    updateTotalPrice();
}

function updateTotalPrice() {
    const productTotal = parseFloat(productsValue.value) * 0.5 || 0;
    const orderTotal = parseFloat(ordersValue.value) * 0.5 || 0;
    const totalPrice = productTotal + orderTotal + packagesArray[0] + accountingArray[0] + terminalArray[0];
    total.textContent = `$${totalPrice.toFixed(2)}`;
}
