import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { EmailJob } from "@/lib/email/email-types";

interface EmailSummaryProps {
    email: EmailJob;
}

export function EmailSummary({
    email,
}: EmailSummaryProps) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium">
                        Application
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <p className="font-medium">
                        {email.applicationName || "—"}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium">
                        Delivery
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <p className="font-medium">
                        {email.to || "—"}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium">
                        Category
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <p className="font-medium">
                        {email.category || "—"}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}