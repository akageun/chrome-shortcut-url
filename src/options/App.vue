<template>
    <div class="container mt-2">

        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Chrome Extension : shortcut-url</h5>
                        <p class="card-text">With the this chrome extension, you can quick URL searches with shortcuts.</p>

                        <div class="btn-toolbar justify-content-between mb-1" role="toolbar">
                            <!--                            <div class="input-group input-group-sm">-->
                            <!--                                <div class="input-group-prepend">-->
                            <!--                                    <div class="input-group-text">@</div>-->
                            <!--                                </div>-->
                            <!--                                <input type="text" class="form-control form-control-sm" placeholder="Search Text!" v-model="searchText">-->
                            <!--                            </div>-->

                            <div>
                                <div class="btn-group btn-group-sm" role="group" aria-label="First group">
                                    <button class="btn btn-secondary btn-sm" @click="clearData()">CLEAR</button>
                                    <button class="btn btn-secondary btn-sm" @click="importJsonModalOpen($event)">IMPORT</button>
                                    <button class="btn btn-secondary btn-sm" @click="exportJson($event)">EXPORT</button>
                                </div>
                                <button class="btn btn-primary btn-sm" @click="saveData()">SAVE</button>
                            </div>
                        </div>

                        <div class="table-responsive">
                            <table class="table table-sm table-bordered">
                                <thead>
                                <tr>
                                    <th style="text-align: center;">Name</th>
                                    <th style="text-align: center;">Shortcut</th>
                                    <th style="text-align: center;">URL</th>
                                    <th style="text-align: center;">Functions</th>
                                </tr>
                                </thead>
                                <draggable id="tableResult" tag="tbody" v-model="aliasList" draggable=".dragndrop">
                                    <tr class="dragndrop" v-for="(item, key) in aliasList">

                                        <td style="text-align: center;">
                                            <input type="text" class="form-control form-control-sm" name="name" v-model="item.name"/>
                                        </td>
                                        <td style="text-align: center;">
                                            <input type="text" class="form-control form-control-sm" name="alias" v-model="item.alias"/>
                                        </td>
                                        <td>
                                            <input type="text" class="form-control form-control-sm" name="url" v-model="item.url"/>
                                        </td>
                                        <td style="text-align: center;">
                                            <button class="btn btn-warning btn-sm" @click="deleteRow($event, key)">DELETE</button>
                                            <button class="btn btn-warning btn-sm" @click="goCopy($event,item)">Copy</button>
                                            <button class="btn btn-warning btn-sm" @click="goUrl($event, item.url)">Go</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="4">
                                            <button class="btn btn-primary btn-block" @click="newLine()">New Line</button>
                                        </td>
                                    </tr>
                                </draggable>

                            </table>
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
    import commonUtil from 'SrcRoot/common/js/commonUtil';
    import draggable from "vuedraggable";

    export default {
        name: "App",
        components: {
            draggable
        },
        data() {
            return {
                searchText: '',
                aliasList: []
            }
        },
        mounted() {
            this.initUrlList();
        },
        methods: {
            initUrlList() {
                commonUtil.getAliasList(this.searchText)
                    .then((res) => {
                        if (res) {
                            this.aliasList = res;
                        } else {
                            this.aliasList.push({});
                        }
                    });
            },

            newLine() {
                this.aliasList.push({});
            },
            clearData() {

                if (confirm('저장된 데이터를 전체 삭제하시겠습니까?') === false) {
                    return;
                }

                chrome.storage.local.clear(() => {
                    const error = chrome.runtime.lastError;
                    if (error) {
                        console.error(error);
                    }
                });

                window.location.reload();

            },

            saveData() {
                for (const json of this.aliasList) {
                    const url = json.url;
                    const name = json.name;
                    const alias = json.alias;

                    if (!url || !name || !alias) {
                        alert("필수 값을 입력해주세요.");
                        return;
                    }
                }

                chrome.storage.local.set({'json': this.aliasList});

                alert('Success save');
            },

            exportJson(e) {
                e.preventDefault();

                commonUtil.getLocalItem('json')
                    .then((res) => {

                        if (!res.json) {
                            alert('등록된 데이터가 없습니다.');
                            return;
                        }

                        const fileName = `shortcut_url_${new Date().getTime()}.json`;
                        const result = JSON.stringify(res.json);

                        // Save as file
                        const url = `data:application/json;base64,${btoa(result)}`;
                        chrome.downloads.download({
                            url: url,
                            filename: fileName
                        });
                    });
            },
            goCopy(event, item) {
                event.preventDefault();
                this.aliasList.push({url: item.url, name: item.name, alias: item.alias});
            },

            deleteRow(e, listIndex) {
                const resultEle = document.getElementById('tableResult');
                resultEle.removeChild(e.currentTarget.parentNode.parentNode);

                this.aliasList.splice(listIndex, 1);
            },
            goUrl(e, url) {
                if (!url) {
                    alert('Url Empty!');
                    return;
                }

                chrome.tabs.create({url: url}); //new Tabs
            },

            importJsonModalOpen(e) {
                e.preventDefault();
                $("#importModal").modal({
                    backdrop: 'static'
                });
            },

            importJson(e) {
                e.preventDefault();

                const file = document.getElementById("importFileInput").files[0];
                const reader = new FileReader();
                reader.readAsText(file);
                reader.onload = (e) => {
                    chrome.storage.local.set({'json': JSON.parse(e.target.result)});
                    window.location.reload();
                };

                $("#importModal").modal('hide');

            }
        }
    }
    ;
</script>

<style scoped>

</style>