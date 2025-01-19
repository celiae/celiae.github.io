---
title: Java常见注解含义
excerpt: Intercepts 用于定义 MyBatis 拦截器类可以拦截哪些方法。它包含一个 @Signature 注解数组，每个 @Signature 注解定义一个要拦截的方法签名
date: 2024-08-09 17:25:00
updated: 2024-08-10 17:25:00
categories:
  - 开发
  - 后端
tags:
  - Java
---

大量信息是通过询问 ChatGPT 获取的

## Java注解

### @Target
用于指定自定义注解可以应用的程序元素类型. @Target({ElementType.FIELD})表示这个注解只能被应用到类的字段（即类的成员变量）上。

ElementType是一个枚举类，定义了Java程序中各种不同的元素类型。例如：
* ElementType.FIELD：表示注解可以应用于类的字段（成员变量）。
* ElementType.METHOD：表示注解可以应用于方法。
* ElementType.TYPE：表示注解可以应用于类、接口（包括注解类型）或枚举声明。
* ElementType.PARAMETER：表示注解可以应用于方法或构造函数的参数。
* 其他类型还包括CONSTRUCTOR（构造函数）、LOCAL_VARIABLE（局部变量）、PACKAGE（包声明）等。

作用范围: 使用@Target({ElementType.FIELD})限定了注解的作用范围，使得该注解只能用于类的成员变量，而不能用于其他位置，如方法、类等。

假设我们定义一个自定义注解@MyFieldAnnotation，并指定它只能应用于字段上：
```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
public @interface MyFieldAnnotation {
    String value() default "default value";
}
```
@Target({ElementType.FIELD})指定@MyFieldAnnotation只能用于类的字段。

然后，我们可以在某个类中使用这个注解：
```java
public class MyClass {

    @MyFieldAnnotation(value = "Custom Value")
    private String myField;

    // 其他代码
}
```
@MyFieldAnnotation被正确应用到myField字段上。

如果尝试将@MyFieldAnnotation应用到不允许的位置（例如方法或类），编译器会报错：
```java
@MyFieldAnnotation  // 编译错误，@MyFieldAnnotation 不能应用在类上
public class AnotherClass {

    @MyFieldAnnotation(value = "Another Value")
    private String anotherField;

    @MyFieldAnnotation  // 编译错误，@MyFieldAnnotation 不能应用在方法上
    public void someMethod() {
    }
}
```

**使用场景**
1. 限制注解使用范围: 当你创建一个注解时，如果它只应该应用于特定的程序元素（例如，只能应用于字段而不是方法或类），@Target可以强制执行这种限制，从而防止误用。

2. 提高代码可读性和安全性: 通过限制注解的使用位置，代码的意图会更加明确，并且可以防止开发人员错误地将注解应用到不合适的地方。

**注意事项**
1. 多个元素类型: @Target可以接受多个ElementType值，如果你的注解可以应用于多个不同的程序元素，例如字段和方法，你可以这样指定：
    ```java
    @Target({ElementType.FIELD, ElementType.METHOD})
    ```
2. 没有@Target时的默认行为: 如果你在定义注解时没有使用@Target，那么该注解可以应用于任何程序元素，包括类、方法、字段、参数、构造函数等。这种情况下，注解的使用会更加灵活，但也更容易导致误用。    

### @Retention
用于指定自定义注解的保留策略。保留策略定义了注解在什么阶段被保留和可见：是仅在源代码中、编译后（字节码）还是运行时仍然可用。

RetentionPolicy是一个枚举类，定义了注解的保留策略，共有三种取值：
* SOURCE: 注解只在源代码中存在，编译时会被丢弃（在编译生成的字节码中不会保留）。适用于只在代码编写阶段使用的注解。
* CLASS: 注解在编译时会被保留到字节码文件中，但在运行时不会加载到JVM中。适用于一些需要在编译后进行处理，但不需要在运行时反射的注解。
* RUNTIME: 注解不仅在编译时保留，在运行时也保留在JVM中，可以通过反射在运行时获取。适用于需要在运行时动态处理的注解。指定注解的生命周期延续到运行时。这意味着你可以通过反射机制在程序运行时获取这些注解的信息，这在很多框架（如Spring、Hibernate）中非常常见。

