---
title: Springboot3后端环境搭建
excerpt: "小众的手机型号很难有较多的rom包(系统)支持"
date: 2024-01-15 14:40:00
updated: 2024-01-15 14:40:00
categories:
  - 开发
  - 后端
tags:
  - Springboot3
  - Jdk17
---

## Spring Security

```java
// SecurityConfiguration.java

package com.celiae.cevideoapi.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
//                .cors()
//                .and()
                .csrf()
                .disable()
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/auth/**").permitAll()
                        .anyRequest().authenticated()
                )
//                .formLogin((form) -> form
//                        .loginPage("/form-login")
//                        .permitAll()
//                )
//                .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout((logout) -> logout.permitAll());
//                .addLogoutHandler(logoutHandler)
//                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext());

        return http.build();
    }
}
```

[了解 csrf](https://www.cnblogs.com/pengdai/p/12164754.html)

[随机密钥生成器](https://seanwasere.com/generate-random-hex/)