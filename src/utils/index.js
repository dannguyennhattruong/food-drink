export const formatTime = (time) => {
    return (new Date(time)).toString().split(' ').splice(2,3).join(' ');
}

export const isLogined = () => {
    return !!localStorage.getItem('jwt');
}