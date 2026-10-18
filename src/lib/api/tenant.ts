import { apiClient } from "@/lib/api/client";
import type {
    ApiResponse,
    PagedResponse,
    PaginationRequest,
} from "@/lib/api/types";

export type Tenant = {
    id: string;
    name: string;
    subdomain: string;
    isActive: boolean;
};

export type CreateTenantRequest = {
    name: string;
    subdomain: string;
};

export type UpdateTenantRequest = {
    name: string;
    subdomain: string;
    isActive: boolean;
};

export async function getTenants(
    params: PaginationRequest
): Promise<PagedResponse<Tenant>> {
    const response =
        await apiClient.get<
            ApiResponse<PagedResponse<Tenant>>
        >("/api/tenant/paged", {
            params: {
                PageNumber: params.pageNumber,
                PageSize: params.pageSize,
                Search: params.search || undefined,
            },
        });

    return response.data.data;
}

export async function getTenant(
    tenantId: string
): Promise<Tenant> {
    const response =
        await apiClient.get<ApiResponse<Tenant>>(
            `/api/tenant/${tenantId}`
        );

    return response.data.data;
}

export async function createTenant(
    request: CreateTenantRequest
): Promise<Tenant> {
    const response =
        await apiClient.post<ApiResponse<Tenant>>(
            "/api/tenant",
            request
        );

    return response.data.data;
}

export async function updateTenant(
    tenantId: string,
    request: UpdateTenantRequest
): Promise<Tenant> {
    const response =
        await apiClient.put<ApiResponse<Tenant>>(
            `/api/tenant/${tenantId}`,
            request
        );

    return response.data.data;
}

export async function deleteTenant(
    tenantId: string
): Promise<void> {
    await apiClient.delete<ApiResponse<unknown>>(
        `/api/tenant/${tenantId}`
    );
}