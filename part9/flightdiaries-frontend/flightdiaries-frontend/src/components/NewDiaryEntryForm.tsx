import {useState} from "react";
import * as React from "react";
import type {CreateDiaryEntryProps} from "../App.tsx";
import {Visibility, Weather} from "../types.ts";

export const NewDiaryEntryForm = ({createDiaryEntry}: CreateDiaryEntryProps) => {

    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
    const [weather, setWeather] = useState<Weather>(Weather.Sunny)
    const [comment, setComment] = useState('')

    const addDiaryEntry = (event: React.SyntheticEvent) => {
        event.preventDefault()
        createDiaryEntry({
            date: date,
            visibility: visibility,
            weather: weather,
            comment: comment,
        })
        setDate(date);
        setComment(comment);
    }

    return (
        <form onSubmit={addDiaryEntry}>
            <div>
                <div>
                    <label>
                        date
                        <input
                            type="date"
                            value={date}
                            onChange={event => setDate(event.target.value)}
                        />
                    </label>
                </div>

                <div>
                    visibility
                    {Object.values(Visibility).map(visibility =>
                        <label key={visibility}>
                            <input type="radio"
                                   name="visibility"
                                   value={visibility}
                                   onChange={() => setVisibility(visibility)}/>
                            {visibility}
                        </label>
                    )}
                </div>

                <div>
                    weather
                    {Object.values(Weather).map(weather =>
                        <label key={weather}>
                            <input type="radio"
                                   name="weather"
                                   value={weather}
                                   onChange={() => setWeather(weather)}/>
                            {weather}
                        </label>
                    )}
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