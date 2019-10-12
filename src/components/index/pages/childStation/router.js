const index = () => import('@/components/index/pages/childStation/index')
const messageStation = () => import('@/components/index/pages/childStation/messageStation')

export default [
  {
    path: '/childStation',
    alias: '/',
    name: 'index',
    component: index,
    children: [
      {
        path: '/messageStation',
        name: 'messageStation',
        component: messageStation,
      }
    ]
  }]
