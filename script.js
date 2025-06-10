
const slotsContainer = document.getElementById("slots");
const mallName = document.getElementById("mallName");
const bookingForm = document.getElementById("bookingForm");
const selectedSlotSpan = document.getElementById("selectedSlot");
let currentSlot = null;
let currentMall = localStorage.getItem("selectedMall");

function getMallData() {
    const data = localStorage.getItem("mallData");
    return data ? JSON.parse(data) : {};
}

function saveMallData(data) {
    localStorage.setItem("mallData", JSON.stringify(data));
}

function loadSlots() {
    if (!currentMall) {
        alert("No mall selected.");
        window.location.href = "index.html";
        return;
    }
    mallName.textContent = currentMall + " - Parking Slots";
    slotsContainer.innerHTML = "";

    const mallData = getMallData();
    const slots = mallData[currentMall] || {};

    for (let i = 1; i <= 20; i++) {
        const slotId = "A" + i;
        const isBooked = slots[slotId];
        const div = document.createElement("div");
        div.className = "slot" + (isBooked ? " booked" : "");
        div.textContent = slotId;
        if (!isBooked) {
            div.onclick = () => openForm(slotId);
        }
        slotsContainer.appendChild(div);
    }
}

function openForm(slotId) {
    currentSlot = slotId;
    selectedSlotSpan.textContent = slotId;
    bookingForm.classList.remove("hidden");
}

function closeForm() {
    bookingForm.classList.add("hidden");
    document.getElementById("name").value = "";
    document.getElementById("vehicle").value = "";
}

function confirmBooking() {
    const name = document.getElementById("name").value.trim();
    const vehicle = document.getElementById("vehicle").value.trim();
    if (name && vehicle && currentSlot) {
        const mallData = getMallData();
        mallData[currentMall] = mallData[currentMall] || {};
        mallData[currentMall][currentSlot] = { name, vehicle };
        saveMallData(mallData);
        alert("Booking Confirmed for " + currentSlot + "\nName: " + name + "\nVehicle: " + vehicle);
        closeForm();
        loadSlots();
    } else {
        alert("Please fill in all details.");
    }
}

window.onload = loadSlots;
