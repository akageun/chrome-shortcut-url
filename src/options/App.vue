<template>
  <div class="container">
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-1 mb-3 border-bottom">
      <h1 class="h2">Chrome Extension : shortcut-url</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button type="button" class="btn btn-sm btn-outline-secondary" @click="newLine()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-file-plus-fill" viewBox="0 0 16 16">
              <path
                  d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z"/>
            </svg>
            NewLine
          </button>
          <button type="button" class="btn btn-sm btn-outline-secondary" @click="saveData()">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save-fill"
                 viewBox="0 0 16 16">
              <path
                  d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v7.793L4.854 6.646a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l3.5-3.5a.5.5 0 0 0-.708-.708L8.5 9.293V1.5z"/>
            </svg>
            SAVE
          </button>

        </div>
        <div class="dropdown">
          <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                  data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-wide"
                 viewBox="0 0 16 16">
              <path
                  d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 1 0-9.995 4.998 4.998 0 0 1 0 9.996z"/>
            </svg>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <button class="dropdown-item" @click="showModalFileImport = true">Import</button>
            </li>
            <li>
              <button class="dropdown-item" @click="exportJson($event)">Export</button>
            </li>
            <li class="dropdown-divider"></li>
            <li>
              <button class="dropdown-item" @click="clearData()">Clear</button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <p>
      With the this chrome extension, you can quick URL searches with shortcuts.
    </p>

    <div class="row">
      <div class="col">
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="searchInput" placeholder="Enter Search Text"
                 v-model="searchText" @keyup.enter="findData()">
          <label for="searchInput">Search Text</label>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <draggable id="tableResult" tag="ul" class="list-group" v-model="aliasList" draggable=".dragndrop">
          <li class="list-group-item dragndrop" v-for="(item, key) in aliasList">
            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">{{item.count}}</span>
              <input type="text" aria-label="Name" class="form-control form-control-sm" placeholder="Name"
                     v-model="item.name">
              <input type="text" aria-label="Shortcut" class="form-control form-control-sm" placeholder="Shortcut alias"
                     v-model="item.alias">
              <input type="text" aria-label="URL" class="form-control form-control-sm" placeholder="URL"
                     v-model="item.url">
              <button class="btn btn-outline-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"
                      aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools"
                     viewBox="0 0 16 16">
                  <path
                      d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.356 3.356a1 1 0 0 0 1.414 0l1.586-1.586a1 1 0 0 0 0-1.414l-3.356-3.356a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0zm9.646 10.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708zM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11z"/>
                </svg>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <button class="dropdown-item" @click="deleteRow($event, key)">Delete</button>
                </li>
                <li>
                  <button class="dropdown-item" @click="goCopy($event,item)">Copy</button>
                </li>
                <li>
                  <button class="dropdown-item" @click="goUrl($event, item.url)">GoLink</button>
                </li>
              </ul>
            </div>
          </li>
        </draggable>
      </div>
    </div>


    <bs5-modal id="fileImport"
               title="File Import"
               modalSizeClasses="modal-lg"
               :backdropClose="false"
               v-if="showModalFileImport"
               @close="showModalFileImport = false"
    >

      <div class="modal-body">
        <div class="form-group">
          <input type="file" class="form-control form-control-file" id="importFileInput"/>
        </div>


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="showModalFileImport = false">
          Close
        </button>
        <button type="button" class="btn btn-primary" @click="importJson($event)">Import File</button>
      </div>


    </bs5-modal>
  </div>
</template>

<script>
import UrlManager from '@/util/urlManager'
import draggable from "vuedraggable";

export default {
  components: {
    draggable
  },
  data() {
    return {
      importFileInput: null,
      searchText: '',
      aliasList: [],
      showModalFileImport: false,
    }
  },
  async mounted() {
    await this.findData();
  },
  methods: {
    newLine() {
      this.aliasList.unshift({});
    },
    async findData() {
      this.aliasList = await UrlManager.findList(this.searchText);
    },
    async saveData() {
      await UrlManager.saveAliasList(this.aliasList);
      await alert('Success save');
    },
    async importJson(e) {
      e.preventDefault();

      const file = document.getElementById("importFileInput").files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = async (e) => {
        const aliasList = JSON.parse(e.target.result);

        await UrlManager.saveAliasList(aliasList);

        await this.findData();
        this.showModalFileImport = false;
      };

    },
    async exportJson(e) {
      e.preventDefault();

      const res = await UrlManager.findList();
      if (!res) {
        alert('등록된 데이터가 없습니다.');
        return;
      }

      const fileName = `shortcut_url_${new Date().getTime()}.json`;
      const result = JSON.stringify(res);

      // Save as file
      const url = `data:application/json;base64,${btoa(result)}`;
      chrome.downloads.download({
        url: url,
        filename: fileName
      });
    },
    goCopy(event, item) {
      event.preventDefault();
      this.aliasList.unshift({url: item.url, name: item.name, alias: item.alias});
    },

    deleteRow(e, listIndex) {
      this.aliasList.splice(listIndex, 1);
    },
    goUrl(e, url) {
      if (!url) {
        alert('Url Empty!');
        return;
      }

      chrome.tabs.create({url: url}); //new Tabs
    },
    async clearData() {
      if (confirm('저장된 데이터를 전체 삭제하시겠습니까?') === false) {
        return;
      }

      await UrlManager.clearAliasList();
      await this.findData();
    },
  }
}
</script>

<style>

</style>
