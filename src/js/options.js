(function () {
    importJsonBtnEvent();
    exportJsonBtnEvet();

})();


function importJsonBtnEvent() {
    document.getElementById('importJsonOpen').addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('importRow').style.display = 'block';
    });

    document.getElementById('importJson').addEventListener('click', function (e) {
        e.preventDefault();

        var file = document.getElementById("importFileInput").files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (e) {

            console.log('res : ', JSON.parse(e.target.result));

            chrome.storage.local.set({'json': JSON.parse(e.target.result)});
        };
    });
}



function showMessage(message) {
    var x = document.getElementById("snackbar");
    x.innerText = message;
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}