<template>
    <div class="container">
        <div class="row mt-3">
            <div class="col">
                <div class="btn-group float-right pb-1">
                    <button class="btn btn-secondary btn-sm" @click="clearData()">CLEAR</button>
                    <button class="btn btn-secondary btn-sm" @click="importJsonModalOpen($event)">IMPORT</button>
                    <button class="btn btn-secondary btn-sm" @click="exportJson($event)">EXPORT</button>
                </div>

            </div>
        </div>
        <div class="row">
            <div class="col">

                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Chrome Extension : shortcut-url</h5>
<!--                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>-->

                        <table class="table table-sm table-fixed">
                            <thead>
                            <tr>
                                <th class="col-sm-3" style="text-align: center;">Name</th>
                                <th class="col-sm-3" style="text-align: center;">Shortcut</th>
                                <th class="col-sm-4" style="text-align: center;">URL</th>
                                <th class="col-sm-2" style="text-align: center;">Functions</th>
                            </tr>
                            </thead>
                            <draggable id="tableResult" element="tbody" v-model="aliasList">
                                <tr class="dragndrop" v-for="item in aliasList">
                                    <td class="col-sm-3" style="text-align: center;">
                                        <input type="text" class="form-control form-control-sm" name="name" :value="item.name"/>
                                    </td>
                                    <td class="col-sm-3" style="text-align: center;">
                                        <input type="text" class="form-control form-control-sm" name="alias" :value="item.alias"/>
                                    </td>
                                    <td class="col-sm-4">
                                        <input type="text" class="form-control form-control-sm" name="url" :value="item.url"/>
                                    </td>
                                    <td class="col-sm-2" style="text-align: center;">
                                        <button class="btn btn-warning btn-sm" @click="deleteRow($event)">DELETE</button>
                                        <button class="btn btn-warning btn-sm" @click="goUrl($event)">Go</button>
                                    </td>
                                </tr>
                            </draggable>
                        </table>

                        <div class="float-right pb-1">
                            <button class="btn btn-primary btn-sm" @click="newLine()">New Line</button>
                            <button class="btn btn-primary btn-sm" @click="saveData()">SAVE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="importModal" tabindex="-1" role="dialog" aria-labelledby="importModalLabel"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Import</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <input type="file" class="form-control form-control-file" id="importFileInput"/>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="importJson($event)">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import commonUtil from '@/common/js/commonUtil';
    import draggable from "vuedraggable";

    export default {
        name: "App",
        components: {
            draggable
        },
        data() {
            return {
                aliasList: []
            }
        },
        mounted() {
            this.initUrlList();
        },
        methods: {
            initUrlList() {
                commonUtil
                    .getLocalItem('json')
                    .then((res) => {
                        if (res.json) {
                            this.aliasList = res.json;
                        } else {
                            this.aliasList.push({});
                        }
                    });
            },
            newLine() {
                this.aliasList.push({});
            },
            clearData() {

                if (confirm('저장된 데이터를 전체 삭제하시겠습니까?')) {
                    chrome.storage.local.clear(function () {
                        const error = chrome.runtime.lastError;
                        if (error) {
                            console.error(error);
                        }
                    });

                    window.location.reload();
                }

            },
            saveData() {

                const resultCount = document.getElementById('tableResult').getElementsByTagName('tr').length;

                const urlArr = document.getElementsByName('url');
                const nameArr = document.getElementsByName('name');
                const aliasArr = document.getElementsByName('alias');

                const aliasUrlArr = [];

                for (let i = 0; i < resultCount; i++) {
                    const url = urlArr[i].value;
                    const name = nameArr[i].value;
                    const alias = aliasArr[i].value;

                    if (!url || !name || !alias) {
                        alert("필수 값을 입력해주세요.");
                        return;
                    }

                    aliasUrlArr.push({url: url, name: name, alias: alias});
                }

                alert('Success save');

                chrome.storage.local.set({'json': aliasUrlArr});
            },
            exportJson(e) {
                e.preventDefault();

                commonUtil.getLocalItem('json')
                    .then(function (res) {

                        if (!res.json) {
                            alert('등록된 데이터가 없습니다.');
                            return;
                        }

                        const fileName = "shortcut_url_" + new Date().getTime() + ".json";
                        const result = JSON.stringify(res.json);

                        // Save as file
                        const url = 'data:application/json;base64,' + btoa(result);
                        chrome.downloads.download({
                            url: url,
                            filename: fileName
                        });
                    });
            },
            deleteRow(e) {
                const resultEle = document.getElementById('tableResult');
                resultEle.removeChild(e.currentTarget.parentNode.parentNode);

                alert('Delete Line');
            },
            goUrl(e) {
                const url = e.currentTarget.parentNode.parentNode.querySelector("[name='url']").value;
                if (!url) {
                    alert('Url Empty!');
                    return;
                }

                chrome.tabs.create({url: url}); //new Tabs
            },
            importJsonModalOpen(e) {
                e.preventDefault();
                $("#importModal").modal({backdrop: 'static'});
            },
            importJson(e) {
                e.preventDefault();

                const file = document.getElementById("importFileInput").files[0];
                const reader = new FileReader();
                reader.readAsText(file);
                reader.onload = function (e) {
                    chrome.storage.local.set({'json': JSON.parse(e.target.result)});
                    window.location.reload();
                };

                $("#importModal").modal('hide');

            }
        }
    };
</script>

<style scoped>
    .table-fixed {
        width: 100%;
        background-color: #f3f3f3;
    }

    .table-fixed tbody {
        height: 600px;
        overflow-y: auto;
        width: 100%;
    }

    .table-fixed thead, tbody, tr, td, th {
        display: block;
    }

    .table-fixed tbody td {
        float: left;
    }

    .table-fixed thead tr th {
        float: left;
    }
</style>