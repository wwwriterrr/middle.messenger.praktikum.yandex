//@ts-nocheck

export type APIError = {
    reason: string;
};

export type SignUpResponse = {
    id: number
}

export type UserDTO = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
};

export type TUser = {
    id: number;
    login: string;
    first_name?: string | null;
    second_name?: string | null;
    display_name?: string | null;
    avatar?: string | null;
    phone?: string | null;
    email?: string | null;
    click?: () => void;
    role?: string,
};

export type TMessage = {
    id: number,
    content: string,
    user_id: number,
    time: string,
    file?: {
        id: number,
        user_id: number
        path: string,
        filename: string,
        content_type: string,
        content_size: number,
        upload_date: string,
    }
}

export type CreateUser = Omit<UserDTO, 'avatar' | 'display_name' | 'id'>  & {
    password: string
}

export type CreateChat = {
    title: string
}

export type LoginRequestData = {
    login: string,
    password: string
}

type LastMessage = {
    user: UserDTO,
    time: string,
    content: string
}

export type ChatDTO = {
    id: number,
    title: string,
    avatar: string | null,
    unread_count: number,
    last_message: LastMessage | null
}

export const apiUrl: string = 'https://ya-praktikum.tech/api/v2';
