import {useState} from "react";
import * as React from "react";
import type {CreateDiaryEntryProps} from "../App.tsx";
import type {Visibility, Weather} from "../types.ts";

export const NewDiaryEntryForm = ({createDiaryEntry}: CreateDiaryEntryProps) => {

    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState('')
    const [weather, setWeather] = useState('')
    const [comment, setComment] = useState('')

    const addDiaryEntry = (event: React.SyntheticEvent) => {
        event.preventDefault()
        createDiaryEntry({
            date: date,
            visibility: visibility as Visibility,
            weather: weather as Weather,
            comment: comment,
        })
        setDate(date);
        setVisibility(visibility);
        setWeather(weather);
        setComment(comment);
    }

    return (
        <form onSubmit={addDiaryEntry}>
            <div>
                <div>
                    <label>
                        date
                        <input
                            type="text"
                            value={date}
                            onChange={event => setDate(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        visibility
                        <input
                            type="Visibility"
                            value={visibility}
                            onChange={event => setVisibility(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        weather
                        <input
                            type="Weather"
                            value={weather}
                            onChange={event => setWeather(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        comment
                        <input
                            type="text"
                            value={comment}
                            onChange={event => setComment(event.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}