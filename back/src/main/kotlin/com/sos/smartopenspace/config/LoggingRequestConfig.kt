package com.sos.smartopenspace.config

// import org.aspectj.lang.annotation.AfterThrowing
// import org.springframework.security.core.context.SecurityContextHolder
import com.fasterxml.jackson.databind.ObjectMapper
import org.apache.logging.log4j.LogManager
import org.aspectj.lang.JoinPoint
import org.aspectj.lang.annotation.AfterReturning
import org.aspectj.lang.annotation.Aspect
import org.aspectj.lang.annotation.Before
import org.springframework.stereotype.Component

@Aspect
@Component
class LoggingRequestConfig {

  private val logger = LogManager.getLogger(LoggingRequestConfig::class.java)
  private val objectMapper = ObjectMapper()

  @Before("execution(* *..services.*.*(..))")
  fun loggingServiceRequest(joinPoint: JoinPoint) {
    val signature = "${joinPoint.signature.declaringTypeName}.${joinPoint.signature.name}"
    val arguments = joinPoint.args.toList()
    // val user = SecurityContextHolder.getContext().authentication?.name ?: ""
    logger.info("$signature $arguments")
  }

  @AfterReturning(value = "execution(* *..services.*.*(..))", returning = "returnValue")
  fun loggingServiceResponse(joinPoint: JoinPoint, returnValue: Any?) {
    val signature = "${joinPoint.signature.declaringTypeName}.${joinPoint.signature.name}"
    if (returnValue != null)
      logger.info("$signature - return: ${objectMapper.writeValueAsString(returnValue)}")
    else
      logger.info("$signature - without return")
  }

  // @AfterThrowing(pointcut = "execution(* *..services.*.*(..))", throwing = "ex")
  // @Throws(Throwable::class)
  // fun loggingThrowingException(ex: Exception) {
  //   logger.error("$ex\n${ex.stackTrace.joinToString("\n")}")
  // }
}