---
title: Java常见依赖
excerpt: Spring Boot 的 BOM（Bill Of Materials），用于管理 Spring Boot 项目中所有依赖的版本
date: 2024-08-10 17:25:00
updated: 2024-08-10 17:25:00
categories:
  - 开发
  - 后端
tags:
  - Java
---

大量信息是通过询问 ChatGPT 获取的

## SpringBoot 依赖
Spring Boot 的 BOM（Bill Of Materials），用于管理 Spring Boot 项目中所有依赖的版本。通过将这个 BOM 引入到你的 pom.xml 文件中，你可以确保你所使用的所有 Spring Boot 相关依赖都使用兼容的版本，从而减少版本冲突和兼容性问题的风险。

### spring-boot-dependencies

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>2.7.5</version> <!-- 版本号示例 -->
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

Boot 项目中所有依赖的版本。通过将这个 BOM 引入到你的 pom.xml 文件中，你可以确保你所使用的所有 Spring Boot 相关依赖都使用兼容的版本，从而减少版本冲突和兼容性问题的风险。

这个 BOM 文件定义了多个常见依赖的版本号，但你不会直接在 dependencies 中引用它，而是通过将其作为 dependencyManagement 的一部分来使用。它简化了版本管理，你只需要在 dependencies 部分声明依赖的名称和范围，而不需要指定版本号。

举个例子，当你在 dependencies 部分添加 Spring Boot 相关的依赖时，你只需指定依赖的 groupId 和 artifactId，版本号由 spring-boot-dependencies BOM 自动提供。

### spring-cloud-dependencies


spring-cloud-dependencies 是 Spring Cloud 的 BOM（Bill Of Materials），类似于 spring-boot-dependencies，但用于管理 Spring Cloud 相关依赖的版本。通过将 spring-cloud-dependencies 引入到你的 pom.xml 文件中，你可以统一管理和协调你项目中所有 Spring Cloud 相关的依赖版本，确保它们能够兼容并正确工作。

spring-cloud-dependencies 主要用于以下目的：

1. 版本一致性：它确保所有的 Spring Cloud 组件（如 Spring Cloud Config、Spring Cloud Eureka、Spring Cloud Feign 等）使用的是兼容的版本。
2. 简化版本管理：像 spring-boot-dependencies 一样，你只需在 dependencyManagement 部分引用这个 BOM，并在 dependencies 中指定所需的库，而不需要为每个库手动指定版本号。

例如，引用 spring-cloud-dependencies 的方式如下：
```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2023.0.0</version> <!-- 版本号示例 -->
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<!-- 在 dependencies 部分，你可以直接引用 Spring Cloud 相关的库而无需指定版本： -->
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-config</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-eureka</artifactId>
    </dependency>
    <!-- 其他依赖 -->
</dependencies>
```

### spring-cloud-alibaba-dependencies
spring-cloud-alibaba-dependencies 是阿里巴巴提供的 Spring Cloud Alibaba BOM.

Spring Cloud Alibaba 是 Spring Cloud 的一个扩展，提供了与阿里巴巴的各种中间件和服务的集成，如 Nacos、Sentinel、RocketMQ 等。通过 spring-cloud-alibaba-dependencies，你可以轻松管理这些阿里巴巴相关的组件版本，并简化依赖的版本控制。

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>2024.0.0</version> <!-- 版本号示例 -->
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<!-- 在 dependencies 部分，你可以直接引用 Spring Cloud Alibaba 相关的库而无需指定版本： -->
<dependencies>
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
    </dependency>
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
    </dependency>
    <!-- 其他依赖 -->
</dependencies>
```

### nacos-client
nacos-client 是 Nacos 的客户端库，用于与 Nacos 服务器进行交互。Nacos 是阿里巴巴开源的一个动态服务发现、配置管理和服务治理平台，广泛用于微服务架构中。

nacos-client 主要用于：

1. 服务发现：在微服务架构中，nacos-client 可以帮助服务注册和发现，使得服务实例能够在 Nacos 注册中心进行注册，并让其他服务可以通过 Nacos 发现并调用它们。

2. 配置管理：nacos-client 还可以用于动态配置管理，它允许应用程序从 Nacos 服务器获取配置信息，并在配置发生变化时自动更新应用的配置。

```xml
<dependency>
    <groupId>com.alibaba.nacos</groupId>
    <artifactId>nacos-client</artifactId>
    <version>2.0.4</version> <!-- 版本号示例 -->
    <exclusions>
      <exclusion>
          <groupId>com.google.guava</groupId>
          <artifactId>guava</artifactId>
      </exclusion>
    </exclusions>
</dependency>
```
排除了 guava 这个库。这通常是因为 nacos-client 库依赖了 guava，但你可能希望使用项目中其他地方已经定义的 guava 版本，或者避免版本冲突。通过排除 guava，你可以在项目中单独指定适合你的 guava 版本。

你可以使用 nacos-client 来实现以下功能：

1. 注册服务：将你的应用注册到 Nacos 服务中心。
2. 发现服务：从 Nacos 服务中心发现其他注册的服务。
3. 获取配置：从 Nacos 配置中心获取配置数据。
4. 动态更新：当配置发生变化时，动态更新应用程序的配置。

如果你正在使用 Spring Boot 和 Spring Cloud Alibaba，可以通过 Spring Cloud Alibaba 的 starter 包来简化配置，这样你不需要直接使用 nacos-client，而是使用相关的 starter 来集成 Nacos。




















