<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="header-left">电商后台管理系统</div>
        <el-button @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff"
          :default-active = "activeRoute" router>
            <!-- 一级菜单 -->
            <el-submenu v-for="item1 in menuList" :key="item1.id" :index="item1.path+''">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item1.authName}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item v-for="item2 in item1.children" 
                :key="item2.id" :index="'/'+ item2.path" @click="routeStatus('/'+item2.path)">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{item2.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
    <router-view></router-view>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import getData from "@/api/url";

export default {
  data() {
    return {
      menuList:[],
      activeRoute: ''
    };
  },
  mounted() {
    this.getMenuList();
    this.activeRoute = window.sessionStorage.getItem("router")
    console.log(this.activeRoute)
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
   async getMenuList(){
        const {data: res} = await getData.menulist()
        console.log(res)
        if(res.meta.status == 200){
            this.menuList = res.data
        }else{
            this.$message.error("获取列表失败")
        }

    },
    routeStatus(router){
        window.sessionStorage.setItem("router", router)
        this.activeRoute = router
    }
  }
};
</script>

<style scoped>
.el-header,
.el-aside {
  display: flex;
  background: #333744;
}

.el-container,
.home {
  display: flex;
  height: 100%;
}

.home{
    min-width: 1366px;
}

.header-left {
  flex: 1;
  font-size: 22px;
  line-height: 60px;
  color: #fff;
}

.el-button {
  margin: 10px 0;
}

.el-menu {
  width: 100%;
  border: none;
}

</style>