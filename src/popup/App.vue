<template>
    <div class="container-fluid">

        <div class="row mt-2">
            <div class="col">
                <div class="float-right">
                    <button class="btn btn-info btn-sm" @click="openOptionPage($event)">Open Option Page</button>
                </div>
            </div>
        </div>
        <div class="row no-gutters mt-2">
            <table class="table table-sm table-fixed table-bordered">
                <thead>
                <tr>
                    <th class="col-sm-3">
                        NAME
                    </th>
                    <th class="col-sm-3">
                        ALIAS
                    </th>
                    <th class="col-sm-6">
                        URL
                    </th>
                </tr>
                </thead>
                <tbody style="max-height: 600px; overflow-y: auto;">
                <tr v-for="item in aliasList">
                    <td class="col-sm-3">{{item.name}}</td>
                    <td class="col-sm-3">{{item.alias}}</td>
                    <td class="col-sm-6">
                        <a @click="goUrl($event, item.url)" href="#">{{item.url}}</a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import commonUtil from '@/common/js/commonUtil';

    export default {
        data() {
            return {
                aliasList: []
            }
        },
        mounted() {
            this.initUrlList();
        },
        methods: {
            goUrl(e, url) {
                e.preventDefault();
                chrome.tabs.create({url});
            },
            openOptionPage(e) {
                e.preventDefault();

                const optionsPageURL = chrome.extension.getURL('options/options.html');
                chrome.tabs.create({url: optionsPageURL});
            },
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
        }
    }
</script>

<style>
    body {
        min-width: 600px; /* your desired width */
        max-width: 100%;
        min-height: 400px;
        max-height: 100%;
        position: relative;
        vertical-align: middle;
    }

    .table-fixed {
        width: 100%;
        background-color: #f3f3f3;
    }

    .table-fixed tbody {
        height: 400px;
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
