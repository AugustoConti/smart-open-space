package com.sos.smartopenspace

import com.sos.smartopenspace.domain.OpenSpace
import com.sos.smartopenspace.domain.Room
import com.sos.smartopenspace.domain.TalkSlot
import com.sos.smartopenspace.domain.Track
import java.time.LocalDate
import java.time.LocalTime

fun anOpenSpace(
    talkSlots: Set<TalkSlot> = setOf(
        TalkSlot(LocalTime.parse("09:00"), LocalTime.parse("09:30"))
    ),
    name: String = "os",
    rooms: Set<Room> = setOf(Room("1")),
    tracks: Set<Track> = emptySet(),
    description: String = ""
): OpenSpace {
    return OpenSpace(
        name = name,
        date = LocalDate.now(),
        rooms = rooms,
        slots = talkSlots,
        tracks = tracks,
        description = description
    )
}