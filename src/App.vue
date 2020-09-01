
<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputVal" @change="handleInputChanged" />
    <a-button type="primary" @click="addItem">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e)=>{cbChanged(e,item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="deleteItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDone}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey === '1' ? 'primary':'default'" @click="changeList('1')">全部</a-button>
          <a-button :type="viewKey === '2' ? 'primary':'default'" @click="changeList('2')">未完成</a-button>
          <a-button :type="viewKey === '3' ? 'primary':'default'" @click="changeList('3')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="deleteAll">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {

    }
  },
  created () {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['list', 'inputVal', 'viewKey']),
    ...mapGetters(['unDone', 'infoList'])
  },
  methods: {
    handleInputChanged (e) {
      this.$store.commit('setInputVal', e.target.value)
    },
    addItem () {
      if (this.inputVal.trim().lenght <= 0) {
        return this.$message.warning('请输入!')
      }
      this.$store.commit('addItem')
    },
    deleteItem (id) {
      this.$store.commit('deleteItem', id)
    },
    cbChanged (e, id) {
      const params = {
        id: id,
        checked: e.target.checked
      }
      this.$store.commit('c', params)
    },
    deleteAll () {
      this.$store.commit('deleteAll')
    },
    changeList (key) {
      this.$store.commit('changeList', key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
  margin: 0 auto;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
