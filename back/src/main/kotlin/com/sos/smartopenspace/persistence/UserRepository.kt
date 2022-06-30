package com.sos.smartopenspace.persistence

import com.sos.smartopenspace.domain.User
import org.springframework.data.repository.CrudRepository

interface UserRepository : CrudRepository<User, Long> {

  fun findByEmailAndPassword(email: String, password: String): User?

}
