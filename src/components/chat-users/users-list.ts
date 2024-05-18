import Block from "../../core/Block";
import { connect } from "../../utils/connect";


interface IProps{
    users: any,
}

class UsersList extends Block<IProps>{

    render(): string {
        return `
            <div class="users-items">
                {{{ users }}}
                {{{ AddUserButton }}}
            </div>
        `
    }
}

export default connect(({users}) => ({users}))(UsersList);

