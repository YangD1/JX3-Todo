<template>
<v-form
    ref="form"
    v-model="valid"
    style="padding: 10px;"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :counter="6"
      :rules="nameRules"
      label="角色"
      required
    ></v-text-field>

    <v-text-field
      v-model="serverDomain"
      :rules="serverDomainRules"
      label="区服"
      required
    ></v-text-field>

    <v-select
      v-model="select"
      :items="$store.state.menpai.list"
      :rules="[v => !!v || '请选择门派']"
      label="门派"
      required
    ></v-select>

    <div class="text-xs-center">
      <v-btn
        color = "primary"
        dark
        round
      >
        提交
      </v-btn>
    </div>

  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || '请填写角色名称',
      v => (v && v.length <= 6) || '请填写合理的角色名称'
    ],
    serverDomain: '',
    serverDomainRules: [
      v => !!v || '请填写区服名称',
      v => (v && v.length <= 4) || '请填写合理的区服名称'
    ],
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ],
    checkbox: false
  }),

  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
  }
}
</script>

<style>

</style>
