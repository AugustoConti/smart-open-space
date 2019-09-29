package com.sos.smartopenspace.persistence

import com.sos.smartopenspace.model.Room
import org.springframework.data.repository.CrudRepository

interface RoomRepository : CrudRepository<Room, Long>