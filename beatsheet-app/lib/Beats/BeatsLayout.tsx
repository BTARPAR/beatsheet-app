'use client'
import Beats from "@beatsheet-app/lib/Beats/components/Beats";
import {sortAndCalculateTotalTime} from "@beatsheet-app/lib/Beats/utils";
import {useFetchBeats} from "@beatsheet-app/lib/Beats/data-provider/query";

const BeatsLayout = ({params}) => {
    const {data, isLoading} = useFetchBeats(params.id)
    if (isLoading) {
        return null
    }
    const {sortedTimeRanges = [], totalTime} = sortAndCalculateTotalTime(data)

    return <Beats data={sortedTimeRanges} totalTime={totalTime} actId={params.id}/>
}

export default BeatsLayout