假设我们定义一个自定义注解@MyRuntimeAnnotation，并将其保留策略设为RUNTIME：
```java
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface MyRuntimeAnnotation {
    String value() default "default value";
}
```
接着，我们可以将这个注解应用到某个类上：
```java
public class MyClass {

    @MyRuntimeAnnotation(value = "Runtime Value")
    public void myMethod() {
        // 方法实现
    }
}
```
然后，我们可以在运行时通过反射获取注解：
```java
import java.lang.reflect.Method;

public class Main {
    public static void main(String[] args) throws Exception {
        Method method = MyClass.class.getMethod("myMethod");

        if (method.isAnnotationPresent(MyRuntimeAnnotation.class)) {
            MyRuntimeAnnotation annotation = method.getAnnotation(MyRuntimeAnnotation.class);
            System.out.println("Annotation value: " + annotation.value());
        }
    }
}
```
输出将会是：Annotation value: Runtime Value

**使用场景**
1. 框架开发: 很多Java框架（如Spring、JUnit、Hibernate）都依赖RUNTIME注解，通过反射在运行时读取注解来进行配置或行为控制。

2. 动态配置: 当你需要在运行时根据注解的值进行某些配置或控制逻辑时，RUNTIME策略是必不可少的。

3. 自定义处理: 你可以创建自己的注解处理逻辑，并在应用启动或运行时动态执行与注解相关的操作。

**注意事项**
1. 性能考虑: 由于RUNTIME注解会在运行时保留并通过反射访问，可能会有一定的性能开销。对于性能敏感的应用，需要谨慎使用。

2. 与其他元注解的配合: 通常会与@Target、@Documented、@Inherited等元注解一起使用，以定义注解的使用范围、是否包含在Javadoc中、以及是否被子类继承等。

## MyBatis注解

### @Intercepts & @Signature
* @Intercepts 用于定义 MyBatis 拦截器类可以拦截哪些方法。它包含一个 @Signature 注解数组，每个 @Signature 注解定义一个要拦截的方法签名。

* @Signature 用于指定要拦截的接口类型、方法名称和参数类型。通过这个注解，MyBatis 可以确定你想拦截的具体方法。

具体示例分析：
```java
@Intercepts({
    @Signature(
        type = Executor.class, 
        method = "update", 
        args = {MappedStatement.class, Object.class}
    )
})
public class MyInterceptor implements Interceptor {
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        // 在这里编写自定义拦截逻辑
        System.out.println("Before update");
        Object returnValue = invocation.proceed();  // 调用被拦截的方法
        System.out.println("After update");
        return returnValue;
    }

    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {
        // 可选：设置拦截器的属性
    }
}
```
1. @Intercepts:
    1. @Intercepts注解包裹了一个或多个@Signature注解，这意味着这个拦截器可以拦截多个方法。在这个例子中，拦截器只拦截一个方法。
2. @Signature:
    2. type = Executor.class: 指定要拦截的接口类型为 Executor。Executor 是 MyBatis 中的一个核心接口，负责执行底层的数据库操作，如增删改查。
    3. method = "update": 指定要拦截的方法名称为 update。这个方法用于执行更新操作。
    4. args = {MappedStatement.class, Object.class}: 指定 update 方法的参数类型。MappedStatement 包含了 MyBatis 的 SQL 映射配置，而 Object 通常是传递给 SQL 的参数。

拦截器的工作原理：
1. intercept 方法: 是你实现自定义逻辑的地方。它接收一个 Invocation 对象，这个对象封装了被拦截的方法调用信息。你可以在调用目标方法前后插入自定义逻辑，或者根据需要修改传递给方法的参数或返回值。

2. plugin 方法: 用于包装目标对象，以便在实际运行时应用拦截逻辑。通常你可以直接使用 Plugin.wrap(target, this) 来实现。

3. setProperties 方法: 允许你从 MyBatis 配置文件中接收自定义属性，以便在拦截器中使用。这是可选的。

