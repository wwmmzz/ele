<template>
    <div>
        home
        <el-button @click="logout">退出</el-button>
    </div>
</template>

<script>
import getData from '@/api/url'

export default {
    data(){
        return{
            userlist: {
                pagenum: 1,
                pagesize: 4
            }
        }
    },
    mounted(){
        this.getUserlist()
    },
    methods:{
        getUserlist(){
            getData.userlist(this.userlist)
                .then(res=>{
                    console.log(res)
                })
        },
        logout(){
            window.sessionStorage.clear()
            this.$router.push('/login')
        }
    }
}
</script>

<style>

</style>