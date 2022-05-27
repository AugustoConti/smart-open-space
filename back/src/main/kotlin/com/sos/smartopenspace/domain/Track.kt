package com.sos.smartopenspace.domain

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
class Track(
    val name: String,
    val description: String = "",
    val color: String,
    @Id
    @GeneratedValue
    var id: Long = 0
) {
}