// frontend/script.js

let messes = [];

// Fetch messes from backend
async function fetchMesses() {
    try {
        let res = await fetch("http://localhost:3000/messes");
        messes = await res.json();
        display(messes);
    } catch (err) {
        console.error("Error fetching data", err);
    }
}

// Display mess cards
function display(data) {
    let list = document.getElementById("messList");
    list.innerHTML = "";

    data.forEach(m => {
        list.innerHTML += `
        <div class="mess-card">
            <img src="${m.img}" alt="${m.name}" class="mess-img">
            <h3>${m.name}</h3>
            <p>📍 ${m.city}</p>
            <p>💰 ₹${m.price}/month</p>
            <p>⭐ ${m.rating} / 5</p>
            <p>${m.description}</p>
            <p>📞 ${m.contact}</p>
            <span class="badge ${m.type === "Veg" ? "veg" : "nonveg"}">${m.type}</span>
        </div>`;
    });
}

// Filter messes by city and type
function filterMess() {
    let city = document.getElementById("citySearch").value.toLowerCase();
    let type = document.getElementById("typeFilter").value;

    let filtered = messes.filter(m =>
        m.city.toLowerCase().includes(city) &&
        (type === "" || m.type === type)
    );

    display(filtered);
}

// Smooth scroll to explore section
function scrollToExplore() {
    document.getElementById("explore").scrollIntoView({ behavior: "smooth" });
}

// Initial fetch
fetchMesses();