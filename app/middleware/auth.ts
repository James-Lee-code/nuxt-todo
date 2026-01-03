export default defineNuxtRouteMiddleware(async () => {
  if (process.server) return

  const { initAuth, isLoggedIn } = useAuth()

  await initAuth()

  if (!isLoggedIn()) {
    return navigateTo('/auth')
  }
})
