import {deleteBeat, fetchBeats} from "@beatsheet-app/lib/Beats/data-provider";
import {Beat} from "@beatsheet-app/lib/Beats/data-provider/types";
import {sortAndCalculateTotalTime} from "@beatsheet-app/lib/Beats/utils";

export const fetchActs = async () => {
    const data = await fetch("http://localhost:8080/acts");
    const acts = await data.json()

    const listOfBeats = [...acts].map((act) => fetchBeats(act.id))
    let results = []

    await Promise.all(listOfBeats).then(async (values) => {
        results = [...acts].map((act, index) => {
            const beats = values[index].length ? sortAndCalculateTotalTime(values[index]) : {
                sortedTimeRanges: [],
                totalTime: 0
            }
            return {...act, beatsInfo: beats}
        })
    })
    return results
}


export const deleteAct = async (actId, idsOfBeats) => {
    const listOfDelete = idsOfBeats.map((beatId) => deleteBeat(actId, beatId))
    await Promise.all(listOfDelete).then(async () => {
        await fetch(`http://localhost:8080/acts/${actId}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
    })
}

export async function createAct(act): Promise<Beat> {
    const res = await fetch('http://localhost:8080/acts', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(act),
    });
    return res.json();
}