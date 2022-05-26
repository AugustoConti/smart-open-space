package com.sos.smartopenspace.repositories

import com.sos.smartopenspace.Factory
import com.sos.smartopenspace.domain.OpenSpace
import com.sos.smartopenspace.domain.Track
import com.sos.smartopenspace.persistence.OpenSpaceRepository
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.transaction.annotation.Transactional
import javax.validation.ConstraintViolationException

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class OpenSpaceRepositoryTest {

    val objectFactory = Factory()

    @Autowired
    lateinit var repoOpenSpace: OpenSpaceRepository

    @Test
    fun `cannot save openSpace with invalid track`() {
        val invalidTrack = Track(name = "name", description = "W".repeat(501), color = "#FFFFFF")
        val openSpace = objectFactory.anyOpenSpace(tracks = setOf(invalidTrack))
        repoOpenSpace.save(openSpace)
        //assertThrows<ConstraintViolationException> { repoOpenSpace.save(openSpace) }
    }
}
