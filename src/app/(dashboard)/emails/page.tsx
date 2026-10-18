import {
    EmailTable,
} from "@/components/emails/email-table";

export default function EmailsPage() {
    return (
        <div className="space-y-6">
            <div>

                <h1 className="text-2xl font-semibold">
                    Emails
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Overview of your email.
                </p>
            </div>
            <EmailTable />
        </div>
    );

}