import { AlertCircle } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { EmailJob } from "@/lib/email/email-types";

interface EmailErrorProps {
    email: EmailJob;
}

export function EmailError({
    email,
}: EmailErrorProps) {
    if (!email.errorCode && !email.errorMessage) {
        return null;
    }

    return (
        <Card className="border-destructive/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    Error
                </CardTitle>
            </CardHeader>

            <CardContent>
                {email.errorCode && (
                    <p className="mb-2 font-mono text-sm">
                        Code: {email.errorCode}
                    </p>
                )}

                {email.errorMessage && (
                    <p className="text-sm">
                        {email.errorMessage}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}