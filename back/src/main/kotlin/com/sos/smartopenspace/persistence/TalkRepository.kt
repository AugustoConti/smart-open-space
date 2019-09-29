package com.sos.smartopenspace.persistence

import com.sos.smartopenspace.model.Talk
import org.springframework.data.repository.CrudRepository

interface TalkRepository : CrudRepository<Talk, Long> {
  fun findAllBySpeakerIdAndOpenSpaceId(speaker_id: Long, openSpace_id: Long): List<Talk>
}