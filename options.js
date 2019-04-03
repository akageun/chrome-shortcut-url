(function () {
    addSaveBtnEvent();

})();

function addSaveBtnEvent() {
    document.getElementById('saveBtn')
        .addEventListener('click', function (e) {
            e.preventDefault();

            var resultCount = document.getElementById('tableResult').getElementsByTagName('tr').length;

            var urlArr = document.getElementsByName('url');
            var nameArr = document.getElementsByName('name');
            var aliasArr = document.getElementsByName('alias');

            var aliasUrlArr = [];

            for (var i = 0; i < resultCount; i++) {
                var url = urlArr[i].value;
                var name = nameArr[i].value;
                var alias = aliasArr[i].value;

                if (!url || !name || !alias) {
                    alert("필수 값을 입력해주세요.");
                    return;
                }

                aliasUrlArr.push({url: url, name: name, alias: alias});
            }

            chrome.storage.local.set({'json': aliasUrlArr});


        });
}

