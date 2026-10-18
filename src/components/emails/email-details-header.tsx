"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import type { EmailJob } from "@/lib/email/email-types";
import {
    getStatusClassName,
    getStatusIcon,
} from "@/lib/email/email-utils";

interface EmailDetailsHeaderProps {
    email: EmailJob;
}

export function EmailDetailsHeader({
    email,
}: EmailDetailsHeaderProps) {
    const StatusIcon = getStatusIcon(email.status);

    return (
        <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
                <Button
                    asChild
                    variant="ghost"
                    size="icon"
                >
                    <Link href="/emails">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>

                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Email Details
                    </h1>

                    <p className="text-muted-foreground">
                        {email.subject || "No subject"}
                    </p>
                </div>
            </div>

            <Badge
                className={getStatusClassName(email.status)}
            >
                <StatusIcon className="mr-1 h-3.5 w-3.5" />
                {email.status || "Unknown"}
            </Badge>
        </div>
    );
}