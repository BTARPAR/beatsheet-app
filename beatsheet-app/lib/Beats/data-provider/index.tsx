import {Beat} from "@beatsheet-app/lib/Beats/data-provider/types";

export async function fetchBeats(actId: number): Promise<Beat[]> {
    const res = await fetch(`http://localhost:8080/acts/${actId}/beats`);
    return res.json();
}

export async function createBeat(actId: number, beat: Beat): Promise<Beat> {
    const res = await fetch(`http://localhost:8080/acts/${actId}/beats`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(beat),
    });
    return res.json();
}

export async function deleteBeat(actId: number, beatId: number): Promise<Beat> {
    const res = await fetch(
        `http://localhost:8080/acts/${actId}/beats/${beatId}`,
        {
            method: "DELETE",
        },
    );
}

export async function updateBeat(beat: Beat): Promise<void> {
    const res = await fetch(`http://localhost:8080/acts/beats/${beat.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(beat)
        },
    );
}