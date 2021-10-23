/* eslint-disable */
// eslint-disable-next-line
<template>
  <div class="danhsach">
    <h2>{{ title }}</h2>
    <table class="table">
      <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>email</th>
        <th>ho</th>
        <th>lop</th>
        <th v-if="hocluc != 0">hocluc</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in data" v-bind:key="index">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.email}}</td>
        <td>{{item.ho}}</td>
        <td>{{item.lop}}</td>
        <td>{{item.hocluc.name}}</td>
      </tr>
      </tbody>
    </table>
    <div>
      <button @click="previousPage()">Pevious page</button>
      <button @click="nextPage()">Next page</button>
      <button @click="upHocluc()">Up hoc luc</button>
      <button @click="downHocluc()">Down hoc luc</button>
      <button @click="showAllHocluc()">Show all hoc luc</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      title: 'Ứng dụng quản lý trường học sử dụng Vuejs',
      data: [],
      page: 1,
      last_page: 1,
      hocluc: this.$route.params.hocluc
    }
  },
  watch: {
    page: function () {
      this.getListSinhVien()
    },
    hocluc: function () {
      this.getListSinhVien()
    }
  },
  created () {
    this.getListSinhVien()
  },
  methods: {
    getListSinhVien: function () {
      axios
        .get('http://127.0.0.1:8000/get-list?page=' + this.page + '&&hocluc=' + this.hocluc)
        .then(response => {
          this.last_page = response.data.last_page
          this.data = response.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    nextPage: function () {
      if (this.last_page === this.page) {
        alert('You reached to last page')
        return 0
      } else {
        this.page += 1
        this.$route.query.page = 1
      }
    },
    previousPage: function () {
      if (this.page === 1) {
        alert('You are in page 1')
        return 0
      } else {
        this.page -= 1
        this.$route.query.page = 1
      }
    },
    upHocluc: function () {
      // this.$router.push({
      //   path: '/component/1',
      //   query: { test: 'test' }
      // })
      // console.log(this.$route.params.hocluc)
      if (this.hocluc == 5) {
        alert('không thể học giỏi hơn được nữa')
        return 0
      }
      this.hocluc = parseInt(this.hocluc) + 1
      this.page = 1
      this.$router.push({ name: 'SecondComponent', params: { hocluc: this.hocluc } })
    },
    downHocluc: function () {
      if (this.hocluc == 1) {
        alert('không thể học ngu hơn được nữa')
        return 0
      }
      this.hocluc = parseInt(this.hocluc) - 1
      this.page = 1
      this.$router.push({ name: 'SecondComponent', params: { hocluc: this.hocluc } })
    },
    showAllHocluc: function () {
      // this.$router.push({
      //   path: '/component/1',
      //   query: { test: 'test' }
      // })
      // console.log(this.$route.params.hocluc)
      this.hocluc = 0
      this.page = 1
      this.$router.push({ name: 'SecondComponent', params: { hocluc: this.hocluc } })
    }
  }
}
</script>
<style>
</style>
