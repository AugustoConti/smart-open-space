package com.sos.smartopenspace.persistence

import com.sos.smartopenspace.domain.Room
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.CrudRepository

interface RoomRepository : CrudRepository<Room, Long>