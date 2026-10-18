import { Suspense } from "react";

import { EmailDetailsClient } from "@/components/emails/email-details-client";

function EmailDetailsFallback() {
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

export default function EmailDetailsPage() {
    return (
        <Suspense fallback={<EmailDetailsFallback />}>
            <EmailDetailsClient />
        </Suspense>
    );
}