import type {DiaryEntry, NewDiaryEntry} from "./types.ts";
import diaryService from "./services/diariesService.ts";
import {useEffect, useState} from "react";
import {NewDiaryEntryForm} from "./components/NewDiaryEntryForm.tsx";
import axios from "axios";

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

export interface NotificationProps {
    message: string,
    messageType: string
}

interface ErrorResponse {
    error?: ErrorData[];
}

export interface ErrorData {
    code: string;
    message: string;
    path: string[];
    values?: string[];
}

export const Notification = (props: NotificationProps) => {

    if (!props.message) return null

    return (<div className={props.messageType}>
        {props.message}
        <div>

        </div>
    </div>)
}


function App() {

    const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
    const [errorMessage, setNotification] = useState<string>("");
    const [messageType] = useState<string>('notification');

    useEffect(() => {
        const fetchDiaryEntries = async () => {
            const data = await diaryService.getAll();
            setDiaryEntries(data);
        };
        void fetchDiaryEntries();
    }, []);

    const createDiaryEntry = async (newDiaryEntry: NewDiaryEntry) => {

        try {
            await diaryService.create(newDiaryEntry);

        } catch (error) {
            if (axios.isAxiosError<ErrorResponse>(error) && error.response && error.response.data.error) {
                const errorInformation: ErrorData = error.response.data.error[0];
                console.log(errorInformation)
                setNotification(`Error: ${errorInformation.code} : ${errorInformation.message}`)
                setTimeout(() => {
                        setNotification("")
                    }, 5000
                );
            } else {
                console.error(error);
            }
        }
        const data = await diaryService.getAll();
        setDiaryEntries(data);
    }

    return (
        <div>
            <Notification message={errorMessage} messageType={messageType}/>
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
