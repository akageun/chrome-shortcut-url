(function () {
    addSaveBtnEvent();

})();

function addSaveBtnEvent() {
    document.getElementById('saveBtn')
        .addEventListener('click', function (e) {
            e.preventDefault();
        });
}

