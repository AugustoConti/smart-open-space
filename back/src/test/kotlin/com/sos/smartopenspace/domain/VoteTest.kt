package com.sos.smartopenspace.domain

import com.sos.smartopenspace.aUser
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

class VoteTest {

    @Test
    fun `a talk has not votes when is created`() {
        var aTalk = Talk("charla sin votos")

        assertEquals(aTalk.votes(), 0)
    }

    @Test
    fun `a user votes a talk`() {
        var aTalk = Talk("charla sin votos")
        var aUser = aUser()

        aUser.vote(aTalk)

        assertEquals(aTalk.votes(), 1)
    }

    @Test
    fun `a user cannot voted a talk twice`() {
        var aTalk = Talk("charla sin votos")
        var aUser = aUser()

        aUser.vote(aTalk)
        aUser.vote(aTalk)

        assertEquals(aTalk.votes(), 1)
    }


}