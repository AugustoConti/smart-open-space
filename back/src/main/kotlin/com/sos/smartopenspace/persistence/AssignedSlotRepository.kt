package com.sos.smartopenspace.persistence
import com.sos.smartopenspace.domain.AssignedSlot
import org.springframework.data.repository.CrudRepository

interface AssignedSlotRepository : CrudRepository<AssignedSlot, Long>