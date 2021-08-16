// updateUser
import {createUser, getUserByAuth, updateUser} from "../index";

describe('user db', () => {
    // beforeAll()
    test('增改查', () => {
        // const user
        updateUser('1', {username: '用户名', avatar: '/111.jpg'}).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    })
    test('getUserByAuth', () => {

        // getUserByAuth({password: 'zxcvbnm', phoneNumber: '15735184850'}).then((res) => {
//     console.log(res)
// }).catch(err => {
//     console.log(err.message)
// })

    })
    // test('createUser', () => {
    //     createUser({password: '123456', phoneNumber: '15735184851', username: "hi word"}).then((res) => {
    //         getUserByAuth({password: '123456', phoneNumber: '15735184851'}).then((res) => {
    //             console.log(res)
    //         }).catch(err => {
    //             console.log(err.message)
    //         })
    //     }).catch(err => {
    //         console.log(err.message)
    //     })
    // })
})
