import {Beat} from "@beatsheet-app/lib/Beats/data-provider/types";

type BeatsInfo = {
    sortedTimeRanges: Array<Beat> | [];
    totalTime: number | string;
}

export type ActType = {
    id: number;
    name: string;
    beatsInfo: BeatsInfo
};
