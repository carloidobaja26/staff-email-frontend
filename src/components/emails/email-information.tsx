import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { EmailJob } from "@/lib/email/email-types";

interface EmailInformationProps {
    email: EmailJob;
}

export function EmailInformation({
    email,
}: EmailInformationProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Email Information</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            From
                        </p>
                        <p className="break-all font-medium">
                            {email.from || "—"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            To
                        </p>
                        <p className="break-all font-medium">
                            {email.to || "—"}
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">
                            Subject
                        </p>
                        <p className="font-medium">
                            {email.subject || "—"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Template
                        </p>
                        <p className="font-medium">
                            {email.template || "—"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Website
                        </p>
                        <p className="break-all font-medium">
                            {email.websiteName || "—"}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}