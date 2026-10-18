export type EmailWebhookEvent = {
    id: string;
    provider: string | null;
    eventId: string | null;
    emailJobId: string | null;
    receivedAt: string | null;
}