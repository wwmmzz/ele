<template>
  <div>
    <el-card>
      <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
      <el-table :data="userlist" style="width: 100%" stripe border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listParams.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="listParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%">
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="ruleForm"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import getData from "@/api/url";

export default {
  data() {
    return {
      listParams: {
        pagenum: 1,
        pagesize: 2
      },
      userlist: [],
      total: 0,
      addDialogVisible: false,
      addForm: {
          username:'',
          password:'',
          email:'',
          mobile:'',

      },
      addRules: {
          username:[
             { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password:[
             { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          email:[
             { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          mobile:[
             { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
      }
    };
  },
  mounted() {
    this.getUserlist();
  },
  methods: {
    getUserlist() {
      getData.userlist(this.listParams).then(res => {
        // console.log(res);
        if (res.data.meta.status == 200) {
          this.userlist = res.data.data.users;
          this.total = res.data.data.total;
        }
      });
    },
    handleSizeChange(newsize) {
      // console.log(newsize)
      this.listParams.pagesize = newsize;
      this.getUserlist();
    },
    handleCurrentChange(newpage) {
      // console.log(newpage)
      this.listParams.pagenum = newpage;
      this.getUserlist();
    },
    addUser() {
      this.addDialogVisible = false
        getData.adduser(this.addForm)
                .then(res=>{
                    // console.log(res)
                    if(res.data.meta.status == 201){
                        this.$message.success('添加成功')
                        this.getUserlist()
                        // console.log(this.total)
                    }else{
                        this.$message.error('添加失败')
                    }
                })
    }
  }
};
</script>

<style>
.el-button {
  margin: 10px;
}
</style>