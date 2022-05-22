export const checkIsAdmin = currentUser => {

    console.log(currentUser)
    if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;

    const { userRoles } = currentUser;
    if (userRoles.includes("Admin")) return true;

    return false;
};

export const randomId = () => (Math.random().toString(16).slice(2))

// export const randomId = (length) => {
//     if (length < 1) return;
//     return (
//         Math.random().toString(length).slice(2)
//     )
// }