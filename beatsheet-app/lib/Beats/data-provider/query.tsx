import {useMutation, useQuery, useQueryClient} from "react-query";
import {createBeat, deleteBeat, fetchBeats, updateBeat} from "@beatsheet-app/lib/Beats/data-provider/index";

export const useFetchBeats = (actId: number) => {
    return useQuery(
        ["beats"],
        () => fetchBeats(actId),
    );
}

export const useCreateBeat = () => {
    const queryClient = useQueryClient();
    return useMutation(({actId, beat}) => createBeat(actId, beat), {
        onMutate: async ({_actId, beat}) => {
            await queryClient.cancelQueries(["beats"]);

            const oldBeats = queryClient.getQueryData(["beats"]);
            queryClient.setQueryData(["beats"], (old) => [
                ...(old),
                {...beat, id: Math.floor(Math.random() * 10000)},
            ]);

            return {
                oldbeats:oldBeats,
            };
        },
        onError: (_err, _act, context) => {
            queryClient.setQueryData(["beats"], context!.oldbeats);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["beats"]);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["beats"]);
        },
    });
}

export const useUpdateBeat = () => {
    const queryClient = useQueryClient();
    return useMutation((beat) => updateBeat(beat), {
        onMutate: async (beat) => {
            await queryClient.cancelQueries(["beats"]);

            const oldBeats = queryClient.getQueryData(["beats"]);
            queryClient.setQueryData(["beats"], (old) => [
                ...(old),
                {...beat, id: Math.floor(Math.random() * 10000)},
            ]);
            return {
                oldbeats: oldBeats,
            };
        },
        onError: (_err, _act, context) => {
            queryClient.setQueryData(["beats"], context!.oldbeats);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["beats"]);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["beats"]);
        },
    });
}

export const useDeleteBeat = () => {
    const queryClient = useQueryClient();
    return useMutation(({actId, beatId}) => deleteBeat(actId, beatId), {
        onMutate: async ({_actId, beatId}) => {
            await queryClient.cancelQueries(["beats"]);

            const oldbeats = queryClient.getQueryData(["beats"]);
            queryClient.setQueryData(["beats"], (oldData) => {
                return oldData.filter((beat) => beat.id !== beatId)
            });

            return {
                oldbeats,
            };
        },
        onError: (_err, _act, context) => {
            queryClient.setQueryData(["beats"], context!.oldbeats);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["beats"]);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["beats"]);
        },
    });
}