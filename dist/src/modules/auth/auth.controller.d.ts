import { AuthService } from './auth.service';
import { LoginDto, RefreshDto } from './dto/auth.dto';
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
                permissions: string;
                storeAccess: string;
                brandAccess: string;
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
            permissions: string;
            storeAccess: string;
            brandAccess: string;
        };
    }>;
}
