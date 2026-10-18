import { useQuery } from "@tanstack/react-query";

import { getEmailDetails } from "@/lib/api/emails";

export function useEmailDetails(id: string) {
    return useQuery({
        queryKey: ["email", id],
        queryFn: () => getEmailDetails(id),
        enabled: !!id,
    });
}