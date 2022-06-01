package com.sos.smartopenspace

import com.sos.smartopenspace.domain.*
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

fun anUser(oss: MutableSet<OpenSpace> = mutableSetOf(), talks: MutableSet<Talk> = mutableSetOf()) =
        User("apprentices@sos.sos", "apprentices", "apprentices", oss, talks)