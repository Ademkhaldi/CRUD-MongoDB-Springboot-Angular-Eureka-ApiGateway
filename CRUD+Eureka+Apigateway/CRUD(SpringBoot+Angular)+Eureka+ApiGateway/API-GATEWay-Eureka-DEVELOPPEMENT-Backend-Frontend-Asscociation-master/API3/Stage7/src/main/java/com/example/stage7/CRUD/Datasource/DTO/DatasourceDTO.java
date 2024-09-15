package com.example.stage7.CRUD.Datasource.DTO;

import com.example.stage7.CRUD.BusinessEntity.BusinessEntity;
import com.example.stage7.CRUD.Chart.DTO.ChartDTO;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class DatasourceDTO extends BusinessEntity {
    private String type;
    private Integer connection_port;
    private String url;
    private String index;
    private String user;
    private String password;


    private ChartDTO chart;

}
