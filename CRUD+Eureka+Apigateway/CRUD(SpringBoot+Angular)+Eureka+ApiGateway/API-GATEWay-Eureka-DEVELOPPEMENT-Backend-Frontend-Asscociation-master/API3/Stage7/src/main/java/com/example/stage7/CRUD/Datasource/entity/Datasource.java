package com.example.stage7.CRUD.Datasource.entity;

import com.example.stage7.CRUD.BusinessEntity.BusinessEntity;
import com.example.stage7.CRUD.Chart.entity.Chart;
import lombok.*;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Size;

@Getter
@Setter
@ToString
@Document(collection = "datasource")
@TypeAlias("datasource")
@AllArgsConstructor
@NoArgsConstructor
public class Datasource extends BusinessEntity {


    private String type;

    private Integer connection_port;

    private String url;
    private String index;
    private String user;

    @Size(max = 8, message = "Password length must be less than or equal to 8 characters")
    private String password;
    @DBRef
    private Chart chart;


}
