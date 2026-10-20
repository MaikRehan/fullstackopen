import axios from "axios";
import type { DiaryEntry } from "../types";

const getAll = async () => {
    const { data} = await axios.get<DiaryEntry[]>(
        `/api/diaries/`
    );

    return data;
};

export default {getAll}