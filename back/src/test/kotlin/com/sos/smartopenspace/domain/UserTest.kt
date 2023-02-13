package com.sos.smartopenspace.domain;

import com.sos.smartopenspace.services.UserService
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class UserTest {

  @Autowired
  lateinit var userService: UserService

  @Test
  fun `generate reset token for user saves reset token`() {
    val user = userService.create(aUser())

    userService.generatePasswordResetToken(user)

    Assertions.assertNotNull(userService.findByEmail(user.email).resetToken)
  }

  private fun aUser(): User {
    return User("test@mail.com", "testuser", "password", resetToken = null, resetTokenLifetime = 0)
  }

}
