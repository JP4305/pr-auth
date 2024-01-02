import { type } from "os";

type registerErrorType = {
    email?: string;
    name?: string;
    password?: string;
}
type loginErrorType = {
    email?: string;
    password?: string;
}

// Forgot password payload type
type ForgotPasswordPayload = {
    email?: string;
}

// Reset password layload type
type ResetPasswordPayload = {
    email?: string,
    signature?: string,
    password?: string,
    password_confirmation?: string
}