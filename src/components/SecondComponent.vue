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
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.ho }}</td>
                <td>{{ item.lop }}</td>
                <td>{{ item.hocluc.name }}</td>
                <td>
                    <el-button type="text" @click="showDetails(item.id)">Xem chi tiết</el-button>
                </td>
            </tr>
            </tbody>
        </table>

        <el-dialog
            title="Tips"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-form ref="sinhvien" :model="sinhvien" label-width="120px">
                <el-form-item label="Tên sinh viên">
                    <el-input v-model="sinhvien.name"></el-input>
                </el-form-item>

                <el-form-item label="Họ sinh viên">
                    <el-input v-model="sinhvien.ho"></el-input>
                </el-form-item>

                <el-form-item label="Lớp sinh viên">
                    <el-input v-model="sinhvien.lop"></el-input>
                </el-form-item>

                <el-form-item label="Học lực">
                    <el-select v-if="data_hocluc.length > 0" v-model="sinhvien.hocluc.id" filterable placeholder="Select">
                        <el-option
                            v-for="(item, index) in data_hocluc"
                            :key="index"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
                </span>
            </el-form>
        </el-dialog>
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
    data() {
        return {
            title: 'Ứng dụng quản lý trường học sử dụng Vuejs',
            data: [],
            page: 1,
            last_page: 1,
            dialogVisible: false,
            hocluc: this.$route.params.hocluc,
            sinhvien: {
                id: null,
                lop: null,
                name: null,
                ho: null,
                hocluc: {
                    name: null,
                    id: 0
                },
                email: null,
            },
            data_hocluc: []
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
    created() {
        this.getListSinhVien();
        this.getListHocLuc();
    },
    methods: {
        getListSinhVien: function () {
            apiService
                .get('api/auth/sinhvien/get-list?page=' + this.page + '&&hocluc=' + this.hocluc)
                .then(response => {
                    this.last_page = response.data.last_page
                    this.data = response.data.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getListHocLuc :function (){
            apiService
                .get('api/auth/hocluc/get-list')
                .then(response => {
                    console.log(response)
                    this.data_hocluc = response.data
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
            this.$router.push({name: 'SecondComponent', params: {hocluc: this.hocluc}})
        },
        downHocluc: function () {
            if (this.hocluc === 1) {
                alert('không thể học ngu hơn được nữa')
                return 0
            }
            this.hocluc = parseInt(this.hocluc) - 1
            this.page = 1
            this.$router.push({name: 'SecondComponent', params: {hocluc: this.hocluc}})
        },
        showAllHocluc: function () {
            this.hocluc = 0
            this.page = 1
            this.$router.push({name: 'SecondComponent', params: {hocluc: this.hocluc}})
        },
        handleClose(done) {
            this.$confirm('Are you sure to close this dialog?')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        showDetails(id){
            let self = this;
            Object.values(self.data).forEach((value, index) => {
                if(value.id === id){
                    self.sinhvien = value;
                }
            })
            this.dialogVisible = true;
        }
    }
}
</script>
<style>
</style>
