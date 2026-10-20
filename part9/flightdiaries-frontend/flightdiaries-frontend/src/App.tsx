import type {DiaryEntry} from "./types.ts";
import diaryService from "./services/diariesService.ts";
import {useEffect, useState} from "react";

export interface SingleDiaryEntryProps {
    entry: DiaryEntry;
}

export const SingleDiaryEntry = (props: SingleDiaryEntryProps) => {
    const {entry} = props;
    return (
        <div>
            <div>{entry.date}</div>
            <div>{entry.weather}</div>
            <div>{entry.visibility}</div>
        </div>
    )
}


function App() {

    const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

    useEffect(() => {
        const fetchDiaryEntries = async () => {
            const data = await diaryService.getAll();
            setDiaryEntries(data);
        };
        void fetchDiaryEntries();
    }, []);

    return (
        <div>
            {diaryEntries.map((entry) => (
                <SingleDiaryEntry key={entry.id} entry={entry}/>
            ))}
        </div>
    );
}

export default App