**使用场景**
1. 日志记录: 在 update 方法前后插入日志记录，记录每次更新操作的执行情况。
2. 权限控制: 在执行数据库更新操作之前，检查当前用户是否有权限执行该操作。
3. 数据审计: 自动记录数据更新的历史，以实现审计功能。
4. 参数预处理: 在方法调用前对传递的参数进行预处理或转换。

**注意事项**
1. 拦截的范围: 拦截器只能拦截 MyBatis 内部的方法调用，因此你无法拦截那些在事务管理器或其他外部调用者直接调用的 SQL 操作。
2. 性能影响: 由于拦截器会在方法执行过程中引入额外的逻辑，因此要注意可能的性能影响，特别是在高频调用的场景下。
3. 与插件机制的结合: MyBatis 的拦截器实际上是 MyBatis 插件机制的一部分，你可以通过 plugin 方法将拦截器包装成插件，灵活地应用到 MyBatis 中的各种操作上。

## Spring注解

### @Bean
用于定义Spring管理的bean的注解。与@Component不同的是，@Bean通常用于将第三方库中的类或需要自定义初始化逻辑的类注册为Spring容器中的bean。

- 方法级别的注解: @Bean 注解通常用于方法上，表示这个方法返回的对象将被注册为Spring容器中的一个bean。这个方法通常会放在一个配置类中，而配置类本身通常使用@Configuration注解进行标识。
- 自定义初始化和销毁: 你可以在定义@Bean的方法上，指定initMethod和destroyMethod来执行bean的初始化和销毁逻辑。例如：
    ```java
    @Bean(initMethod = "init", destroyMethod = "cleanup")
    public MyBean myBean() {
        return new MyBean();
    }
    ```
- 依赖注入: @Bean方法可以接受其他bean作为参数，Spring会自动将这些bean注入进来。例如：
    ```java
    @Bean
    public MyService myService(MyRepository repository) {
        return new MyService(repository);
    }
    ```

示例：
```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public MyService myService() {
        return new MyService();
    }

    @Bean
    public MyRepository myRepository() {
        return new MyRepository();
    }
}
```
AppConfig类使用@Configuration注解表明它是一个配置类，而其中标注为@Bean的方法返回的对象会被Spring容器管理。你可以在应用的其他部分通过依赖注入的方式获取这些bean。

#### @Bean 与 @Component 的区别：
##### 用法场景:
- @Component用于将你的类直接标记为一个Spring管理的bean，并依赖Spring的自动扫描机制。
- @Bean用于通过显式的Java配置方法创建bean，特别是那些你没有源码或无法直接用注解标记的第三方库的类。
##### 灵活性:
- @Bean提供了更大的灵活性，因为你可以在创建bean时自定义逻辑，比如调用构造函数、设置属性或调用初始化方法。
- @Component则是一个更简洁的方式，适用于大多数情况，但在需要更多控制时可能不足。

### @Component
告诉Spring容器，“这个类是一个Spring组件，需要被Spring管理。”

- 自动扫描和依赖注入: 当你在Spring配置中启用了组件扫描（通常是在Spring的配置文件或类中使用@ComponentScan注解），Spring会自动扫描指定包下的所有类，并将带有@Component注解的类注册为Spring应用上下文中的bean。

- 作用域: 默认情况下，使用@Component注解标识的bean是单例（Singleton）作用域的，这意味着Spring容器在整个应用中只会创建这个类的一个实例。如果你需要其他作用域（如原型、会话等），可以结合@Scope注解来使用。

- 依赖注入: 标识为@Component的类可以通过构造函数、字段或setter方法实现依赖注入。Spring会自动查找和注入它所需的依赖。

示例：
```java
import org.springframework.stereotype.Component;

@Component
public class MyComponent {
    public void doSomething() {
        System.out.println("Doing something in MyComponent...");
    }
}
```
MyComponent 类被注解为@Component，因此它会被Spring容器自动扫描并注册为一个bean。当你需要在其他类中使用MyComponent时，只需通过自动装配（如@Autowired）将其注入即可。

