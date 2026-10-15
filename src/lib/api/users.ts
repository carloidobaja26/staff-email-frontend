import { apiClient } from "@/lib/api/client";
import type {
    ApiResponse,
    PagedResponse,
    PaginationRequest,
} from "@/lib/api/types";
import { Role } from "./roles";

export type User = {
    id: string;
    tenantId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
    isActive: boolean;
    roles: Role[];
};

export type CreateUserRequest = {
    tenantId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string | null;
};

export type UpdateUserRequest = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string | null;
    isActive: boolean;
};

export type OverAllUser = {
    tenantId: string;
    tenantName: string;
    userCount: number;
};

export async function getOverAllUsersPaged(
    params: PaginationRequest
): Promise<PagedResponse<OverAllUser>> {
    const response =
        await apiClient.get<
            ApiResponse<PagedResponse<OverAllUser>>
        >("/api/user/overall", {
            params: {
                PageNumber: params.pageNumber,
                PageSize: params.pageSize,
                Search: params.search || undefined,
            },
        });

    return response.data.data;
}

export async function getUsers(): Promise<User[]> {
    const response =
        await apiClient.get<ApiResponse<User[]>>(
            "/api/User"
        );

    return response.data.data;
}

export async function getUser(
    userId: string
): Promise<User> {
    const response =
        await apiClient.get<ApiResponse<User>>(
            `/api/User/${userId}`
        );

    return response.data.data;
}

export async function getUsersPaginated(
    params: PaginationRequest,
    tenantId?: string
): Promise<PagedResponse<User>> {
    const response =
        await apiClient.get<
            ApiResponse<PagedResponse<User>>
        >("/api/User/paged", {
            params: {
                PageNumber: params.pageNumber,
                PageSize: params.pageSize,
                Search: params.search,
                tenantId: tenantId
            },
        });

    return response.data.data;
}

export async function createUser(
    request: CreateUserRequest
): Promise<User> {
    const response =
        await apiClient.post<ApiResponse<User>>(
            "/api/User",
            request
        );

    return response.data.data;
}

export async function updateUser(
    userId: string,
    request: UpdateUserRequest
): Promise<User> {
    const response =
        await apiClient.put<ApiResponse<User>>(
            `/api/User/${userId}`,
            request
        );

    return response.data.data;
}

export async function deleteUser(
    userId: string
): Promise<void> {
    await apiClient.delete(
        `/api/User/${userId}`
    );
}