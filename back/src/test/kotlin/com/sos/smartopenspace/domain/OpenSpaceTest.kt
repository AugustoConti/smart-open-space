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
    fun `Cuando se crea un OS este contiene sus datos`() {
        val nameOS = "os"
        val date = LocalDate.now()
        val os = OpenSpace(
                nameOS, date, setOf(),
                setOf()
        )

        assertEquals(os.name, nameOS)
        assertEquals(os.date, date)
    }
}