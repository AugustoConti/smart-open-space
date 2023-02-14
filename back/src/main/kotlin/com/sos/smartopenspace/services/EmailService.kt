package com.sos.smartopenspace.services
import com.sos.smartopenspace.domain.Email
import com.sos.smartopenspace.domain.User
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

  fun sendRecoveryEmail(email: String): User {
    val user = userService.findByEmail(email)
    val resetToken = userService.generatePasswordResetToken(user)
    sendEmail(email, "recuperación de password", "$frontendResetUrl/reset-password?email=$email&token=$resetToken",)
    return user
  }

  fun sendEmail(email: String, subject: String, text: String) {
    val mail = Email(email, subject, text, withAttachment = false)
    val msg = createSimpleMessage(mail)
    emailSender.send(msg)
  }

  private fun createSimpleMessage(email: Email) = SimpleMailMessage().apply {
    setFrom(springNameUsername)
    setTo(email.to)
    setSubject(email.subject)
    setText(email.text)
  }
}