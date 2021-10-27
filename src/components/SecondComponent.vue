/* eslint-disable */
// eslint-disable-next-line
<template>
  <div class="danhsach">
    <h2>{{ title }}</h2>
    <table class="table">
      <thead>
      <tr>
        <th>id</th>
        <th>Tên</th>
        <th>Email</th>
        <th>Họ</th>
        <th>Lớp</th>
        <th>Học lực</th>
        <th>Action</th>
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
        <td> <b-button id="show-btn" @click="showModal(item.id)">Open Modal</b-button> </td>
      </tr>
      </tbody>
    </table>
    <b-modal ref="my-modal" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>Hello From My Modal!</h3>
      </div>
<!--      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Toggle Me</b-button>-->
      <b-button class="mt-3" variant="outline-danger" block >Close Me</b-button>
      <b-button class="mt-2" variant="outline-warning" block>Toggle Me</b-button>
    </b-modal>
    <div>
      <button @click="previousPage()">Pevious page</button>
      <button @click="nextPage()">Next page</button>
      <button @click="upHocluc()">Tăng học lực</button>
      <button @click="downHocluc()">Giảm học lực</button>
      <button @click="showAllHocluc()">Show tất cả học lực</button>
    </div>
  </div>
</template>
<script>
import apiService from '../core/services/api.service'

export default {
  data () {
    return {
      title: 'Ứng dụng quản lý trường học sử dụng Vuejs',
      data: [],
      page: 1,
      last_page: 1,
      hocluc: this.$route.params.hocluc,
      sinhvien: {
        id: null,
        name: null,
        ho: null,
        hocluc: null,
        email: null
      }
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
      // apiService.init();
      apiService
        .get('api/auth/get-list?page=' + this.page + '&&hocluc=' + this.hocluc)
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
      if (this.hocluc === 5) {
        alert('không thể học giỏi hơn được nữa')
        return 0
      }
      this.hocluc = parseInt(this.hocluc) + 1
      this.page = 1
      this.$router.push({ name: 'SecondComponent', params: { hocluc: this.hocluc } })
    },
    downHocluc: function () {
      if (this.hocluc === 1) {
        alert('không thể học ngu hơn được nữa')
        return 0
      }
      this.hocluc = parseInt(this.hocluc) - 1
      this.page = 1
      this.$router.push({ name: 'SecondComponent', params: { hocluc: this.hocluc } })
    },
    showAllHocluc: function () {
      this.hocluc = 0
      this.page = 1
      this.$router.push({ name: 'SecondComponent', params: { hocluc: this.hocluc } })
    },
    showModal: function (id){
      alert(id);
      const self = this;
      this.data.forEach(function (ele, index) {

        if(ele.id === id){

          console.log(self.sinhvien)
          self.sinhvien.id = id;
          self.sinhvien.name = ele.name;
          self.sinhvien.ho = ele.ho
          self.sinhvien.email = ele.email
          self.sinhvien.hocluc = ele.hocluc.id
        }
      });
    }
  }
}
</script>
<style>
</style>
