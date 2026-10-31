// TanStack Query
import { QueryClient } from "@tanstack/react-query";

// Cliente global de consultas
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// Los datos de NASA cambian poco: se reutilizan sin refetch agresivo
			staleTime: 1000 * 60 * 60,
			gcTime: 1000 * 60 * 60 * 6,
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});
