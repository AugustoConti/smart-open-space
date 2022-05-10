package com.sos.smartopenspace.domain

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import java.time.LocalDate
import java.time.LocalTime

class OpenSpaceTest {

    private fun anyOS(talks: MutableSet<Talk> = mutableSetOf()) =
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
        val nameOS = "os"
        val date = LocalDate.now()
        val os = OpenSpace(
                nameOS, date, setOf(),
                setOf()
        )

        assertEquals(os.name, nameOS)
        assertEquals(os.date, date)
    }

    @Test
    fun `an open space is created with description and contains it`() {
        val nameOS = "os"
        val date = LocalDate.now()
        val description = "A description"
        val os = OpenSpace(
            nameOS, date, setOf(),
            setOf(), mutableSetOf(), description
        )

        assertEquals(os.description, description)
    }
}