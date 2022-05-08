const checkIsAdmin = currentUser => {

    console.log(currentUser)
    if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;

    const { userRoles } = currentUser;
    if (userRoles.includes("Admin")) return true;

    return false;
}

export default checkIsAdmin;