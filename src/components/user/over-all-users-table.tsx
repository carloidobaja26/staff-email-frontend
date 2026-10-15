"use client";

import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Search, Shield } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    getOverAllUsersPaged,
    type OverAllUser,
} from "@/lib/api/users";

import Link from "next/link";

export function OverAllUsersTable() {
    const queryClient = useQueryClient();

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] =
        useState("");

    const [selectedTenantUser, setSelectedTenantUser] =
        useState<OverAllUser | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search);
            setPageNumber(1);
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);

    const {
        data,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: [
            "overAllUsers",
            pageNumber,
            pageSize,
            debouncedSearch,
        ],

        queryFn: () =>
            getOverAllUsersPaged({
                pageNumber,
                pageSize,
                search:
                    debouncedSearch.trim() ||
                    undefined,
            }),
    });

    const tenantUsers = data?.items ?? [];
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
                        placeholder="Search tenant..."
                        className="pl-9"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="rounded-md border">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50">
                                <th className="h-11 px-4 text-left font-medium">
                                   Tenant Name
                                </th>
                                <th className="h-11 px-4 text-left font-medium">
                                    Number of Users
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="size-4 animate-spin" />
                                            Loading Tenant Users ...
                                        </div>
                                    </td>
                                </tr>
                            ) : tenantUsers.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No Tenant found.
                                    </td>
                                </tr>
                            ) : (
                                tenantUsers.map(
                                    (tenantUser) => (
                                        <tr
                                            key={
                                                tenantUser.tenantId
                                            }
                                            className="border-b last:border-0"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="font-medium">
                                                    <Link
                                                        href={`/users/${tenantUser.tenantId}`}
                                                        className="font-medium hover:underline"
                                                    >
                                                        <span className="font-medium">
                                                            {tenantUser.tenantName}
                                                        </span>
                                                    </Link>
                                                </div>
                                            </td>

                                            <td className="max-w-md px-4 py-3 text-muted-foreground">
                                              <div className="font-medium">
                                                    {
                                                        tenantUser.userCount
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    {totalNumber === 0
                        ? "No Tenant Users"
                        : `Showing ${
                              (pageNumber - 1) *
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