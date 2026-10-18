import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { EmailJob } from "@/lib/email/email-types";
import { formatEmailDate } from "@/lib/email/email-utils";

interface EmailProcessingInformationProps {
    email: EmailJob;
}

export function EmailProcessingInformation({
    email,
}: EmailProcessingInformationProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Processing Information</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Processing Started
                        </p>

                        <p className="font-medium">
                            {formatEmailDate(
                                email.processingStartedAt
                            )}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Sent At
                        </p>

                        <p className="font-medium">
                            {formatEmailDate(email.sentAt)}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Scheduled At
                        </p>

                        <p className="font-medium">
                            {formatEmailDate(email.scheduledAt)}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Attempts
                        </p>

                        <p className="font-medium">
                            {email.attempts} / {email.maxAttempts}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Next Attempt
                        </p>

                        <p className="font-medium">
                            {formatEmailDate(email.nextAttemptAt)}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Priority
                        </p>

                        <p className="font-medium">
                            {email.priority || "—"}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}