<template>
  <v-layout>
    <v-flex lg6 offset-lg3 xs12 >
      <v-card class="card--flex-toolbar">
        <v-toolbar card prominent>
          <v-toolbar-title class="body-2 grey--text">Title</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
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
            <td><b :style="'color:' + props.item.rare">{{ props.item.pet_name }}</b></td>
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
