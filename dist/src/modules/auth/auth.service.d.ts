import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(email: string, password: string): Promise<{
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
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        email: string;
        name: string;
        role: string;
        permissions: string;
        storeAccess: string;
        brandAccess: string;
    }>;
}
