import {Role, User} from '@prisma/client';


const admin : User = {
    id: '7096b9ca-31b6-4ebf-a393-951cf6e806b8',
    email: 'andrej@admin.com',
    firstName: 'Andrej',
    lastName: 'DJ',
    password: 'admin',
    role: Role.ADMIN,
    isVerified: false,
    phoneNumber: '+421999999999',
    createdAt: new Date('2004-03-04T11:00:00:000Z'),
    updatedAt: null,
    deletedAt: null,
}



export const allAdmins : User[] = [
    admin
]