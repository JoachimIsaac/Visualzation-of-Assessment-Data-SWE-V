
const saveButton = document.getElementById('data-input-button');
const closeInputModalButton = document.querySelector("#dataInputModal > div > div > div.modal-footer > button.btn.btn-secondary");
const dashboardLogo = document.getElementById('dashboard-logo');


function clearDashboardLogo() {
    dashboardLogo.style.display = "none";
}


function closeInputModal() {
    closeInputModalButton.click();
}


saveButton.addEventListener("click", () => {
    clearDashboardLogo();
    closeInputModal();
});