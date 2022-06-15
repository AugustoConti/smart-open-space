package com.sos.smartopenspace.persistence

import com.sos.smartopenspace.domain.TalkSlot
import org.springframework.data.repository.CrudRepository

interface SlotRepository : CrudRepository<TalkSlot, Long> {

}
