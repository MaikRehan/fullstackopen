import axios from "axios";
import type {DiaryEntry, NewDiaryEntry} from "../types";

const getAll = async () => {
    const {data} = await axios.get<DiaryEntry[]>(
        `/api/diaries/`
    );

    return data;
};

const create = async (newObject:NewDiaryEntry) => {
    const response = await axios.post<DiaryEntry>(`/api/diaries/`, newObject);
    return response.data;
}

export default {getAll, create}