与其他注解的区别：
- @Service: 用于标识服务层组件。
- @Repository: 用于标识数据访问层组件，具有与数据访问相关的额外功能，如异常转换。
- @Controller: 用于标识Spring MVC控制器层组件。
这些注解实际上都是@Component的特殊化版本，它们除了标识bean之外，还提供了一些额外的语义信息。

### @Autowired

用于自动注入依赖。它可以标注在构造函数、字段、setter方法，或配置方法上。@Autowired的作用是告诉Spring容器将需要的依赖自动注入到被注解的地方，从而简化了手动依赖注入的工作。

- 自动注入: @Autowired可以自动查找并注入符合类型的bean。Spring会在容器中查找与被注入的对象类型兼容的bean，并将其注入。如果有多个符合条件的bean，可能会产生歧义，Spring会抛出异常，这时你可以结合@Qualifier注解来指定具体的bean。

- 注解位置:
  1. 字段注入:
    ```java
    @Autowired
    private MyService myService;
    ```
    这种方式最为常见，Spring会在实例化这个类时自动将MyService的bean注入到myService字段中。

  2. 构造函数注入:
    ```java
    @Autowired
    public MyClass(MyService myService) {
        this.myService = myService;
    }
    ```
    这是最推荐的注入方式，尤其是在有多个依赖时。Spring会自动选择并调用这个构造函数，并将依赖注入其中。

  3. setter方法注入:
    ```java
    private MyService myService;

    @Autowired
    public void setMyService(MyService myService) {
        this.myService = myService;
    }
    ```
    这种方式使用setter方法注入依赖，尽管较少使用，但在某些情况下有其意义，比如当依赖是可选的或需要在初始化后再设置。
   
- 可选依赖: 你可以使用@Autowired(required = false)来表示这个依赖是可选的。如果Spring容器中没有找到对应的bean，也不会抛出异常，字段将保持未初始化（即为null）。

- @Qualifier: 当有多个bean满足条件时，可以用@Qualifier来指定具体注入的bean：
    ```java
    @Autowired
    @Qualifier("specificBean")
    private MyService myService;
    ```

### @Configuration
用于定义配置类。在Spring中，配置类是用来替代传统的XML配置文件的，通过@Configuration注解，你可以使用Java代码来定义Spring的bean和依赖关系。

- 定义配置类:

    @Configuration注解表明一个类是Spring的配置类，负责提供bean定义，Spring容器会在启动时自动扫描并处理这些配置类。
    配置类中可以包含一个或多个带有@Bean注解的方法，这些方法会返回要注册到Spring容器中的bean。

- 实现@Bean方法的执行:

    当Spring容器需要获取某个bean时，它会调用配置类中相应的@Bean方法，并将返回值注册为容器中的bean。
    配置类通常与@ComponentScan结合使用，以便自动扫描并注册@Component、@Service、@Repository等注解标注的bean。

- 自动代理机制:

    @Configuration类被Spring容器特殊对待，它的bean方法是以CGLIB动态代理的方式实现的。这样，当一个@Bean方法调用另一个@Bean方法时，Spring会拦截调用并确保返回的是Spring容器中管理的bean，而不是一个新的实例。

