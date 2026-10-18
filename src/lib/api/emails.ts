import { apiClient } from "@/lib/api/client";
import type {
    ApiResponse,
    PagedResponse,
    PaginationRequest,
} from "@/lib/api/types";
import { EmailJob } from "../email/email-types";

export type EmailWebhookEvent = {
    id: string;
    provider: string | null;
    eventId: string | null;
    eventType: string | null;
    emailJobId: string | null;
    receivedAt: string | null;
}

export type Email = {
    id: string;
    applicationName: string;
    to: string;
    from?: string;
    subject: string;
    category: string;
    priority: string;
    status: string;
    processingStartedAt?: string;
    sentAt?: string;
    tenantId?: string;
    applicationId: string;
    template: string;
    websiteName?: string;
    payload: string;
    attempts: number;
    scheduledAt?: string;
    errorCode?: string;
    errorMessage?: string;
    idempotencyKey?: string;
    correlationTag?: string;
    maxAttempts?: number;
    nextAttemptAt?: string;

};

export function formatProcessedTime(
    value?: string | null
): string {
    if (!value) {
        return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    return date.toLocaleString("en-PH", {
        timeZone: "Asia/Manila",
        dateStyle: "medium",
        timeStyle: "short",
    });
}


export type CreateEmailRequest = {
    name: string;
    subdomain: string;
};

export type UpdateEmailRequest = {
    name: string;
    subdomain: string;
    isActive: boolean;
};

export async function getAdminEmails(
    params: PaginationRequest
): Promise<PagedResponse<Email>> {
    const response =
        await apiClient.get<
            ApiResponse<PagedResponse<Email>>
        >("/api/emails/AdminPaged", {
            params: {
                PageNumber: params.pageNumber,
                PageSize: params.pageSize,
                Search: params.search || undefined,
            },
        });

    return response.data.data;
}

export async function getEmailDetails(
    id: string
): Promise<EmailJob> {
    const response =
        await apiClient.get<ApiResponse<EmailJob>>(
            `/api/emails/${id}`
        );

    return response.data.data;
}

export async function getEventWebhook(
    params: PaginationRequest,
    emailJobId: string
): Promise<PagedResponse<EmailWebhookEvent>> {
    const response =
        await apiClient.get<
            ApiResponse<PagedResponse<EmailWebhookEvent>>
        >("/api/webhooks/maildelivery/paged", {
            params: {
                PageNumber: params.pageNumber,
                PageSize: params.pageSize,
                Search: params.search || undefined,
                emailJobId: emailJobId
            },
        });

    return response.data.data;
}
