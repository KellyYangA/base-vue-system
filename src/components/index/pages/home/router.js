const index = () => import('@/components/index/pages/home/index')
const home = () => import('@/components/index/pages/home/homePage')

export default [
  {
    path: '/index',
    name: 'index',
    component: index,
    children: [
      {
        path: '/home',
        name: 'home',
        component: home
      }
    ]
  }]
