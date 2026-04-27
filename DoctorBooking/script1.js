function showPage(page) {
    let pages = [
        "homePage",
        "bookPage",
        "paymentPage",
        "paymentSuccessPage",
        "confirmPage",
        "doctorPage",
        "contactPage",
        "viewPage"
    ];

    pages.forEach(p => document.getElementById(p).classList.add("hidden"));

    document.getElementById(page).classList.remove("hidden");

    if(page === "viewPage") loadAppointments();
}
function resetAppointments() {
    localStorage.removeItem("appointments");
    loadAppointments();
    alert("All appointments cleared!");
}

function book() {
    let name = document.getElementById("name").value;
    let doctor = document.getElementById("doctor").value;
    let date = document.getElementById("date").value;

    let today = new Date().toISOString().split("T")[0];

    if(name === "" || date === "") {
        alert("Fill all details");
        return;
    }

    if(date < today) {
        alert("You cannot select past dates!");
        return;
    }

    localStorage.setItem("tempName", name);
    localStorage.setItem("tempDoctor", doctor);
    localStorage.setItem("tempDate", date);

    showPage("paymentPage");
}

window.onload = function() {
    let today = new Date().toISOString().split("T")[0];
    document.getElementById("date").setAttribute("min", today);
};
function onlyText(input) {
    input.value = input.value.replace(/[^a-zA-Z ]/g, '');
}

function pay() {
    let card = document.getElementById("card").value.trim();
    let holder = document.getElementById("holder").value.trim();
    let cvv = document.getElementById("cvv").value.trim();

    // Card Number: only digits & exactly 16 digits
    if (!/^\d{16}$/.test(card)) {
        alert("Card Number must be exactly 16 digits");
        return;
    }

    // Card Holder: only letters and spaces
    if (!/^[A-Za-z ]+$/.test(holder)) {
        alert("Card Holder Name must contain only letters");
        return;
    }

    // CVV: only digits & exactly 3 digits
    if (!/^\d{3}$/.test(cvv)) {
        alert("CVV must be exactly 3 digits");
        return;
    }

    showPage("paymentSuccessPage");
}
function onlyNumbers(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}
function goToPayment() {
    let name = document.getElementById("name").value.trim();

    if(name === "") {
        alert("Enter valid name (only letters)");
        return;
    }

    showPage("paymentPage");
}

function confirmAppointment() {
    let name = localStorage.getItem("tempName");
    let doctor = localStorage.getItem("tempDoctor");
    let date = localStorage.getItem("tempDate");

    let appointment = name + " - " + doctor + " - " + date;

    let data = JSON.parse(localStorage.getItem("appointments")) || [];
    data.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(data));

    document.getElementById("details").innerText = appointment;

    showPage("confirmPage");
}


function loadAppointments() {
    let list = document.getElementById("appointments");
    list.innerHTML = "";

    let data = JSON.parse(localStorage.getItem("appointments")) || [];

    if(data.length === 0) {
        list.innerHTML = "<li>No appointments yet</li>";
        return;
    }

    data.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
    });
}