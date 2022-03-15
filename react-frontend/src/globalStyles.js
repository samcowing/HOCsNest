import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.primaryText};
}

.toggle-button {
    color: ${({ theme }) => theme.primaryText};

    &:hover {
        color: ${({ theme }) => theme.primaryText};
    }
}

.room {
    &-form {

        &-btn {
            background: ${({ theme }) => theme.cardTop};

            &:hover {
                background: ${({ theme }) => theme.cardTopHover};

                .room-form-title {
                    background: ${({ theme }) => theme.cardTitleHover};
                }
            }
        }

        &-title {
            background: ${({ theme }) => theme.cardTitle};
        }
    }

    &-active-btn {
        background: ${({ theme }) => theme.cardTopActive};
    }

    &-active-title {
        background: ${({ theme }) => theme.cardTitleActive};
    }
}

.chat {
    &-map {
        &-avatar {
            background: ${({ theme }) => theme.userIcon};
        }
        .active-user-avatar {
            background: ${({ theme }) => theme.activeUserIcon};
        }
        &-user {
            color: ${({ theme }) => theme.secondaryText};
        }
        .active-user-text {
            color: ${({ theme }) => theme.activeUserText};
        }
        &-message {
            color: ${({ theme }) => theme.primaryText};
        }
    }
    &-form {
        &-input {
            background: ${({ theme }) => theme.inputBackground};
        }
        &-btn {
            svg {
                color: ${({ theme }) => theme.sendBtn};
                &:hover, &:focus {
                    background: ${({ theme }) => theme.sendBtnHover};
                }
            }
        }
    }
}

.toggle-btn {
    svg {
        color: ${({ theme }) => theme.themeBtn};
        &:hover, &:focus {
            color: ${({ theme }) => theme.themeBtnHover};
        }
    }
}

`