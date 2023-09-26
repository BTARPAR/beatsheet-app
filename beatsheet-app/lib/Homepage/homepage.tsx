'use client'
import Act, {ActType} from "@beatsheet-app/lib/ui/Act";
import Timeline from "@beatsheet-app/lib/ui/Timeline";
import Header from "@beatsheet-app/lib/Homepage/components/Header";
import {useActsQuery, useDeleteAct} from "@beatsheet-app/lib/Homepage/data-provider/query";

const Homepage = () => {
    const {isLoading, data} = useActsQuery()
    const {mutate} = useDeleteAct()

    const deleteHandler = (actId) => {
        const {beatsInfo = {}}: {} = data.filter((act) => act.id === actId)[0]
        const idsOfBeats = beatsInfo?.sortedTimeRanges.map((beat) => beat.id)
        mutate({actId, idsOfBeats})
    }

    return (
        <>
            <Header/>

            {!isLoading && <ul>
                {data.map((act: ActType) => (
                    <Act title={act.name} actId={act.id} key={act.id}
                         hasBeats={!!act.beatsInfo.sortedTimeRanges.length} onDelete={deleteHandler}>
                        <Timeline sections={act.beatsInfo.sortedTimeRanges}/>
                    </Act>
                ))}
            </ul>}

        </>

    )
}

export default Homepage