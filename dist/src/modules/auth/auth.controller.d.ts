import { AuthService } from './auth.service';
declare class LoginDto {
    email: string;
    password: string;
}
declare class RefreshDto {
    refreshToken: string;
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        success: boolean;
        data: {
            accessToken: string;
            refreshToken: string;
            user: {
                id: string;
                email: string;
                name: string;
                role: string;
                permissions: import("@prisma/client/runtime/library").JsonValue;
                storeAccess: string[];
                brandAccess: string[];
            };
        };
    }>;
    refresh(dto: RefreshDto): Promise<{
        success: boolean;
        data: {
            accessToken: string;
        };
    }>;
    getProfile(req: any): Promise<{
        success: boolean;
        data: {
            id: string;
            email: string;
            name: string;
            role: string;
            permissions: import("@prisma/client/runtime/library").JsonValue;
            storeAccess: string[];
            brandAccess: string[];
        };
    }>;
}
export {};
