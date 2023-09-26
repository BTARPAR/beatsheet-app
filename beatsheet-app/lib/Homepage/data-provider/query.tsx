import {useMutation, useQuery, useQueryClient} from "react-query";
import {createAct, deleteAct, fetchActs} from "@beatsheet-app/lib/Homepage/data-provider";

export const useActsQuery = () => {
    return useQuery(
        ["acts"],
        () => fetchActs(),
    );
}

export const useAddAct = () => {
    const queryClient = useQueryClient();
    return useMutation((act) => createAct(act), {
        onMutate: async (act) => {
            await queryClient.cancelQueries(["acts"]);

            const oldActs = queryClient.getQueryData(["acts"]);
            queryClient.setQueryData(["acts"], (old) => [
                ...(old),
                {...act, id: Math.floor(Math.random() * 10000), beatsInfo: {sortedTimeRanges: [], totalTime: 0}},
            ]);

            return {
                oldActs,
            };
        },
        onError: (_err, _act, context) => {
            queryClient.setQueryData(["acts"], context!.oldActs);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["acts"]);
            return data
        },
        onSettled: () => {
            queryClient.invalidateQueries(["acts"]);
        },
    });
}

export const useDeleteAct = () => {
    const queryClient = useQueryClient();
    return useMutation(({actId, idsOfBeats}) => deleteAct(actId, idsOfBeats), {
        onMutate: async ({actId, _idsOfBeats}) => {
            await queryClient.cancelQueries(["acts"]);

            const oldActs = queryClient.getQueryData(["acts"]);
            queryClient.setQueryData(["acts"], (oldData) => {
                return oldData.filter((act) => act.id !== actId)
            });

            return {
                oldActs,
            };
        },
        onError: (_err, _act, context) => {
            queryClient.setQueryData(["acts"], context!.oldActs);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["acts"]);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["acts"]);
        },
    });
}