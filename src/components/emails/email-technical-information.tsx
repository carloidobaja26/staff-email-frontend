import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { EmailJob } from "@/lib/email/email-types";

interface EmailTechnicalInformationProps {
    email: EmailJob;
}

export function EmailTechnicalInformation({
    email,
}: EmailTechnicalInformationProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Technical Information</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Job ID
                        </p>

                        <p className="break-all font-mono text-sm">
                            {email.id}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Application ID
                        </p>

                        <p className="break-all font-mono text-sm">
                            {email.applicationId || "—"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Tenant ID
                        </p>

                        <p className="break-all font-mono text-sm">
                            {email.tenantId || "—"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Correlation Tag
                        </p>

                        <p className="break-all font-mono text-sm">
                            {email.correlationTag || "—"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Idempotency Key
                        </p>

                        <p className="break-all font-mono text-sm">
                            {email.idempotencyKey || "—"}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}