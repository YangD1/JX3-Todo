<template>
  <v-layout>
    <v-flex lg6 offset-lg3 xs12 >
      <v-card class="card--flex-toolbar">
        <v-toolbar card prominent>
          <v-toolbar-title class="body-2 grey--text">奇遇列表</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            label="宠物名称"
            single-line
            hide-details
            style="padding-top: 0"
            class="animated flipInX"
            v-show="searchVisible"
            transition="scale-transition"
            origin="center center"
          ></v-text-field>
          <v-btn icon @click="searchVisible = !searchVisible">
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>apps</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-data-table
          :headers="headers"
          :items="$store.state.qiyu.qiyuList"
          :loading="loading"
          :disable-initial-sort="true"
          :hide-actions="true"
          :select-all="true"
          class="elevation-1"
        >
          <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
          <template v-slot:items="props">
            <td>
              <v-checkbox
                :input-value="props.selected"
                primary
                hide-details
              ></v-checkbox>
            </td>
            <td><b :style="'color:' + props.item.rare + ';font-size: 16px'">{{ props.item.pet_name }}</b></td>
            <td class="text-xs-right">{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.map }}</td>
            <td class="text-xs-right">{{ props.item.start_npc }}</td>
            <td class="text-xs-right">{{ props.item.coordinate }}</td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  layout: 'views/default',
  data(){
    return {
      loading: false,
      search: '',
      searchVisible: false,
      selected: [],
      headers: [
        { text: '宠物名称', align: 'left',  value: 'pet_name' },
        { text: '奇遇名称', align: 'right', value: 'name'},
        { text: '地图', align: 'right', value: 'map' },
        { text: '起始NPC', align: 'right', value: 'start_npc' },
        { text: '坐标', align: 'right', value: 'x,y' },
      ],
    }
  }
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
</style>
