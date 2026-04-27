function showPage(id) {
    let pages = ["home","calc","result","dietPage","logPage"];
    pages.forEach(p => document.getElementById(p).classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");

    if(id === "logPage") loadLogs();
}

function onlyNumbers(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}

function calculate() {
    let age = document.getElementById("age").value;
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    let gender = document.getElementById("gender").value;
    let activity = document.getElementById("activity").value;

    if(age=="" || height=="" || weight=="" || gender=="" || activity=="") {
        alert("Fill all details");
        return;
    }

    height = height / 100;

    let bmi = weight / (height * height);
    bmi = bmi.toFixed(2);

    let category = "";

    if(bmi < 18.5) category = "Underweight";
    else if(bmi < 25) category = "Normal";
    else if(bmi < 30) category = "Overweight";
    else category = "Obese";

    let bmr;

    if(gender === "Male") {
        bmr = 10*weight + 6.25*(height*100) - 5*age + 5;
    } else {
        bmr = 10*weight + 6.25*(height*100) - 5*age - 161;
    }

    let calories = Math.round(bmr * activity);

    document.getElementById("bmi").innerText = "BMI: " + bmi;
    document.getElementById("category").innerText = "Category: " + category;
    document.getElementById("calories").innerText = "Daily Calories: " + calories + " kcal";

    // SAVE LOG
    let log = "BMI: " + bmi + " | " + category + " | Calories: " + calories;
    let logs = JSON.parse(localStorage.getItem("healthLogs")) || [];
    logs.push(log);
    localStorage.setItem("healthLogs", JSON.stringify(logs));

    showPage("result");
}

function showDiet() {
    let category = document.getElementById("category").innerText;

    let diet = "";

    if(category.includes("Underweight")) {
        diet = "Eat more calories: Milk, eggs, rice, chicken, nuts.";
    }
    else if(category.includes("Normal")) {
        diet = "Maintain balance: Fruits, vegetables, protein.";
    }
    else if(category.includes("Overweight")) {
        diet = "Reduce calories: Avoid junk, eat salads, do cardio.";
    }
    else {
        diet = "Strict diet: Low carbs, high protein, exercise daily.";
    }

    document.getElementById("dietText").innerText = diet;
    showPage("dietPage");
}

function loadLogs() {
    let list = document.getElementById("logs");
    list.innerHTML = "";

    let data = JSON.parse(localStorage.getItem("healthLogs")) || [];

    if(data.length === 0) {
        list.innerHTML = "<li>No logs yet</li>";
        return;
    }

    data.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
    });
}

function clearLogs() {
    localStorage.removeItem("healthLogs");
    loadLogs();
}