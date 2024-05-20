//@ts-nocheck

import Block from "../../core/Block";
import { connect } from "../../utils/connect";
import { TUser } from "../../api/type.ts";


class UsersList extends Block<TUser>{

    render(): string {
        return `
            <div class="users-items">
                {{{ users }}}
            </div>
        `
    }
}

export default connect(({users}) => ({users}))(UsersList);
