<template>
  <div>
    <el-container>
      <el-aside width="300px">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="date"
            label="日期"
            width="180"
          />
          <el-table-column
            prop="address"
            label="地址"
          />
        </el-table>
      </el-aside>
      <el-container>
        <el-header>
          <el-row>
            <el-alert
              title="警告"
              type="warning"
              effect="dark"
              :description="message"
            />
          </el-row>
        </el-header>
        <el-main>
          <baidu-map class="map" center="陕西" zoom="4">
            <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_STAR" color="red" size="BMAP_POINT_SIZE_SMALL" @click="clickHandler" />
          </baidu-map>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
  data() {
    return {
      id: '',
      data: [],
      message: '上海市普陀区金沙江路 1518 弄 发生地震',
      points: [],
      radio1: '全部',
      radio2: '最近24小时',
      tableData: [{
        date: '2016-05-02',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
    }
  },
  mounted() {
    this.$socket.emit('connect') // 在这里触发connect事件
    this.$socket.emit('my_event', 'helloworld')
    this.getData()
  },
  methods: {
    clickHandler(e) {
      localStorage.setItem('chosenPointX', e.point.lng)
      localStorage.setItem('chosenPointY', e.point.lat)
      this.$router.push('about')
    },
    getData() {
      var app = this
      const path = 'http://localhost:5000/getData'
      axios.get(path).then(res => {
        const points = []
        for (var i = 0; i < 10; i++) {
          const position = { lng: res.data.points[i][0], lat: res.data.points[i][1] }
          points.push(position)
        }
        app.points = points
      }).catch(error => {
        console.error(error)
      })
    }
  },
  sockets: {
    // 通信的name
    // 这里是监听connect事件
    connect: function() {
      this.id = this.$socket.id
      // alert('建立连接')
      this.$socket.emit('my_event', 9999)
    },

    disconnect: function() {
      alert('断开连接')
    },

    reconnect: function() {
      console.log('重新连接')
      this.$socket.emit('connect')
    },
    my_response: function(data) {
      console.log('接收数据', data)
      if (data.count) {
        this.data.push(data)
        this.getData()
      }
    }
  }
}
</script>
<style>
  .map {
    width: 100%;
    height: 500px;
  }
  .warning {
    background-color: red;
  }
</style>
