export const logout = (history) => {
   window.sessionStorage.removeItem("token")
   history.push({pathname:"/"})
};