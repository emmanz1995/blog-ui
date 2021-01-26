export const AuthHeader = () => {
    const token = localStorage.getItem('token')
    if(token) {
        return {authorization: `Bearer` + token}
    } else {
        return {}
    }
}
