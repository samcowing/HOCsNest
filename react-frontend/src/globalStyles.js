import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.primaryText};
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


.user-container {
    background: ${({ theme }) => theme.loginBody};
    color: ${({ theme }) => theme.loginPrimaryText};

    a {
        color: ${({ theme }) => theme.loginPrimaryText};
    }

    .login {
        &-header {
            background: ${({ theme }) => theme.loginPrimary};
        }

        &-form {
            background: ${({ theme }) => theme.loginSecondary};

            input {
                &:focus {
                    border: 2px solid;
                    border-color: ${({ theme }) => theme.loginInputBorder};
                }
            }

            &-btn {
                background: ${({ theme }) => theme.loginBtn};
                &:hover {
                    background: ${({ theme }) => theme.loginBtnHover};
                }
            }

            &-create {
                span {
                    color: ${({ theme }) => theme.loginSecondaryText};
                }
            }
        }
    }
}

@media (max-width: 425px) {
    .user-container {
        background: ${({ theme }) => theme.loginBodyMobile};
    }
}

.user-container-signup {
    background: ${({ theme }) => theme.signupBody};
    color: ${({ theme }) => theme.loginPrimaryText};

    a {
        color: ${({ theme }) => theme.loginPrimaryText};
    }

    .signup {
        &-header {
            background: ${({ theme }) => theme.signupPrimary};
        }

        &-form {
            background: ${({ theme }) => theme.signupSecondary};

            input {
                &:focus {
                    border: 2px solid;
                    border-color: ${({ theme }) => theme.signupInputBorder};
                }
            }

            &-btn {
                background: ${({ theme }) => theme.signupBtn};
                &:hover {
                    background: ${({ theme }) => theme.signupBtnHover};
                }
            }

            &-login {
                span {
                    color: ${({ theme }) => theme.signupSecondaryText};
                }
            }
        }
    }
}

@media only screen and (max-width: 425px) {
    .user-container-signup {
        background: ${({ theme }) => theme.signupBodyMobile};
    }
}

.logout-btn {
    background: ${({ theme }) => theme.logoutBtn};

    &:hover, &:focus {
        background: ${({ theme }) => theme.logoutBtnHover};
    }
}

`