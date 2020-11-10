export  function useUserRole (role) {
    if(role === 'employee' || role === 'visitor'){
        return true;
    }else {
        return false;
    }
}
