package com.sos.smartopenspace.services
import com.sos.smartopenspace.domain.Email
import com.sos.smartopenspace.domain.User
import net.sargue.mailgun.Configuration
import net.sargue.mailgun.Mail
import org.springframework.beans.factory.annotation.Value
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.stereotype.Service

@Service
class EmailService(
  private val userService: UserService,
  private val emailSender: JavaMailSender
) {

  @Value("\${spring.mail.username}")
  private val springNameUsername: String = ""

  @Value("\${frontend.reset.url}")
  private val frontendResetUrl: String = ""

  fun sendEmail(email: String): User {
    val user = userService.findByEmail(email)
    val resetToken = userService.generatePasswordResetToken(user)

    val mail = Email(
      to = email,
      subject ="recuperación de password",
      text = "$frontendResetUrl/reset-password?email=$email&token=$resetToken",
      withAttachment = false
    )
    val msg = createSimpleMessage(mail)
    emailSender.send(msg)

    return user
  }

  private fun createSimpleMessage(email: Email): SimpleMailMessage {
    val message = SimpleMailMessage()
    message.setFrom(springNameUsername)
    message.setTo(email.to)
    message.setSubject(email.subject)
    message.setText(email.text)

    return message
  }
}