import type {DiaryEntry, NewDiaryEntry, Visibility, Weather} from "./types.ts";
import diaryService from "./services/diariesService.ts";
import {useEffect, useState} from "react";
import {NewDiaryEntryForm} from "./components/NewDiaryEntryForm.tsx";

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

export interface CreateDiaryEntryProps {
    createDiaryEntry: (
        newDiaryEntry: NewDiaryEntry
    ) => void;
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

    const createDiaryEntry = async (newDiaryEntry: NewDiaryEntry) => {
        const savedDiaryEntry = await diaryService.create(newDiaryEntry);

        const data = await diaryService.getAll();
        setDiaryEntries(data);
    }

    return (
        <div>
            <div>
                <NewDiaryEntryForm createDiaryEntry={createDiaryEntry}/>
            </div>
            <div>
                {diaryEntries.map((entry) => (
                    <SingleDiaryEntry key={entry.id} entry={entry}/>
                ))}
            </div>
        </div>
    );
}

export default App
