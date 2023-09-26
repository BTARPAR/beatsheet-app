export type BeatKey = "name" | "time" | "content" | "cameraAngle" | "notes";

export type Beat = {
    id: number;
    name: string;
    time: string;
    content: string;
    cameraAngle: string;
    notes: string;
};