示例：

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public MyService myService() {
        return new MyServiceImpl();
    }

    @Bean
    public MyRepository myRepository() {
        return new MyRepositoryImpl();
    }
}
```
- AppConfig类被@Configuration注解标识为一个配置类。
- myService和myRepository方法分别使用了@Bean注解，表明它们返回的对象将作为bean注册到Spring容器中。
- 当Spring容器启动时，它会自动调用这些@Bean方法，将MyServiceImpl和MyRepositoryImpl实例注册为容器管理的bean。

典型用法：
- 替代XML配置: 使用@Configuration，你可以完全使用Java代码来配置Spring应用程序，而不再需要传统的XML文件。
- 与其他注解结合:
    1. @ComponentScan: 指定要扫描的包，以便自动检测和注册Spring组件。
    2. @PropertySource: 用于加载外部属性文件并将其注入到Spring环境中。

特点：
- 类型安全: Java配置比XML配置更安全，因为Java配置可以在编译时检查错误，而XML配置只能在运行时发现问题。
- 可重用性: @Configuration类可以通过继承或组合的方式实现配置的重用，使得配置结构更加灵活和模块化。
- 兼容性: @Configuration类可以与传统的XML配置文件共存，这使得在向Java配置过渡时更加灵活。

### @EnableAspectJAutoProxy
用于启用Spring对AspectJ的代理支持。它通常用于配置类中，以便Spring能够自动为基于AspectJ的切面（Aspect）创建代理对象，从而实现AOP（面向切面编程）功能。

- AspectJ自动代理:
    @EnableAspectJAutoProxy注解启用了Spring对AspectJ注解（如@Aspect）的自动代理支持，这意味着Spring会自动识别和处理所有使用@Aspect注解的类，并为这些类生成代理。
- 属性 exposeProxy:
    1. exposeProxy = true 是一个可选属性，用于指定Spring是否应该将当前的代理对象暴露给线程局部变量。
    2. 这个属性的用途是在目标对象内部调用自身的其他方法时，依然能够通过代理对象执行AOP逻辑。通常情况下，如果一个方法在同一个类中调用另一个方法，Spring的AOP拦截不会生效，因为没有通过代理对象调用方法。而exposeProxy = true允许使用代理对象来调用方法，从而确保AOP逻辑的应用。
- AOP中的自调用问题:
    1. 如果一个类中的方法A被AOP增强，并且该方法在同类的另一个方法B中被调用，通常这个调用不会经过代理对象，因此增强逻辑不会生效。通过设置exposeProxy = true，你可以在方法B中通过代理对象调用方法A，从而使增强逻辑生效。
    2. 例如，在增强方法B的执行过程中，可以通过AopContext.currentProxy()来获取当前代理对象，并使用这个代理对象来调用方法A，这样AOP增强就能正确应用到方法A上。

示例：
```java
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.aop.framework.AopContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Service;

@Aspect
class MyAspect {

    @Before("execution(* MyService.doSomething(..))")
    public void beforeAdvice() {
        System.out.println("Before advice is called.");
    }
}

@Service
class MyService {

    public void doSomething() {
        System.out.println("Doing something...");
        ((MyService) AopContext.currentProxy()).doSomethingElse();
    }

    public void doSomethingElse() {
        System.out.println("Doing something else...");
    }
}

@Configuration
@EnableAspectJAutoProxy(exposeProxy = true)
class AppConfig {
    // 配置类
}
```
- @EnableAspectJAutoProxy(exposeProxy = true)启用了AspectJ自动代理，并允许在Spring AOP代理对象内部调用代理的其他方法。
- MyAspect类使用@Aspect注解定义了一个切面，其中包含了一个前置通知beforeAdvice，在MyService.doSomething()方法执行前会打印一条消息。
- 在MyService类中，doSomething方法调用了doSomethingElse方法。通过使用AopContext.currentProxy()，doSomethingElse方法仍然可以触发AOP增强逻辑，即使它是在同一个类内部被调用的。

**典型场景**
1. 解决自调用问题: 当类内部的方法相互调用且需要AOP增强时，exposeProxy = true可以确保AOP拦截器正常工作。
2. 增强复杂业务逻辑: 在复杂业务逻辑中，你可能希望在类的不同方法之间共享同样的AOP逻辑，通过暴露代理对象，可以确保这些逻辑一致应用。
3. 避免代码重复: 使用exposeProxy能够减少在类内部手动调用增强逻辑的需求，从而简化代码。

**注意事项**
1. exposeProxy = true 会带来一定的性能开销，因为Spring需要将代理对象暴露出来并进行额外的处理，通常在不需要自调用增强的情况下，不建议启用此选项。
2. 使用AopContext.currentProxy()也会使代码更复杂且与Spring耦合更紧，因此在设计系统时应权衡使用的必要性。

### @ConditionalOnClass
用于在某些类存在于类路径（classpath）中时，才创建和配置一个特定的Spring Bean或组件。它是Spring的条件注解（Conditional Annotation）系列的一部分，用于有条件地启用特定的配置。

- 条件配置:
    @ConditionalOnClass 注解可以标注在类、方法或字段上。它会检查指定的类是否存在于应用的类路径中，如果存在，Spring将启用相应的配置或bean定义；如果不存在，则跳过该配置。
- 多类检查:
    @ConditionalOnClass可以同时检查多个类的存在。你可以通过传递多个类或类名来实现。例如，如果需要所有指定类都存在时才启用配置，可以这样做：
    ```java
    @ConditionalOnClass({DataSource.class, JdbcTemplate.class})
    public class DataSourceConfig {
        // 配置DataSource
    }
    ```
- 与Spring Boot自动配置结合:
    @ConditionalOnClass通常用于Spring Boot的自动配置类中，以确保自动配置的bean或组件只有在依赖库存在时才会生效。例如，某些数据库相关的配置可能依赖于特定的数据库驱动或JDBC类，只有在这些类存在时才会进行配置。

示例：
```java
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
@ConditionalOnClass({DataSource.class, JdbcTemplate.class})
public class JdbcConfig {

    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}
