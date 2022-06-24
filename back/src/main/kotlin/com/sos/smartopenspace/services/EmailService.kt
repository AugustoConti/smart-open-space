package com.sos.smartopenspace.services
import net.sargue.mailgun.Configuration
import net.sargue.mailgun.Mail
import org.springframework.stereotype.Service

@Service
class EmailService {
    fun sendEmail() {
        val configuration: Configuration = Configuration()
            .domain("sandbox9b116b7bbed94851885f9904a42c0ff2.mailgun.org")
            .apiKey("api-key")
            .from("Test account", "app261255878@heroku.com")

        Mail.using(configuration)
            .to("fzuppa@10pines.com")
            .subject("This is the subject")
            .text("Hello world!")
            .build()
            .send();
    }
}