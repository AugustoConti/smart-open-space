package com.sos.smartopenspace.services

import com.google.common.hash.Hashing
import com.sos.smartopenspace.domain.User
import com.sos.smartopenspace.domain.UserNotFoundException
import com.sos.smartopenspace.persistence.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.nio.charset.StandardCharsets


@Service
@Transactional
class UserService(private val userRepository: UserRepository) {
  fun create(user: User): User {
    val otherUser = userRepository.findByEmail(user.email)
    if (otherUser != null && otherUser.password == hash("")) user.id = otherUser.id
    user.securePassword()
    return userRepository.save(user)
  }

  @Transactional(readOnly = true)
  fun auth(email: String, password: String):User{
    val hashedPassword = hash(password)

    return userRepository.findByEmailAndPassword(email, hashedPassword) ?: throw UserNotFoundException()
  }

  private fun hash(password: String) = Hashing.sha256()
    .hashString(password, StandardCharsets.UTF_8)
    .toString()


  @Transactional(readOnly = true)
  fun findById(id: Long) = userRepository.findByIdOrNull(id) ?: throw UserNotFoundException()

}