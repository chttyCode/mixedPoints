import React, { Component } from 'react'
import { connect } from '../react-redux'
import actions from '../store/actions'
class Login extends Component<any, any> {
    username: React.RefObject<any>
    password: React.RefObject<any>
    constructor(props: any) {
        super(props)
        this.username = React.createRef()
        this.password = React.createRef()
    }
    login = (event: any) => {
        event.preventDefault()
        let username = this.username.current.value
        let password = this.password.current.value
        this.props.login(username, password)
    }
    logout = (event: any) => {
        event.preventDefault()
        this.props.logout()
    }
    render() {
        let { username } = this.props
        let loginForm = (
            <form>
                <label>用户名</label>
                <input ref={this.username} />
                <br />
                <label>密码</label>
                <input ref={this.password} />
                <br />
                <button onClick={this.login}>登录</button>
            </form>
        )
        let logoutForm = (
            <form>
                用户名:{username}
                <br />
                <button onClick={this.logout}>退出</button>
            </form>
        )
        return (
            <>
                <button onClick={this.login}>登录</button>
                <button onClick={this.logout}>退出</button>
                {username ? logoutForm : loginForm}
            </>
        )
    }
}
export default connect((state: any) => state.login, actions)(Login)
