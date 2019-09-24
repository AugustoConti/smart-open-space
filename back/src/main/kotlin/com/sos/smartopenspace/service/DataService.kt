package com.sos.smartopenspace.service

import com.sos.smartopenspace.model.OpenSpace
import com.sos.smartopenspace.model.Room
import com.sos.smartopenspace.model.Talk
import com.sos.smartopenspace.persistence.OpenSpaceRepository
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate
import java.time.LocalTime

@Service
@Transactional
class DataService(private val openSpaceRepository: OpenSpaceRepository) {
  @EventListener
  fun appReady(event: ApplicationReadyEvent) {
    if (openSpaceRepository.count() > 0) return
    openSpaceRepository.saveAll(
      setOf(
        OpenSpace(
          "CPI-Conf",
          LocalDate.now().plusDays(2),
          LocalTime.of(14, 0),
          LocalTime.of(21, 0),
          setOf(Room("213")),
          mutableSetOf(
            Talk(
              "Winter: Framework de videojuegos 2D en Smalltalk",
              "Winter es un framework para desarrollar videojuegos en 2D en Pharo Smalltalk"
            ),
            Talk(
              "Agile meetings",
              "Stand ups, Dailies, Retros, Plannings, 1on1s, Synchups. No será mucho? Y cuándo codeamos? Un recorrido por las reuniones ágiles y por qué tienen tanta importancia como el código. Un caso concreto de equipos distribuidos en 10pines."
            ),
            Talk(
              "Desarrollo de Software Ágil en 10Pines",
              "Todavía recuerdo mi reunión con Emilio Gutter, hasta ese momento un ex colega y amigo de la comunidad Ágil, en la cual me invitó a ser parte de 10Pines. Me contó que habían fundado una empresa donde las personas y la calidad humana prevalecían y cuyo objetivo principal era generar valor haciendo lo que mejor sabíamos hacer: desarrollo de software ágil. La oferta fue muy tentadora: formar parte, desde los inicios, de una empresa concebida bajo los valores ágiles. ¡Eso sucedió hace 10 años y hoy sigo aquí!\nDurante estos años, los pinos (quienes formamos parte de 10Pines) elaboramos nuestros procesos, seleccionamos herramientas y estandarizamos artefactos. En resumen, co-creamos nuestra Metodología, que recientemente sentí la necesidad de observar con detenimiento, estudiar y describir. Escribí un libro con el resultado de dicho proceso. En esta charla quisiera describirles los conceptos principales abordados para que sirva como una invitación para que lean el resto!"
            ),
            Talk("Proyectos de software con impacto social"),
            Talk("Desarrollando software sin jefes ni competencia"),
            Talk(
              "Creando un framework web en Cuis y hosteando en raspberry pi",
              "Contar la travesía de implementar un framework web para Cuis smalltalk y luego hacer una aplicación con él, usando con D3.js y visor 3D de proteínas, deployar todo eso en una raspberry pi."
            ),
            Talk(
              "Armemos una API REST",
              "La idea es contar experiencias consumiendo y manteniendo APIs rest, repasar y contar buenas prácticas y mostrar brevemente una implementación usando Spring Boot y Java.\nLa idea es hablar sobre:\n- Qué significa REST\n- Aspectos Destacados & tips sobre: \n- Manejo de errores\n- Logs\n- Versionado\n- Tests\n- Respuestas Complejas"
            ),
            Talk(
              "El Desarrollo de Software como debería ser",
              "¿Es el desarrollo de software como “debería ser”? ¿Nos informaron durante nuestra formación y la historia de nuestra profesión sobre los problemas con los que nos encontraríamos? La realidad es que sí pero en la mayoría de los casos lo desoímos. Espero poder mostrarle cómo podría se el desarrollo de software y lograr divertirlos con esta gran parodia de nuestra profesión"
            ),
            Talk(
              "Evaluando JavaScript con Haskell",
              "Hace algún tiempo, gracias a Mumuki, Ludat tuvo la rara oportunidad de escribir un intérprete para Javascript en un proyecto del mundo real, y en Haskell nada menos!\nEn esta charla, vamos a estar explorando el extraño mundo de evaluar lenguajes de programación, redescubriendo cosas que para todos son obvias en cualquier lenguaje moderno y entendiendo porque los lenguajes actuales son como son.\nTodo esto mientras aprendemos un poco de las poderosas abstracciones en Haskell que permitieron que todo esto pasara en el tiempo que 10Pines amablemente nos donó para completar este desarrollo: poco menos de una semana."
            )
          )
        ),
        OpenSpace(
          "Prácticas Técnicas - 4° edición",
          LocalDate.now().plusDays(5),
          LocalTime.of(19, 0),
          LocalTime.of(21, 0),
          setOf(
            Room("Roja"),
            Room("Amarilla"),
            Room("Verde"),
            Room("Naranja")
          ),
          mutableSetOf(
            Talk(
              "TODOS HACIA MASTER",
              "trunk-based development con ayuda de feature toggles"
            ),
            Talk(
              "FrontEnd 2.0",
              "La idea es contar algunas experiencias que tuve laburando en tecnologias completamente diferentes como ser C# con WebForms o .NET, Ruby con Ruby on Rails o en Javascript con algo tipo Vue o React y Node o Serveless para backend.\nVamos a hablar en particular sobre el desarrollo del front end utilizando estas tecnlogias."
            ),
            Talk("JUDO", "BDD en SQL Server"),
            Talk("Testear siendo DEV")
          )
        )
      )
    )
  }
}