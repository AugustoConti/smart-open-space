package com.sos.smartopenspace.domain

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import java.time.LocalDate
import java.time.LocalTime

class OpenSpaceTest {

    private fun anyOpenSpace(talks: MutableSet<Talk> = mutableSetOf()) =
            OpenSpace(
                    "os", LocalDate.now(), setOf(),
                    setOf(
                            TalkSlot(LocalTime.parse("09:00"), LocalTime.parse("10:00")),
                            TalkSlot(LocalTime.parse("10:00"), LocalTime.parse("11:00")),
                            TalkSlot(LocalTime.parse("11:00"), LocalTime.parse("12:00"))
                    ), talks
            )

    private fun anyOpenSpaceWith(organizer: User): OpenSpace {
        val openSpace = anyOpenSpace()
        organizer.addOpenSpace(openSpace)
        return openSpace
    }

    private fun anyUser(oss: MutableSet<OpenSpace> = mutableSetOf(), talks: MutableSet<Talk> = mutableSetOf()) =
        User("augusto@sos.sos", "augusto", "Augusto", oss, talks)

    @Test
    fun `an open space is created with necessary fields and contains them`() {
        val nameOpenSpace = "os"
        val date = LocalDate.now()
        val openSpace = OpenSpace(
                nameOpenSpace, date, setOf(),
                setOf()
        )

        assertEquals(openSpace.name, nameOpenSpace)
        assertEquals(openSpace.date, date)
    }

    @Test
    fun `an open space is created with description and contains it`() {
        val nameOpenSpace = "os"
        val date = LocalDate.now()
        val description = "A description"
        val openSpace = OpenSpace(
            nameOpenSpace, date, setOf(),
            setOf(), mutableSetOf(), description
        )

        assertEquals(openSpace.description, description)
    }

    @Test
    fun `an open space starts with inactive call for papers`() {
        val organizer = anyUser()
        val openSpace = anyOpenSpaceWith(organizer)

        assertFalse(openSpace.activeCallForPapers())
    }

    @Test
    fun `an open space starts a call for papers`() {
        val organizer = anyUser()
        val openSpace = anyOpenSpaceWith(organizer)

        openSpace.startCallForPapers(organizer)

        assertTrue(openSpace.activeCallForPapers())
    }

    @Test
    fun `a user thats not the organizer cant start call for papers`() {
        val anUser = anyUser()
        val organizer = anyUser()
        val openSpace = anyOpenSpaceWith(organizer)

       assertThrows<NotOrganizerException> {
            openSpace.startCallForPapers(anUser)
        }
    }
}