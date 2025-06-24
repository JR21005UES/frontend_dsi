const userRoutes = [
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: () => import('../views/UserView.vue')
  }
]

export default userRoutes
