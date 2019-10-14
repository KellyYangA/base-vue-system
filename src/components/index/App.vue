<template>
    <a-locale-provider :locale="locale">
        <a-layout class="master-layout">
            <a-layout-sider :trigger="null" collapsible v-model="layout.sider.collapsed" :width="272" :collapsedWidth="0">
                <div class="logo">
                    <AIconfont type="icon-of-of-logo"/>system
                </div>
                <a-menu
                        mode="inline"
                        @click="handleClick"
                        :theme="theme"
                        :openKeys="filtersOpenKeys($route.path, openKeys)"
                        @openChange="openChange"
                        :selectedKeys="[$route.path]"
                >
                    <template v-for="menu in menus">
                        <a-menu-item v-if="!menu.children" :key="menu.url" @click="selectMenu(menu)">
                            <a-icon type="pie-chart" />
                            <span>{{menu.name}}</span>
                        </a-menu-item>
                        <template v-else>
                            <a-sub-menu :key="menu.url">
                                <span slot="title"><a-icon type="appstore" /><span>{{menu.name}}</span></span>
                                <a-menu-item v-for="c in menu.children" :key="c.url" @click="selectMenu(c)"><span>{{c.name}}</span></a-menu-item>
                            </a-sub-menu>
                        </template>
                    </template>
                </a-menu>
            </a-layout-sider>
            <a-layout>
                <a-layout-header>
                    <div class="system-router-group">
                        <a-icon class="trigger" :type="layout.sider.collapsed ? 'menu-unfold' : 'menu-fold'" @click="() => layout.sider.collapsed = !layout.sider.collapsed" />
                    </div>
                    <div class="m-h-20">
                        <a-dropdown>
                            <div class="user-center-wrapper ant-dropdown-link">
<!--                                <img class="user-center-avatar" :src="user.member && user.member.avatar" v-show="user.member && user.member.avatar"/>-->
                                <div>
                                    <AIconfont class="user-center-avatar" type="icon-of-group"/>
                                   <span class="font-title"> xxx</span>
                                </div>
                            </div>
                            <a-menu slot="overlay">
                                <a-menu-item>
                                    <a><div class="user-center-wrapper-item" @click="() => $router.push({name: 'user'})"><a-icon type="user"/>&nbsp;个人中心</div></a>
                                </a-menu-item>
                                <a-menu-item>
                                    <a><div class="user-center-wrapper-item"><a-icon type="setting"/>&nbsp;账户设置</div></a>
                                </a-menu-item>
                                <a-menu-divider />
                                <a-menu-item>
                                    <a><div class="user-center-wrapper-item" @click="logout"><a-icon type="logout"/>&nbsp;登出</div></a>
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </div>
                </a-layout-header>
                <a-layout-content>
                    <div>
                        <div class="p-v-16 p-h-24 m-t-1 b-white header">
                            <a-breadcrumb>
                                <a-breadcrumb-item><router-link :to="{path: '/messageStation'}">首页</router-link></a-breadcrumb-item>
                                <a-breadcrumb-item v-for="(nav, index) in breadCrumbs" :key="index">{{nav.breadcrumbName}}</a-breadcrumb-item>
                            </a-breadcrumb>
                            <span class="f-20 m-t-16 font-title f-w-n" v-if="breadCrumbs[breadCrumbs.length - 1]">{{breadCrumbs[breadCrumbs.length - 1].breadcrumbName}}</span>
                        </div>
                        <div>
                            <router-view/>
                        </div>
                    </div>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-locale-provider>
</template>

<script>
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
  import 'moment/locale/zh-cn'
  import { mapState } from 'vuex'

  export default {
    name: "index",
    data() {
      return {
        locale: zh_CN,
        layout: {
          sider: {
            collapsed: false,
          },
        },
        menus: [
          {
            key: '1',
            name: '测试模块1',
            url: '/test',
            icon: 'mail',
            children: [{
              key: '1.1',
              name: '首页2',
              url: '/home',
              icon: 'calendar',
            }]
          },
          {
            key: '2',
            name: '权限管理',
            url: '/auth',
            icon: 'mail'
          },
          {
            key: '3',
            name: '儿童服务站',
            url: '/childrenStation',
            icon: 'mail',
            children: [
                {
                key: '3.2',
                name: '站点管理',
                url: '/childrenStation2',
                icon: 'calendar',
              }
            ]
          },
          {
            key: '4',
            name: '统计中心',
            url: '/analysis',
            icon: 'mail',
          },
          {
            key: '5',
            name: '儿童服务站2',
            url: '/childrenStation55',
            icon: 'mail',
            children: [
              {
                key: '5.1',
                name: '消息中心',
                url: '/messageStation',
                icon: 'calendar',
              },
              {
                key: '5.2',
                name: '站点管理',
                url: '/childrenStation56',
                icon: 'calendar',
              }
            ]
          },
          {
            key: '6',
            name: '个人中心',
            url: '/user',
            icon: 'mail',
          },
        ],
        theme: 'dark',
        visible: false,
        openKeys: []
      }
    },
    computed: {
      ...mapState([]),
      breadCrumbs() {
        let list = []
        this.menus.map(m => {
          if (m.children && m.children.length) {
            m.children.map(c => {
              if (c.url === this.$route.path) {
                list.push({
                  path: m.url,
                  breadcrumbName: m.name
                }, {
                  path: c.url,
                  breadcrumbName: c.name
                })
              }
            })
          }
          if (m.url === this.$route.path) {
            list.push({
              path: m.url,
              breadcrumbName: m.name
            })
          }
        })
        return list
      }
    },
    mounted() {
      this.getUser()
    },
    methods: {
      async getUser() {
        // const {data, err} = await this.$store.dispatch('getUser', {})
        // console.log(data, err)
      },
      openChange(val) {
        this.openKeys = val
      },
      filtersOpenKeys(path, openKeys) {
        if (openKeys.length === 0) {
          // 刷新后只展示已选择的菜单项的父级
          let selectKey = []
          this.menus.map(m => {
            if (m.children && m.children.length) {
              m.children.map(c => {
                if (c.url === path) {
                  selectKey.push(m.url)
                }
              })
            }
          })
          return selectKey
        } else return openKeys
      },
      selectMenu(child) {
        this.$router.push({path: child.url})
      },
      logout () {
        console.log('logout')
        // TODO 异步请求
        location.href = `${process.env.BASE_URL}login.html?logout`
      },
      handleClick() {}
    }
  }
</script>

<style lang="less" scoped>
    .header {
        height: 98px;
        line-height: 48px;
    }
    .content{
        border-radius: 2px;
    }
</style>