```
- JdbcConfig类使用了@ConditionalOnClass注解，指定只有在DataSource和JdbcTemplate类都存在于类路径中时，才会创建JdbcTemplate bean。
- 如果项目的依赖中没有包含这些类（例如，没有引入JDBC相关依赖），那么Spring Boot会跳过这个配置，避免不必要的bean加载。

**典型场景**
- 自动配置: 在Spring Boot的自动配置机制中非常常见。例如，Spring Boot的很多自动配置都依赖于某些第三方库或类的存在，通过@ConditionalOnClass，可以在这些类存在时自动进行配置，而不需要手动配置。

- 模块化配置: 在一个应用中，如果不同模块之间有可选的依赖，通过@ConditionalOnClass可以使得配置更加灵活和模块化，只有在依赖存在时才加载相关的bean。

- 降低启动错误风险: 通过有条件地加载配置，可以避免在缺少某些依赖时出现启动错误，使得应用更加健壮和灵活。

**注意事项**
- 类名字符串: 如果你不确定某个类在编译时是否存在，也可以使用类名字符串的形式来避免编译时错误：
    ```java
    @ConditionalOnClass(name = "com.example.SomeClass")
    ```
- 与其他条件注解结合使用: @ConditionalOnClass可以与其他条件注解一起使用，如@ConditionalOnMissingClass（当类路径中不存在某个类时才进行配置），@ConditionalOnBean（当容器中存在某个特定bean时才进行配置），从而构建更加复杂的条件逻辑。
- 顺序和优先级: 当有多个条件注解时，Spring会按顺序评估这些条件，因此注解的顺序可能会影响最终的配置结果。

### @ConfigurationProperties
用于将外部化配置（如application.properties或application.yml中的属性）绑定到Java类的字段上。它帮助你将配置文件中的属性组织成结构化的数据，使得配置管理更加直观和类型安全。

- 属性绑定:
    @ConfigurationProperties允许你将一组相关的配置属性映射到一个POJO（普通Java对象）上。通过将配置文件中的属性按前缀划分，并映射到类的字段中，你可以轻松管理和使用这些配置。
- 前缀:
    @ConfigurationProperties通常与prefix属性一起使用，指定要绑定的属性前缀。前缀帮助你将配置文件中的相关属性归类，并将它们映射到特定的Java类。
- 类型安全:
    由于@ConfigurationProperties直接绑定到POJO，它提供了类型安全的配置管理。Spring会自动将配置文件中的属性转换为适当的Java类型，并赋值给类的字段。
- 与@Bean或@Component结合使用:
    你可以将@ConfigurationProperties注解应用到一个带有@Bean或@Component注解的类上，或者直接与@Configuration类中的方法结合使用。Spring会自动检测并绑定配置属性。

示例：
```java
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    @ConfigurationProperties(prefix = "app.datasource")
    public DataSourceProperties dataSourceProperties() {
        return new DataSourceProperties();
    }
}
```
application.yml:
```yaml
app:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: myuser
    password: mypassword
```
- @ConfigurationProperties(prefix = "app.datasource")注解告诉Spring，将配置文件中以app.datasource为前缀的所有属性绑定到DataSourceProperties类的字段中。
- DataSourceProperties类会自动持有配置文件中指定的数据库连接信息，供应用程序使用。

直接在POJO类中使用：
```java
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app.datasource")
public class DataSourceProperties {

