package com.sos.smartopenspace.domain

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
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
        val openSpace = anyOpenSpace()

        assertFalse(openSpace.activeCallForPapers())
    }

    @Test
    fun `an open space starts a call for papers`() {
        val openSpace = anyOpenSpace()

        openSpace.toggleCallForPapers()

        assertTrue(openSpace.activeCallForPapers())
    }

    @Test
    fun `an open space finishes a call for papers`() {
        val openSpace = anyOpenSpace()

        openSpace.toggleCallForPapers()
        openSpace.toggleCallForPapers()

        assertFalse(openSpace.activeCallForPapers())
    }
}