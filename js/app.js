const arrows = document.querySelector(".arrows");
const arrowDown = document.querySelector(".arrow-down");
const dropDown = document.querySelector(".select-dropdown");

const calcInput = Array.from(document.querySelectorAll(".calc-input"));
const calcForm = document.querySelector(".calc-form");

const productsSummary = document.querySelector(".list-item");
let productsPrice = document.querySelector(".item-calc");
let productsValue = document.getElementById("products");
let productsTotal = productsPrice.nextElementSibling;

const ordersSummary = productsSummary.nextElementSibling;
let ordersTotal = productsPrice.parentElement.nextElementSibling.lastElementChild;
let ordersValue = document.getElementById("orders");
let ordersPrice = ordersTotal.previousElementSibling;

const packageSummary = ordersSummary.nextElementSibling;
let packagesTotal = packageSummary.lastElementChild;
let packagesName = packagesTotal.previousElementSibling;
const packages = Array.from(document.querySelectorAll(".select-dropdown li"));

const accountingSummary = packageSummary.nextElementSibling;
let accountingTotal = accountingSummary.lastElementChild;
const accountingCheckbox = document.getElementById("accounting");

const terminalSummary = accountingSummary.nextElementSibling;
let terminalTotal = terminalSummary.lastElementChild;
const terminalCheckbox = document.getElementById("terminal");

const checkboxes = Array.from(document.querySelectorAll(".form-checkbox"));
const total = document.querySelector(".total-price");


arrowDown.style.zIndex = 3;
dropDown.style.display = "none";
productsSummary.style.display = "none";
ordersSummary.style.display = "none";
packageSummary.style.display = "none";
accountingTotal.textContent = 0;
terminalTotal.textContent = 0;
accountingSummary.style.display = "none";
terminalSummary.style.display = "none";

let clickCount = 0;
let packagesArray = [0];
let accountingArray = [0];
let terminalArray = [0];

arrows.addEventListener("click", handleSelectOptions);
calcInput.forEach(function(element) {
    element.addEventListener("change", updateAddonPrice)
})

packages.forEach(function(element) {
    element.addEventListener("click", updateAddonPrice2)
})
checkboxes.forEach(function(element) {
    element.addEventListener("change", updateAddonPrice3)
})

calcForm.addEventListener("change", updateTotalPrice);
calcForm.addEventListener("click", updateTotalPrice);



function handleSelectOptions (event) {
    event.preventDefault();
    clickCount += 1;
    if (clickCount % 2 === 0) {
        arrowDown.style.zIndex = 3;
        dropDown.style.display = "none";

    }
    else {
        arrowDown.style.zIndex = 0;
        dropDown.style.display = "flex";
    }

}

function updateAddonPrice (event) {


    if (productsValue.value > 0) {
        productsPrice.textContent = productsValue.value + " * $0.5";
        productsTotal.textContent = "$" + (productsValue.value * 0.5);
        productsSummary.style.display = "flex";
    }
    if (ordersValue.value > 0) {
        ordersPrice.textContent = ordersValue.value + " * $0.5";
        ordersTotal.textContent = "$" + (ordersValue.value * 0.5);
        ordersSummary.style.display = "flex";
    }
}

function updateAddonPrice2 (event) {
    if (this.dataset.value === "basic") {
        packagesName.textContent = "Basic";
        packagesTotal.textContent = "$20";
        packagesArray.splice(0,1,20);
    }
    if (this.dataset.value === "professional") {
        packagesName.textContent = "Professional";
        packagesTotal.textContent = "$40";
        packagesArray.splice(0,1,40);

    }
    if (this.dataset.value === "premium") {
        packagesName.textContent = "Premium";
        packagesTotal.textContent = "$65";
        packagesArray.splice(0,1,65);
    }
    packageSummary.style.display = "flex";

}

function updateAddonPrice3 (event) {
    if (accountingCheckbox.checked) {
        accountingTotal.textContent = "$10";
        accountingSummary.style.display = "flex";
        accountingArray.splice(0,1,10);
    }
    if (terminalCheckbox.checked) {
        terminalTotal.textContent = "$10";
        terminalSummary.style.display = "flex";
        terminalArray.splice(0,1,10);
    }
    if (!accountingCheckbox.checked) {
        accountingTotal.textContent = "0";
        accountingSummary.style.display = "none";
        accountingArray.splice(0,1,0);
    }
    if (!terminalCheckbox.checked) {
        terminalTotal.textContent = "0";
        terminalSummary.style.display = "none";
        terminalArray.splice(0,1,0);
    }
}

function updateTotalPrice (event) {

total.textContent = productsValue.value * 0.5 + ordersValue.value * 0.5 + packagesArray[0] + accountingArray[0] + terminalArray[0];

}
