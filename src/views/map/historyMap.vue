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
            <el-col><div class="grid-content bg-purple-dark" /> 震级
              <el-radio-group v-model="radio1">
                <el-radio-button label="全部" />
                <el-radio-button label="3级以下" />
                <el-radio-button label="3-5级" />
                <el-radio-button label="5-7级" />
                <el-radio-button label="7级以上" />
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14" gutter="0"><div class="grid-content bg-purple-dark" /> 时间
              <el-radio-group v-model="radio2">
                <el-radio-button label="最近24小时" />
                <el-radio-button label="最近一周" />
                <el-radio-button label="最近一个月" />
                <el-radio-button label="最近一年" />
              </el-radio-group>
            </el-col>
            <el-col :span="4"><div class="grid-content bg-purple-dark" />
              <el-date-picker
                v-model="value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-col>
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
    // this.addPoints()
    // this.getData()
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
  }
}
</script>
<style>
  .map {
    width: 100%;
    height: 500px;
  }
</style>
