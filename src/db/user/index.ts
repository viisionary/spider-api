import {dynamodb} from "../connect";
import {User} from "./user";
import {v4 as uuidV4} from "uuid";

type createUserPayloadType = Pick<User, 'username' | 'password' | 'phoneNumber' | 'firstName' | 'email' | 'lastName'>
export const createUser: (payload: createUserPayloadType) => Promise<Pick<User, 'id'>> = ({
                                                                                              password,
                                                                                              username,
                                                                                              lastName,
                                                                                              firstName
                                                                                          }) => {
    const id = uuidV4();
    return new Promise((resolve, reject) => {
        dynamodb.putItem({
            TableName: 'User', Item: {
                "id": {
                    "S": id
                },
                "username": {
                    "S": username
                },
                "password": {
                    "S": password
                },
                "firstName": {
                    "S": firstName
                },
                "lastName": {
                    "S": lastName
                }
            },
        }, (err: any) => {
            if (err) {
                reject('create fail')
            }
            resolve({id});
        })
    })
}
type updateUserPayloadType = Pick<User, 'username' | 'avatar' | 'email' | 'firstName' | 'lastName'>
export const updateUser: (userId: User["id"], {}: updateUserPayloadType) => Promise<User> = (userId, {
    username,
    avatar,
    email,
    lastName,
    firstName,
}) => {
    return new Promise((resolve, reject) => {
        dynamodb.updateItem({
            TableName: 'User',
            Key: {
                "id": {
                    "S": userId
                },
            },
            UpdateExpression: 'SET username =:username, avatar =:avatar ',
            ExpressionAttributeValues: {
                ":username": {
                    "S": username
                },
                ":avatar": {
                    "S": avatar
                },
                ":email": {
                    "S": email
                },
                ":firstName": {
                    "S": firstName
                },
                ":lastName": {
                    "S": lastName
                },
            }

        }, (err: any, data: User) => {
            if (err) {
                reject(err)
            }
            resolve(data);
        })
    })
}


//Promise<USER>
export const getUser: (userId: User["id"]) => Promise<User> = (userId) => {
    return new Promise((resolve, reject) => {
        dynamodb.getItem({
            TableName: 'User', Key: {
                "id": {
                    "S": userId
                },
            }
        }, (err: any, data: any) => {
            if (err) {
                reject(err)
            }
            resolve(data.Item);
        })
    })
}

export const getUserByAuth: (payload: Pick<User, 'username' | 'password'>) => Promise<User> = ({
                                                                                                   username,
                                                                                                   password
                                                                                               }) => {
    return new Promise<any>((resolve, reject) => {
        dynamodb.query({
            TableName: 'User',
            // 二级索引
            IndexName: 'username',
            KeyConditionExpression: `username =:username`,
            // 二级with filter
            FilterExpression: 'password =:password',
            ExpressionAttributeValues: {
                ':username': {"S": username,},
                ':password': {"S": password,}
            }

        }, (err: any, data :any) => {
            if (err) {
                reject(err)
            }
            resolve(data);
        })
    })
}

