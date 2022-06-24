package com.sos.smartopenspace.services

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class EmailServiceTest {

    @Test
    fun `fail test`() {
        val emailService: EmailService = EmailService()
        emailService.sendEmail();
        assertEquals(true, false)
    }
}