    private String url;
    private String username;
    private String password;

    // Getters and Setters
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
```
- DataSourceProperties类被标注为@Component，并使用@ConfigurationProperties注解指定前缀app.datasource。
- Spring会自动将配置文件中的属性值绑定到DataSourceProperties对象的字段上，你可以在应用中直接使用这个对象来访问配置属性。

**使用场景**
1. 集中管理配置: @ConfigurationProperties非常适合将相关配置集中到一个POJO类中，使配置更加模块化和结构化。对于复杂的配置，这种方式比直接使用@Value注入更清晰。

2. 大型应用: 在大型应用中，配置文件往往包含大量属性。@ConfigurationProperties可以帮助你组织这些属性，并将它们分组到不同的类中，方便管理。

3. 第三方库配置: 当集成第三方库时，@ConfigurationProperties可以用于将库的配置属性从配置文件中读取，并绑定到特定的配置类中。

**注意事项**
1. 类型转换: Spring会自动处理配置属性的类型转换，但要确保你的配置文件中的值能正确转换为目标字段的类型。

2. 属性验证: 你可以使用@Validated注解和JSR-303注解（如@NotNull、@Min等）在@ConfigurationProperties类中进行属性验证。Spring Boot会在应用启动时验证这些属性是否符合要求。

3. 需要启用绑定: 在Spring Boot 2.x及以后的版本中，如果你在非@SpringBootApplication类上使用@ConfigurationProperties，通常需要通过@EnableConfigurationProperties启用配置属性绑定。

4. 与@Value的区别: 与@Value注解相比，@ConfigurationProperties更适合用于较大规模的配置，因为它支持将相关的配置属性组合在一起，而不是单独注入每个属性。

### @RestControllerAdvice
结合了@ControllerAdvice和@ResponseBody的功能，专门用于全局处理@RestController中的异常和提供统一的响应处理。它帮助你集中管理RestController层的异常处理逻辑，而不是将这些逻辑分散在各个控制器类中。
* 全局异常处理:

* @RestControllerAdvice用于定义全局异常处理逻辑。你可以在标注了@RestControllerAdvice的类中定义方法，这些方法会自动捕获应用程序中发生的特定异常，并返回相应的HTTP响应。
* 自动响应体转换:

* @RestControllerAdvice结合了@ResponseBody的功能，表示返回的内容会自动被序列化为JSON或XML格式，并作为HTTP响应体。这使得异常处理方法返回的对象可以直接映射为客户端所期望的格式。
* 目标是@RestController:

* @RestControllerAdvice主要针对使用@RestController注解的控制器，即用于RESTful Web服务的控制器。它将应用到所有这些控制器的异常处理上。
* 基于注解的配置:

* 你可以通过@RestControllerAdvice的属性（如basePackages、basePackageClasses、assignableTypes等）指定它的作用范围，例如限定它只作用于特定的包或类。

示例：
```java
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        return new ResponseEntity<>("Invalid argument: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = NullPointerException.class)
    public ResponseEntity<String> handleNullPointerException(NullPointerException ex) {
        return new ResponseEntity<>("Null pointer encountered: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        return new ResponseEntity<>("An error occurred: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```
* GlobalExceptionHandler类被@RestControllerAdvice注解标注，因此它将处理所有@RestController中的异常。
* handleIllegalArgumentException方法用于捕获IllegalArgumentException异常，并返回HTTP 400错误状态和错误信息。
* handleNullPointerException方法捕获NullPointerException异常，并返回HTTP 500错误状态。
* handleGenericException方法用于捕获其他未特定处理的异常，并返回通用的错误响应。

**使用场景**
1. 统一异常处理: 使用@RestControllerAdvice，你可以将整个应用程序中的异常处理逻辑集中管理，避免在每个控制器中重复编写相同的异常处理代码。

2. 提升代码可读性和维护性: 通过将异常处理集中在一个地方，你的控制器代码会更加简洁，关注点更加单一，同时也更容易维护和测试。

3. 与自定义异常结合: 你可以定义自定义异常类，并在@RestControllerAdvice中处理它们，提供更加精细化的异常处理和错误响应。

**注意事项**
1. 本，专门用于@RestController的异常处理。@ControllerAdvice主要用于处理传统的MVC控制器，而@RestControllerAdvice专注于REST API。

2. 应用范围: 默认情况下，@RestControllerAdvice会应用到所有@RestController中。如果你只希望它作用于特定的控制器，可以通过basePackages、basePackageClasses、assignableTypes等属性进行限制。

3. 异常处理顺序: 如果应用中有多个@RestControllerAdvice，可以使用@Order注解来控制它们的执行顺序。

4. 结合ResponseEntity: 在处理异常时，你通常会使用ResponseEntity来返回自定义的HTTP状态码和响应体。@RestControllerAdvice让你可以轻松返回结构化的错误响应。





## Spring Cloud

### @RefreshScope
用于使被标注的Spring Bean在运行时能够动态刷新其配置。当应用中的配置发生变化时，使用@RefreshScope注解的bean会重新加载其配置，而不需要重新启动应用程序。这在Spring Cloud Config等配置管理场景中非常有用。

- 动态刷新:
    1. @RefreshScope使得Spring容器在运行时可以刷新该bean及其依赖的其他bean的状态。换句话说，当Spring Cloud Config中的某些配置发生变化并触发刷新事件时，使用@RefreshScope的bean会销毁并重新创建，以应用新的配置。
- 作用范围:
    1. @RefreshScope可以应用于类、方法或字段上，通常用于配置类中的某些bean定义。
    2. 被@RefreshScope标记的bean是单例作用域的子作用域，因此每次刷新都会销毁旧的bean实例并创建新的实例。
- Spring Cloud Config集成:
    1. @RefreshScope常与Spring Cloud Config一起使用。当你使用Spring Cloud Config管理分布式系统的配置时，可以在不重启应用的情况下，通过调用/actuator/refresh端点来刷新应用的配置。
    2. 当刷新发生时，Spring会重新绑定所有标注为@RefreshScope的bean，以便它们能够使用新的配置。

示例：
```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.stereotype.Service;

@Service
@RefreshScope
public class MyService {

    @Value("${my.config.property}")
    private String configProperty;

    public String getConfigProperty() {
        return configProperty;
    }
}
```
- MyService类被@RefreshScope注解标记，因此它的configProperty字段会在配置刷新时自动更新。
- 当应用中的my.config.property配置发生变化后，如果触发了刷新事件，Spring Cloud会销毁旧的MyService实例并创建新的实例，确保configProperty字段反映最新的配置值。

**使用场景**
1. 动态配置: 在分布式系统中，你可能需要动态调整应用的配置，比如数据库连接、外部API URL、缓存设置等。使用@RefreshScope可以让这些配置在不重启应用的情况下生效。
2. Spring Cloud Config: 当你使用Spring Cloud Config管理集中配置时，@RefreshScope是一个关键注解，它确保配置变更能在各个微服务中即时生效，而不需要重启服务。
3. 降低运维成本: 在云原生应用中，频繁重启服务可能会影响服务的可用性。通过@RefreshScope，你可以减少重启次数，从而提高系统的稳定性和响应速度。

**注意事项**
- 性能开销: 使用@RefreshScope可能会带来一些性能开销，因为每次刷新时都会销毁和重新创建bean实例。尽量只在需要动态刷新的bean上使用@RefreshScope，而不要滥用。
- 依赖刷新: 如果@RefreshScope标记的bean依赖于其他bean，而这些依赖bean也可能需要刷新，则需要确保它们也被标记为@RefreshScope，否则依赖关系可能会出现问题。
- 与Actuator集成: @RefreshScope通常与Spring Boot Actuator中的/actuator/refresh端点结合使用，通过这个端点触发配置刷新。确保你的应用正确配置了Spring Boot Actuator并安全地暴露了这个端点。
- 应用重构: 如果一个bean非常复杂或有多个依赖，将其标记为@RefreshScope可能会引入复杂性。此时，可以考虑重构代码，将需要动态刷新的逻辑隔离出来。

## Swagger 注解

### @Schema