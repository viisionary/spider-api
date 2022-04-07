export interface User {
    id: string;
    _id?: string;
    uuid?: string;
    firstName?: string;
    lastName?: string;
    username: string;
    password: string;
    email?: string;
    phoneNumber?: string;
    location?: string,
    avatar?: string;
    // defaultPrivacyLevel: DefaultPrivacyLevel;
    createdAt?: Date;
    modifiedAt?: Date;
}
