package com.sos.smartopenspace.repositories

import com.sos.smartopenspace.anOpenSpace
import com.sos.smartopenspace.domain.Track
import com.sos.smartopenspace.persistence.OpenSpaceRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.transaction.annotation.Transactional
import javax.persistence.EntityManager
import javax.validation.ConstraintViolationException

@DataJpaTest
@ActiveProfiles("test")
@Transactional
class OpenSpaceRepositoryTest {

    @Autowired
    lateinit var repoOpenSpace: OpenSpaceRepository

    @Autowired
    lateinit var entityManager: EntityManager

    @Test
    fun `a track cannot be saved with description over 500 characters`() {
        val invalidTrack = Track(name = "name", description = "W".repeat(501), color = "#FFFFFF")
        val openSpace = anOpenSpace(tracks = setOf(invalidTrack))

        assertThrows<ConstraintViolationException> {
            repoOpenSpace.save(openSpace)
            entityManager.flush()
        }
    }

    @Test
    fun `a track cannot be saved with blank name`() {
        val invalidTrack = Track(name = "", description = "W".repeat(500), color = "#FFFFFF")
        val openSpace = anOpenSpace(tracks = setOf(invalidTrack))

        assertThrows<ConstraintViolationException> {
            repoOpenSpace.save(openSpace)
            entityManager.flush()
        }
    }

    @Test
    fun `a track cannot be saved with incomplete color`() {
        val invalidTrack = Track(name = "aName", description = "W".repeat(500), color = "#FF")
        val openSpace = anOpenSpace(tracks = setOf(invalidTrack))

        assertThrows<ConstraintViolationException> {
            repoOpenSpace.save(openSpace)
            entityManager.flush()
        }
    }

    @Test
    fun `a track cannot be saved with a color over 7 characters`() {
        val invalidTrack = Track(name = "aName", description = "W".repeat(500), color = "#FFFFFFF")
        val openSpace = anOpenSpace(tracks = setOf(invalidTrack))

        assertThrows<ConstraintViolationException> {
            repoOpenSpace.save(openSpace)
            entityManager.flush()
        }
    }

    @Test
    fun `a track cannot be saved with an invalid color`() {
        val invalidTrack = Track(name = "aName", description = "W".repeat(500), color = "Rojizo")
        val openSpace = anOpenSpace(tracks = setOf(invalidTrack))

        assertThrows<ConstraintViolationException> {
            repoOpenSpace.save(openSpace)
            entityManager.flush()
        }
    }

    @Test
    fun `the name of an open space can be modified and it is updated successfully`() {
        val openSpace = anOpenSpace();
        repoOpenSpace.save(openSpace)
        openSpace.update(name = "A new name")
        val updatedOpenSpace = repoOpenSpace.findById(openSpace.id).get()
        assertEquals("A new name", updatedOpenSpace.name)
    }
}
