"use client";

import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Search, Shield } from "lucide-react";

import { Input } from "@/components/ui/input";

import {
    getEventWebhook,
    type EmailWebhookEvent,
} from "@/lib/api/emails";
import {
    formatProcessedTime
} from "@/lib/api/emails";
import { EmailJob } from "@/lib/email/email-types";

interface EmailWebhookEventTableProps {
    email: EmailJob;
}

export function EmailWebhookEventTable({
    email,
}: EmailWebhookEventTableProps) {
    const queryClient = useQueryClient();

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] =
        useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search);
            setPageNumber(1);
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);
    const emailJobId = email.id;
    const {
        data,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: [
            "email-webhook-events",
            pageNumber,
            pageSize,
            debouncedSearch,
        ],

        queryFn: () =>
            getEventWebhook({
                pageNumber,
                pageSize,
                search:
                    debouncedSearch.trim() ||
                    undefined,
            },
            emailJobId
        ),
    });

    const emails = data?.items ?? [];
    const totalNumber = data?.totalNumber ?? 0;

    const totalPages = Math.ceil(
        totalNumber / pageSize
    );

    return (
        <div className="space-y-4">
            {/* Search + Add */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-sm">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                        placeholder="Search email..."
                        className="pl-9"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <div className="overflow-x-auto">
                    <table className="w-full table-auto text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50">
                                <th className="h-11 px-4 text-left font-medium whitespace-nowrap">
                                    Provider
                                </th>
                                <th className="h-11 px-4 text-left font-medium whitespace-nowrap">
                                    EventId
                                </th>
                                <th className="h-11 px-4 text-left font-medium">
                                    EventType
                                </th>
                                <th className="h-11 px-4 text-left font-medium whitespace-nowrap">
                                    ReceivedAt
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="size-4 animate-spin" />
                                            Loading emails event...
                                        </div>
                                    </td>
                                </tr>
                            ) : emails.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No emails event found.
                                    </td>
                                </tr>
                            ) : (
                                emails.map((email) => (
                                    <tr
                                        key={email.id}
                                        className="border-b last:border-0"
                                    >
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="font-medium">
                                                {email.provider}
                                            </div>
                                        </td>

                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="font-medium">
                                                {email.eventId}
                                            </div>
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="max-w-md truncate font-medium">
                                                {email.eventType}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="font-medium">
                                                {formatProcessedTime(
                                                    email.receivedAt
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    {totalNumber === 0
                        ? "No Email Event"
                        : `Showing ${(pageNumber - 1) *
                        pageSize +
                        1
                        }–${Math.min(
                            pageNumber * pageSize,
                            totalNumber
                        )} of ${totalNumber}`}
                </div>

                <div className="flex items-center gap-2">
                    <select
                        value={pageSize}
                        onChange={(event) => {
                            setPageSize(
                                Number(
                                    event.target.value
                                )
                            );
                            setPageNumber(1);
                        }}
                        className="h-9 rounded-md border bg-background px-2 text-sm"
                    >
                        <option value={10}>
                            10
                        </option>

                        <option value={20}>
                            20
                        </option>

                        <option value={50}>
                            50
                        </option>
                    </select>

                    <button
                        type="button"
                        disabled={
                            pageNumber <= 1 ||
                            isFetching
                        }
                        onClick={() =>
                            setPageNumber(
                                (page) =>
                                    page - 1
                            )
                        }
                        className="rounded-md border px-3 py-2 text-sm disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <span className="text-sm">
                        Page {pageNumber} of{" "}
                        {Math.max(
                            totalPages,
                            1
                        )}
                    </span>

                    <button
                        type="button"
                        disabled={
                            pageNumber >=
                            totalPages ||
                            isFetching ||
                            totalPages === 0
                        }
                        onClick={() =>
                            setPageNumber(
                                (page) =>
                                    page + 1
                            )
                        }
                        className="rounded-md border px-3 py-2 text-sm disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}