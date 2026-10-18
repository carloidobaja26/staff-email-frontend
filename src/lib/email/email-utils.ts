import {
    CheckCircle2,
    Clock3,
    CircleAlert,
    Loader2,
    XCircle,
    type LucideIcon,
} from "lucide-react";

import type { EmailPayload } from "./email-types";

export function parsePayload(
    payload: string | null | undefined
): EmailPayload {
    if (!payload) {
        return {};
    }

    try {
        const parsed = JSON.parse(payload);

        if (parsed && typeof parsed === "object") {
            return parsed as EmailPayload;
        }

        return {};
    } catch {
        return {};
    }
}

export function getStatusIcon(
    status: string | null | undefined
): LucideIcon {
    switch (status?.toLowerCase()) {
        case "delivered":
        case "sent":
        case "accepted":
        case "success":
            return CheckCircle2;

        case "processing":
        case "send":
            return Loader2;

        case "pending":
        case "scheduled":
            return Clock3;

        case "failed":
        case "bounce":
        case "cancelled":
            return XCircle;

        default:
            return CircleAlert;
    }
}

export function getStatusClassName(
    status: string | null | undefined
): string {
    switch (status?.toLowerCase()) {
        case "delivered":
        case "sent":
        case "accepted":
        case "success":
            return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400";

        case "processing":
        case "send":
            return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400";

        case "pending":
        case "scheduled":
            return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400";

        case "failed":
        case "bounce":
        case "cancelled":
            return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400";

        default:
            return "bg-muted text-muted-foreground";
    }
}

export function formatEmailDate(
    value: string | null | undefined
): string {
    if (!value) {
        return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return date.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone,
    });
}