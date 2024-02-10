---
title: SQL语言实用语句
tags: 
---

### 问题1:

`\a\b\c\d\ => \a\b\c\`

1. 字段中字符串以 `\` 分隔
2. 头尾也有 `\`
3. 将最后一部分删除;

```sql
--select 测试查看是否修正正确
select replace(FILE_LOC,substring_index(FILE_LOC,'\',-2),'')as NEW_FILE_LOC from car.file;
```

对比原始字段内容,再update.

#### 子问题1

`",arfta,tarf,arft"; ','`

result: 3

1. 寻找字段中字符串中某个字符串的数量

```sql
--distinct 是为了区分各种数量,如果有其它数量,那么就不能简简单单删除最后一块了
select distinct(NUM) from
(
    select length(FILE_LOC)-length(replace(FILE_LOC,'\','')) as NUM
    from IS_ARCHIVE.IS_FILES
);
```

### 问题2:

1. 统计多表元组总数

```sql
-- 用 union 只能连接
SELECT COUNT(0) AS TotalRows
FROM (
    SELECT id FROM Table1
    UNION
    SELECT id FROM Table2
    UNION
    SELECT id FROM Table3
    -- 添加更多表的 UNION 查询
) AS CombinedTables;
```