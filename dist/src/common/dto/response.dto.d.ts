export declare class ResponseDto<T = any> {
    success: boolean;
    statusCode: number;
    message?: string;
    data?: T;
    errors?: any;
}
export declare class ErrorResponseDto {
    success: boolean;
    statusCode: number;
    message: string;
    errors?: any;
    timestamp: string;
    path: string;
}
export declare class PaginationMetaDto {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}
