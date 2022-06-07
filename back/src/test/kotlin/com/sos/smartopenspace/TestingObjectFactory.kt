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
        description: String = "",
        talks: MutableSet<Talk> = mutableSetOf()
): OpenSpace {
    return OpenSpace(
        name = name,
        date = LocalDate.now(),
        rooms = rooms,
        slots = talkSlots,
        talks = talks,
        tracks = tracks,
        description = description
    )
}

fun anOpenSpaceWith(talk: Talk, organizer: User, room: Room): OpenSpace {
    val openSpace = anOpenSpace(talks = mutableSetOf(talk), rooms = setOf(room))
    organizer.addOpenSpace(openSpace)
    return openSpace
}

fun anUser(openSpaces: MutableSet<OpenSpace> = mutableSetOf(), talks: MutableSet<Talk> = mutableSetOf()) =
        User("apprentices@sos.sos", "apprentices", "apprentices", openSpaces, talks)