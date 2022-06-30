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
    user.id = userRepository.findByEmail(user.email)?.id ?: 0
    user.securePassword()
    return userRepository.save(user)
  }

  @Transactional(readOnly = true)
  fun auth(email: String, password: String):User{
    val hashedPassword = Hashing.sha256()
      .hashString(password, StandardCharsets.UTF_8)
      .toString()

    return userRepository.findByEmailAndPassword(email, hashedPassword) ?: throw UserNotFoundException()
  }


  @Transactional(readOnly = true)
  fun findById(id: Long) = userRepository.findByIdOrNull(id) ?: throw UserNotFoundException()

  @Transactional(readOnly = true)
  fun identify(email: String) = userRepository.findByEmail(email)
  fun hash(hashKey: String) {
    if (hashKey.equals("ErnesFranXime")){
      userRepository.findAll()
        .forEach({it.securePassword()})
    }
    else
      throw RuntimeException("Zarasa")
  }
}