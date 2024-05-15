import { useQuery, useMutation, useQueryClient, QueryFunction, MutationFunction } from "react-query";

export function useRequestProcessor() {
	const queryClient = useQueryClient();

	function query(key:string, queryFunction : QueryFunction<unknown, string> | undefined, options = {}) {
		return useQuery({
			queryKey: key,
			queryFn: queryFunction,
			...options,
		});
	}

	function mutate(key:string, mutationFunction: MutationFunction<unknown, void> | undefined, options = {}) {
		return useMutation({
			mutationKey: key,
			mutationFn: mutationFunction,
			onSettled: () => queryClient.invalidateQueries(key),
			...options,
		});
	}

	return { query, mutate };
}
