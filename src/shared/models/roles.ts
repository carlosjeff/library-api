export interface roleType { admin, default }


export const roles: roleType = {
    admin: { name: 'admin', level: 1 },
    default: { name: 'default', level: 2 }
}
