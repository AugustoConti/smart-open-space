package com.sos.smartopenspace.domain

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToOne
import javax.persistence.OneToOne

@Entity
class Slot(
  @OneToOne
  val talk: Talk,
  val hour: Int,
  @ManyToOne
  val room: Room,
  @Id
  @GeneratedValue
  val id: Long = 0
)