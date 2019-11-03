package com.sos.smartopenspace.persistence

import com.sos.smartopenspace.domain.OpenSpace
import org.springframework.data.repository.CrudRepository

interface OpenSpaceRepository : CrudRepository<OpenSpace, Long>
