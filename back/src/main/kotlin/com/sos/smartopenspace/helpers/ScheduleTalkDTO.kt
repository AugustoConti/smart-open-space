package com.sos.smartopenspace.helpers

import com.fasterxml.jackson.annotation.JsonFormat
import java.time.LocalDate
import java.time.LocalTime

class ScheduleTalkDTO (
    val time: LocalTime,
    val date: LocalDate
)
