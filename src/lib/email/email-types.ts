export interface EmailJob {
    id: string;
    applicationName: string | null;
    to: string | null;
    from: string | null;
    subject: string | null;
    category: string | null;
    priority: string | null;
    status: string | null;
    processingStartedAt: string | null;
    sentAt: string | null;
    tenantId: string | null;
    applicationId: string | null;
    template: string | null;
    websiteName: string | null;
    payload: string | null;
    attempts: number;
    scheduledAt: string | null;
    errorCode: string | null;
    errorMessage: string | null;
    idempotencyKey: string | null;
    correlationTag: string | null;
    maxAttempts: number;
    nextAttemptAt: string | null;
}

export interface EmailPayload {
    HtmlBody?: string;
    TextBody?: string;
    [key: string]: unknown;
}