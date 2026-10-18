"use client";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import type { EmailJob } from "@/lib/email/email-types";
import { parsePayload } from "@/lib/email/email-utils";

interface EmailContentProps {
    email: EmailJob;
}

export function EmailContent({
    email,
}: EmailContentProps) {
    const payload = parsePayload(email.payload);

    const htmlBody = payload.HtmlBody ?? "";
    const textBody = payload.TextBody ?? "";

    return (
        <Card>
            <CardHeader>
                <CardTitle>Email Content</CardTitle>
            </CardHeader>

            <CardContent>
                <Tabs defaultValue="preview">
                    <TabsList>
                        <TabsTrigger value="preview">
                            Preview
                        </TabsTrigger>

                        <TabsTrigger value="html">
                            HTML
                        </TabsTrigger>

                        <TabsTrigger value="text">
                            Text
                        </TabsTrigger>

                        <TabsTrigger value="payload">
                            Payload
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent
                        value="preview"
                        className="mt-4"
                    >
                        {htmlBody ? (
                            <iframe
                                title="Email preview"
                                srcDoc={htmlBody}
                                className="h-[700px] w-full rounded-md border"
                                sandbox=""
                            />
                        ) : (
                            <div className="rounded-md border p-6 text-sm text-muted-foreground">
                                No HTML content available.
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent
                        value="html"
                        className="mt-4"
                    >
                        <pre className="max-h-[700px] overflow-auto rounded-md bg-muted p-4 text-sm whitespace-pre-wrap break-all">
                            {htmlBody || "No HTML content available."}
                        </pre>
                    </TabsContent>

                    <TabsContent
                        value="text"
                        className="mt-4"
                    >
                        <pre className="min-h-[200px] rounded-md bg-muted p-4 text-sm whitespace-pre-wrap">
                            {textBody || "No text content available."}
                        </pre>
                    </TabsContent>

                    <TabsContent
                        value="payload"
                        className="mt-4"
                    >
                        <pre className="max-h-[700px] overflow-auto rounded-md bg-muted p-4 text-sm whitespace-pre-wrap break-all">
                            {JSON.stringify(
                                payload,
                                null,
                                2
                            )}
                        </pre>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}