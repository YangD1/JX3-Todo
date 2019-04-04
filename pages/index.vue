<template>
<v-layout>
  <v-flex lg6 offset-lg3 xs12>
    <v-card class="card--flex-toolbar">
      <v-toolbar card prominent>
        <v-toolbar-title class="body-2 grey--text">奇遇列表</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" label="宠物名称" single-line hide-details style="padding-top: 0" class="animated flipInX" v-show="searchVisible" transition="scale-transition" origin="center center"></v-text-field>
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
              这个模式可以具体到次数和时间
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
        <v-btn
          :loading="sync"
          :disabled="sync"
          icon
          @click="syncLoader = 'sync'"
        >
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
      <v-data-table :headers="headers" :items="$store.state.qiyu.qiyuList" :loading="loading" :disable-initial-sort="true" :hide-actions="true" class="elevation-1">
        <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
        <template v-slot:items="props">
          <tr :style="!props.item.pet_had ? '' :  'background: #f2f2f2; color: #ccc'" draggable="true">
            <td>
              <b v-if="!props.item.pet_had" :style="'color:' + props.item.rare + ';font-size: 16px'">{{ props.item.pet_name }}</b>
              <del v-else :style="'font-size: 16px'">{{ props.item.pet_name }}</del>
            </td>
            <td class="text-xs-right">{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.map }}</td>
            <td class="text-xs-right">{{ props.item.start_npc }}</td>
            <td class="text-xs-right">{{ props.item.coordinate }}</td>
            <td class="text-xs-right">
              <v-btn small color="primary" :disabled="props.item.pet_had ? true : false">摸完了!</v-btn>
              <v-btn small color="error" :disabled="props.item.pet_had ? true : false">出了!</v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-flex>
</v-layout>
</template>

<script>
export default {
  layout: 'views/default',
  data() {
    return {
      loading: false,
      search: '',
      searchVisible: false,
      selected: [],
      modelName: 'timer',
      dialog: false,
      counter: false,
      syncLoader: null,
      sync: false,
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
          func: () => {
            this.toggleAll()
          }
        },
        {
          text: '全部清除',
          func: () => {}
        },
      ]
    }
  },
  watch: {
    syncLoader () {
      const l = this.syncLoader
      this[l] = !this[l]

      setTimeout(() => {
        this[l] = false
        this.$store.commit('snackbar/Message', { type: 'success', message: '同步成功' })
      }, 3000)


      this.syncLoader = null
    }
  },
  methods: {
    toggleAll() {
      if (this.selected.length) {
        this.selected = []
        console.log(this.selected)
      } else {
        this.selected = this.$store.state.qiyu.qiyuList.slice()
        console.log(this.selected)
      }
    },
    modelChange() {
      if (this.modelName == 'timer') {
        this.modelName = 'web_asset'
      } else {
        this.modelName = 'timer'
      }
      this.dialog = false
    }
  },
}
</script>

<style scoped>
@-webkit-keyframes flipInX {
  from {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  60% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }

  80% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
  }
}

@keyframes flipInX {
  from {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }

  60% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }

  80% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }

  to {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
  }
}

.flipInX {
  -webkit-backface-visibility: visible !important;
  backface-visibility: visible !important;
  -webkit-animation-name: flipInX;
  animation-name: flipInX;
}

.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
