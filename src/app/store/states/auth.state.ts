import { User } from "src/app/core/models/user";

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    errorState?: string | undefined;
    token: string | undefined;
    autoRedirect?: boolean
}
