package com.sos.smartopenspace

import com.sos.smartopenspace.domain.OpenSpace
import com.sos.smartopenspace.domain.Room
import com.sos.smartopenspace.domain.TalkSlot
import com.sos.smartopenspace.domain.Track
import java.time.LocalDate
import java.time.LocalTime

class TestingObjectFactory {
    private val defaultTalkSlots = setOf(
        TalkSlot(LocalTime.parse("09:00"), LocalTime.parse("09:30"))
    )

    private val defaultName = "os"

    private val defaultRooms = setOf(Room("1"))

    fun anOpenSpace(
        talkSlots: Set<TalkSlot> = defaultTalkSlots,
        name: String = defaultName,
        rooms: Set<Room> = defaultRooms,
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
}
