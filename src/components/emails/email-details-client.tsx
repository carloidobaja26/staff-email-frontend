"use client";

import { useParams } from "next/navigation";

import { EmailDetailsHeader } from "@/components/emails/email-details-header";
import { EmailSummary } from "@/components/emails/email-summary";
import { EmailInformation } from "@/components/emails/email-information";
import { EmailProcessingInformation } from "@/components/emails/email-processing-information";
import { EmailTechnicalInformation } from "@/components/emails/email-technical-information";
import { EmailError } from "@/components/emails/email-error";
import { EmailContent } from "@/components/emails/email-content";

import { useEmailDetails } from "@/hooks/use-emails";
import { EmailWebhookEventTable } from "./email-webhook-event-table";

export function EmailDetailsClient() {
    const params = useParams();

    const emailId = params.id as string;

    const {
        data: email,
        isLoading,
        isError,
    } = useEmailDetails(emailId);

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Email Details
                    </h1>

                    <p className="text-muted-foreground">
                        Loading email details...
                    </p>
                </div>
            </div>
        );
    }

    if (isError || !email) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Email Details
                    </h1>

                    <p className="text-muted-foreground">
                        Email not found.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <EmailDetailsHeader email={email} />

            <EmailSummary email={email} />

            <EmailInformation email={email} />

            <EmailProcessingInformation email={email} />

            <EmailTechnicalInformation email={email} />

            <EmailError email={email} />

            <EmailContent email={email} />
            <EmailWebhookEventTable email={email} />
        </div>
    );
}