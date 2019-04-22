<template>
<v-layout>
  <v-flex lg8 offset-lg2 xs12>
    <v-card class="card--flex-toolbar">
      <v-toolbar card prominent>
        <v-toolbar-title class="body-2 grey--text">奇遇列表</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" label="宠物名称" single-line hide-details style="padding-top: 0" class="animated flipInX" v-show="searchVisible" transition="scale-transition" origin="center center" @keyup.native.enter="searchEnter(search)" v-on:input="searchEnter(search)"></v-text-field>
        <v-btn icon @click="searchVisible = !searchVisible">
          <v-icon>search</v-icon>
        </v-btn>
        <!-- model change -->
        <v-btn icon @click="dialog = true">
          <v-icon>{{ modelName }}</v-icon>
        </v-btn>
        <!-- model change dialog -->
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline">切换计算模式</v-card-title>
            <v-card-text>
              这个模式可以具体到次数和时间<br />
              <strong>更高</strong> <strong>更快</strong> <strong>更强</strong>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary darken-1" depressed @click="dialog = false">
                返回
              </v-btn>
              <v-btn color="green darken-1" depressed dark @click.stop="modelChange">
                确认
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn :loading="sync" :disabled="sync" icon @click="syncLoader = 'sync'">
          <v-icon>cached</v-icon>
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </template>
        </v-btn>
        <v-btn icon>
          <v-icon>apps</v-icon>
        </v-btn>
        <v-menu transition="slide-x-transition">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile v-for="(n,index) in menus" :key="index" @click="n.func">
              <v-list-tile-title v-text="n.text"></v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-divider></v-divider>
      <v-data-table :headers="headers" :items="JSON.stringify(searchQiyuList) != '[]' ? searchQiyuList : qiyuList " :loading="sync" :disable-initial-sort="true" :hide-actions="true" class="elevation-1">
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
          <tr :style="!props.item.pet_had ? '' :  'background: #f2f2f2; color: #ccc'" draggable="true" @dragenter="dragenter(props.item.pet_name)" @dragend="dragend(props.item.pet_name)" @dragstart="dragstart(props.item.pet_name)">
            <td>
              <b v-if="!props.item.pet_had" :style="'color:' + props.item.rare + ';font-size: 16px'">{{ props.item.pet_name }}</b>
              <del v-else :style="'font-size: 16px'">{{ props.item.pet_name }}</del>
            </td>
            <td class="text-xs-right">{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.map }}</td>
            <td class="text-xs-right">{{ props.item.start_npc }}</td>
            <td class="text-xs-right">{{ props.item.coordinate }}</td>
            <td class="text-xs-right">
              <v-btn small color="primary" @click="petFinish(props.item)" :disabled="props.item.pet_had ? true : false">摸完了!</v-btn>
              <v-btn small color="error" @click="petGet(props.item)" :disabled="props.item.pet_had ? true : false">出了!</v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-flex>
</v-layout>
</template>

<script>
const Fuse = require('fuse.js')
import DB from '~/assets/js/db.js'
export default {
  layout: 'views/default',
  data() {
    return {
      loading: false,
      logined: false,
      search: '',
      searchVisible: false,
      selected: [],
      modelName: 'timer',
      dialog: false,
      counter: false,
      syncLoader: null,
      sync: false,
      qiyuList: [],
      searchQiyuList: [],
      headers: [{
          text: '宠物名称',
          align: 'left',
          value: 'pet_name'
        },
        {
          text: '奇遇名称',
          align: 'right',
          value: 'name'
        },
        {
          text: '地图',
          align: 'right',
          value: 'map'
        },
        {
          text: '起始NPC',
          align: 'right',
          value: 'start_npc'
        },
        {
          text: '坐标',
          align: 'right',
          value: 'x,y'
        },
        {
          text: '操作',
          align: 'right',
          value: 'opt'
        },
      ],
      menus: [{
          text: '显示全部',
          func: () => {}
        },
        {
          text: '只显示已出',
          func: () => {}
        },
        {
          text: '全部完成',
          func: () => this.qiyuListHandle(true)
        },
        {
          text: '全部清除',
          func: () => this.qiyuListHandle(false)
        },
        {
          text: '重置清单',
          func: () => {}
        },
        {
          text: '帮助说明',
          func: () => {}
        },
      ]
    }
  },
  watch: {
    syncLoader() {
      DB.addItemToDB();
      if(!this.logined){
        this.$store.commit('snackbar/Message', {
          type: 'warning',
          message: '请先登录'
        })
        this.$store.commit('drawerRight', true)
        this.syncLoader = null
        return
      }
      const l = this.syncLoader
      this[l] = !this[l]

      setTimeout(() => {
        this[l] = false
        this.$store.commit('snackbar/Message', {
          type: 'success',
          message: '同步成功'
        })
      }, 3000)

      this.syncLoader = null
    },
    "$store.state.user": {
      handler: function(){
        this.logined = true
      },
      deep: true
    }
  },
  methods: {
    qiyuListHandle(bool){
      this.qiyuList.map(item => {
        item.pet_had = bool
        DB.updateDataFromDB(item)
      })
    },
    modelChange() {
      if (this.modelName == 'timer') {
        this.modelName = 'web_asset'
      } else {
        this.modelName = 'timer'
      }
      this.dialog = false
    },
    dragenter(index) {
      let dataIndex = this.qiyuList.findIndex(function (qiyu) {
        return qiyu.pet_name == index
      })
      let old = this.qiyuList.map(item => {
        return item
      })
      this.qiyuList.splice(this.dragIndex, 1)
      this.qiyuList.splice(dataIndex, 0, old[this.dragIndex])
      this.dragIndex = dataIndex
      // 因为实现拖动中排序，所以暂时不需要防抖处理
    },
    dragend(index) {
      this.qiyuList.map((item, index) => {
        item.id = index + 1
        DB.updateDataFromDB(item)
        return
      })
    },
    dragstart(index) {
      this.dragIndex = this.qiyuList.findIndex(function (qiyu) {
        return qiyu.pet_name == index
      })
    },
    searchEnter(keyword) {
      var options = {
        keys: ['pet_name', 'map']
      }
      var fuse = new Fuse(this.qiyuList, options)
      this.searchQiyuList = fuse.search(keyword)
    },
    petCommonFun(item){
      item.pet_had = true
      this.qiyuList.map(i => {
        if(i.id == item.id){
          i.pet_had = true
        }
      })
      DB.updateDataFromDB(item)
    },
    // get new pet!
    petGet(item){
      this.petCommonFun(item)
      this.$store.commit('snackbar/Message', { type: 'success', message: '账号宠物数据已更新' })
    },
    // finish todo
    petFinish(item){
      this.petCommonFun(item)
    }
  },
  mounted() {
    // set store state to local DB
    DB.init = {
      dbName: 'qiyu',
      index: [
        {name: 'pet_name', unique: false},
        {name: 'start_npc', unique: false},
        {name: 'coordinate', unique: false},
        {name: 'name', unique: false},
        {name: 'rare', unique: false},
        {name: 'pet_had', unique: false},
      ],
      storeName: 'list'
    }
    this.$store.state.qiyu.list.map(item => {
      DB.addItemToDB(item)
    })
    DB.getAllDataFromDB(this.qiyuList)

    if( !this.$store.state.user || JSON.stringify(this.$store.state.user) == '{}'){
      this.logined = false
    }else{
      this.logined = true
    }
  },
  head: {
    title: '剑网3奇遇清单'
  }
}
</script>

<style scoped>
@import url('~/assets/style/animate.styl');
</style>
